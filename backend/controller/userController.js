
const express = require("express");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require('fs');
const { upload } = require("../multer");
const path = require("path");
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const { json } = require("stream/consumers");
const { isAuthenticated } = require("../middleware/auth");
const user = require("../models/user");


const activation_Token = async (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: process.env.ACTIVATION_EXPIRES,
    })
}

router.post('/create-user', upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const userEmail = await User.findOne({ email });

        if (userEmail) {
            const filename = req.file.filename
            const filePath = `uploads/${filename}`

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("Error in deleting file")
                } else {
                    res.json("file deleted successfully")
                }
            })

            return next(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file.filename
        const fileURL = path.join(filename)

        const userData = {
            name,
            email,
            password,
            avatar: fileURL
        }
        const activation_token = await activation_Token(userData);
        const activationURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/activation/${activation_token}`;

        try {

            await sendMail({
                email: userData.email,
                subject: "Activate Your account",
                message: `Hello ${userData.name},\n\t Please click on the link below to activate your account:\n\n${activationURL}`,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email:-\n\t${userData.email} to activate your account`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/activation', catchAsyncError(async (req, res, next) => {

    try {
        const { activation_token } = req.body;

        const newUser = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET
        );

        if (!newUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }

        const { name, email, password, avatar } = newUser;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }

        user = await User.create({
            name,
            email,
            password,
            avatar,
        });

        // Save the user to the database
        //await user.save();

        sendToken(user, 201, res, "Account activated successfully");
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


router.post('/login', catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("User not found", 400))
        }

        const passwordMatched = await user.comparePassword(password);
        if (!passwordMatched) {
            return next(new ErrorHandler("Wrong password!! Try again", 400))
        }

        sendToken(user, 201, res, "Login Successful");

    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }

}))

// load user
router.get('/getUser', isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return next(new ErrorHandler("User does not exist", 400));
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})
);

router.get('/logout', catchAsyncError(async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        res.status(200).json({
            success: true,
            message: "Log out successful",
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

// Update User Profile Information
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      
      const user = await User.findById(req.user.id).select("+password");
      
      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 404));
      }
      
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Password is incorrect",
        });
      }
      
      user.name = name || user.name;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      
      await user.save();
      
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// Update Password
router.put(
  "/update-password",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      
      const { oldPassword, newPassword, confirmPassword } = req.body;
      
      // Check old password
      const isPasswordMatch = await user.comparePassword(oldPassword);
      
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }
      
      // Check new passwords match
      if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
      }
      
      user.password = newPassword;
      await user.save();
      
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update User Avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user.id);
      
      // Delete previous avatar if exists
      if (existUser.avatar) {
        const previousAvatarPath = `uploads/${existUser.avatar}`;
        if (fs.existsSync(previousAvatarPath)) {
          fs.unlinkSync(previousAvatarPath);
        }
      }
      
      const fileUrl = req.file.filename;
      
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: fileUrl },
        { new: true }
      );
      
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Add/Update Address
router.put(
  "/update-address",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { country, city, address1, address2, zipCode, addressType } = req.body
      
      const user = await User.findById(req.user.id)
      
      // Check if address type already exists
      const existingAddress = user.addresses.find(
        (addr) => addr.addressType === addressType
      )
      
      if (existingAddress) {
        // Update existing
        const updatedAddresses = user.addresses.map((addr) =>
          addr.addressType === addressType
            ? { country, city, address1, address2, zipCode, addressType }
            : addr
        )
        user.addresses = updatedAddresses
      } else {
        // Add new
        user.addresses.push({ country, city, address1, address2, zipCode, addressType })
      }
      
      await user.save()
      
      res.status(200).json({
        success: true,
        user,
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500))
    }
  })
)

// Delete Address
router.delete(
  "/delete-address/:addressId",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { addressId } = req.params
      
      const user = await User.findById(req.user.id)
      
      user.addresses = user.addresses.filter(
        (addr) => addr._id.toString() !== addressId
      )
      
      await user.save()
      
      res.status(200).json({
        success: true,
        user,
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500))
    }
  })
)


module.exports = router;

{/*
            const filename = req.file.filename
        const fileURL = path.join(filename)
        const userData = {
            name,
            email,
            password,
            avatar: fileURL
        }

        const data = await User.create(userData);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: data
        });
         */}
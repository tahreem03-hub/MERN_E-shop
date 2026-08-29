
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
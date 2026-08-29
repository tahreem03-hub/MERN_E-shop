const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncError");
const { json } = require("stream/consumers");
const { isSeller } = require("../middleware/auth");
const shop = require("../models/shop");
const sendSellerToken = require("../utils/sendSellerToken");


const activation_Token = async (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: process.env.ACTIVATION_EXPIRES,
    })
}

router.post('/create-shop', upload.single("file"), async (req, res, next) => {
    try {
        const { email } = req.body
        const sellerEmail = await shop.findOne({ email });

        if (sellerEmail) {
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

            return next(new ErrorHandler("Seller already exists", 400));
        }

        const filename = req.file.filename
        const fileURL = path.join(filename)

        const seller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            avatar: fileURL,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode,
        }
        const activation_token = await activation_Token(seller);
        const activationURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/seller/activation/${activation_token}`;

        try {
            await sendMail({
                email: seller.email,
                subject: "Activate Your Shop",
                message: `Hello ${seller.name},\n\t Please click on the link below to activate your shop:\n\n${activationURL}`,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email:-\n\t${seller.email} to activate your seller account`,
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

        const newSeller = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET
        );

        if (!newSeller) {
            return next(new ErrorHandler("Invalid token", 400));
        }

        const {
            name,
            email,
            password,
            avatar,
            zipCode,
            address,
            phoneNumber,
        } = newSeller;

        let seller = await shop.findOne({ email });

        if (seller) {
            return next(new ErrorHandler("User already exists", 400));
        }

        seller = await shop.create({
            name,
            email,
            avatar,
            password,
            zipCode,
            address,
            phoneNumber,
        });

        // Save the seller to the database
        //await shop.save();

        sendSellerToken(seller, 201, res, "Shop activated successfully");
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


router.post('/login', catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(
                new ErrorHandler("Please provide all fields!", 400)
            );
        }

        const seller = await shop.findOne({ email }).select("+password");
        if (!seller) {
            return next(new ErrorHandler("Seller not found", 400))
        }

        const passwordMatched = await seller.comparePassword(password);
        if (!passwordMatched) {
            return next(new ErrorHandler("Wrong password!! Try again", 400))
        }

        sendSellerToken(seller, 201, res, "Login Successful");

    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }

}))

// load seller
router.get('/getSeller', isSeller, catchAsyncError(async (req, res, next) => {
    try {
        const seller = req.seller;
        if (!seller) {
            return next(new ErrorHandler("seller does not exist", 400));
        }

        res.status(200).json({
            success: true,
            seller,
        });
    } catch (error) {
   
    return next(new ErrorHandler(error.message, 500));
}
})
);



router.get('/logout', catchAsyncError(async (req, res, next) => {
    try {
        res.cookie('seller_token', null, {
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

module.exports = router

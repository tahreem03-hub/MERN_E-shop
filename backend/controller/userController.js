
const express = require("express");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require('fs');
const { upload } = require("../multer");
const path = require("path");
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/sendMail");


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
        const activation_token = activation_Token(userData);
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
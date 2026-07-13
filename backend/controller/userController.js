
const express = require("express");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require('fs');
const { upload } = require("../multer");
const path = require("path");

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
                    res.json("filedeleted successfully")
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

        const data = await User.create(userData);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
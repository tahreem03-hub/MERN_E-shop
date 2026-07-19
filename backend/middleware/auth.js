const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const user = require("../models/user");
exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to continue", 400))
    }
    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await user.findById(decoded.id)

        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }

        next();

    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
})
const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const CouponCode = require("../models/couponCode");
const { isSeller } = require("../middleware/auth");

const router = express.Router();

// Create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    // Fix: Check if coupon exists for this specific shop
    const existingCoupon = await CouponCode.findOne({ 
      name: req.body.name,
      "shop._id": req.seller._id
    });

    if (existingCoupon) {
      return next(new ErrorHandler("Coupon code already exists for your shop!", 400));
    }

    // Fix: Use req.seller instead of req.body.shop to ensure proper data
    const couponData = {
      ...req.body,
      shop: req.seller
    };

    const couponCode = await CouponCode.create(couponData);

    res.status(201).json({
      success: true,
      couponCode,
    });
  })
);

// Get all coupons of a shop
router.get(
  "/get-coupon/:id",
  catchAsyncError(async (req, res, next) => {
    const couponCodes = await CouponCode.find({ "shop._id": req.params.id });

    res.status(200).json({
      success: true,
      couponCodes,
    });
  })
);

// Delete coupon code
router.delete(
  "/delete-coupon-code/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    const couponCode = await CouponCode.findById(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code not found", 404));
    }

    // Fix: Proper ownership check
    if (couponCode.shop._id.toString() !== req.seller._id.toString()) {
      return next(
        new ErrorHandler("You are not the owner of this coupon", 403)
      );
    }

    await couponCode.deleteOne();

    res.status(200).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  })
);

module.exports = router;
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
    // Clean the name the same way the schema does (trim + uppercase)
    const name = String(req.body.name || "").trim().toUpperCase();

    // Does this shop already have a coupon with this name?
    const existingCoupon = await CouponCode.findOne({
      name,
      shopId: req.seller._id,
    });

    if (existingCoupon) {
      return next(
        new ErrorHandler("Coupon code already exists for your shop!", 400)
      );
    }

    const couponData = {
      name,
      value: req.body.value,
      minAmount: req.body.minAmount,
      maxAmount: req.body.maxAmount,
      appliesTo: req.body.appliesTo || "entireOrder",
      category: req.body.category,
      selectedProduct: req.body.selectedProduct,
      expiryDate: req.body.expiryDate,
      usageLimit: req.body.usageLimit,
      shopId: req.seller._id, // only the ID, not the whole seller
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
    // Mongoose turns the string id into an ObjectId because shopId is typed
    const couponCodes = await CouponCode.find({ shopId: req.params.id });

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

    // Ownership check
    if (couponCode.shopId.toString() !== req.seller._id.toString()) {
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


// Get coupon value by name
router.get(
  "/get-coupon-value/:name",
  catchAsyncError(async (req, res, next) => {
    const couponCode = await CouponCode.findOne({
      name: req.params.name.trim().toUpperCase(),
    });

    res.status(200).json({
      success: true,
      couponCode,
    });
  })
);

module.exports = router;
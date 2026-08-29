const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const CouponCode = require("../models/couponCode");
const { isSeller } = require("../middleware/auth");

const router = express.Router();

/*
"shop._id": req.params.id — this searches inside the 
embedded shop object for its _id field, since shop here 
is the whole object, not a plain string like shopId on your
 other models. Different shape needs a different query.
 */

 
// create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    const isCouponCodeExists = await CouponCode.find({ name: req.body.name });

    if (isCouponCodeExists.length !== 0) {
      return next(new ErrorHandler("Coupon code already exists!", 400));
    }

    const couponCode = await CouponCode.create(req.body);

    res.status(201).json({
      success: true,
      couponCode,
    });
  })
);

// get all coupons of a shop
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

// delete coupon code
router.delete(
  "/delete-coupon-code/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    const couponCode = await CouponCode.findById(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code not found", 404));
    }

    // ownership check — same pattern as event delete
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
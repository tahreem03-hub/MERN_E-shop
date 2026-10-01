const express = require("express")
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/product");
const { upload } = require("../multer");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const Order=require('../models/order')
const fs=require('fs')


const router = express.Router();

router.post("/create-product", upload.array('images'), catchAsyncError(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400))
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;
      productData.shopId = shopId;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      })
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 400));

  }
}))


router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({
        shopId: req.params.id
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  '/delete-product/:id',
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productID = req.params.id;

      // Find product first (so we can delete images)
      const product = await Product.findById(productID);

      if (!product) {
        return next(new ErrorHandler("Product with this id not found!", 404));
      }

      // Delete images from uploads folder
      if (product.images && product.images.length > 0) {
        product.images.forEach((img) => {
          const imagePath = `uploads/${img}`;
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }

      // Delete product from DB
      await product.deleteOne();

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await Product.findById(productId);

      if (!product) {
  return next(new ErrorHandler("Product not found", 404));
}

      const review = {
        user,
        rating,
        comment,
        productId,
      }
// see if here req.user used or only user used?
      const isReviewed = product.reviews.find(
        (rev) => (rev) => rev.user._id.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        })
      } else {
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all for admin
router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  })
);



module.exports = router;
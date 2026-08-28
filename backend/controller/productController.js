const express = require("express")
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/product");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");


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

      const product = await Product.create(productData);

      res.status(200).json({
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

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete('/delete-product/:id', isSeller, catchAsyncError(async (req, res, next) => {
  try {
    const productID = req.params.id
    const product = await Product.findByIdAndDelete(productID)
    if (!req.params.id) {
      return next(new ErrorHandler("Product with this id not found!", 400))
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!"
    })

  } catch (error) {
    next(new ErrorHandler(error, 400))
  }
}))



module.exports = router;
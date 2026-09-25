const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/order");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/product");
const Shop = require("../models/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // group cart items by shopId
      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop, with its own total
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const shopTotal = items.reduce(
  (sum, item) => sum + item.discountPrice * item.quantity,
  0
);
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice: shopTotal,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/* ---------------- GET ALL ORDERS OF USER ---------------- */
router.get(
  "/get-all-orders/:userId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.params.userId })
        .populate("user", "name email phoneNumber avatar")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/* ---------------- GET ALL ORDERS OF SELLER ---------------- */
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/* ---------------- UPDATE ORDER STATUS (SELLER) ---------------- */
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      // Fix: make sure this order actually belongs to the seller making the request
      const orderShopId = order.cart[0]?.shopId?.toString();
      if (orderShopId !== req.seller._id.toString()) {
        return next(
          new ErrorHandler("You can't update this order", 403)
        );
      }

      if (req.body.status === "Transferred to delivery partner") {
        for (const o of order.cart) {
          await updateOrder(o._id, o.quantity);
        }
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        if (!product) return;
        product.stock -= qty;
        product.soldOut += qty;
        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller._id);
        if (!seller) return;
        // Fix: add to the existing balance instead of overwriting it
        seller.availableBalance = (seller.availableBalance || 0) + amount;
        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/* ---------------- USER: REQUEST REFUND ---------------- */
router.put(
  "/order-refund/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/* ---------------- SELLER: ACCEPT REFUND ---------------- */
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successful!",
      });

      if (req.body.status === "Refund Success") {
        for (const o of order.cart) {
          await updateOrder(o._id, o.quantity);
        }
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        if (!product) return;
        product.stock += qty;
        // Fix: match the field name used elsewhere in the model (soldOut, not sold_out)
        product.soldOut -= qty;
        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

/* ---------------- ADMIN: ALL ORDERS ---------------- */
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    uppercase: true,
    required: [true, "Please enter your coupon code name!"],
  },
  value: {
    type: Number,
    required: true, // discount percentage
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },

  // only the shop's ID (not the whole seller object)
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },

  // what this coupon applies to
  appliesTo: {
    type: String,
    enum: ["entireOrder", "category", "specificProduct"],
    default: "entireOrder",
  },
  category: {
    type: String, // only used when appliesTo === "category"
  },
  selectedProduct: {
    type: String, // only used when appliesTo === "specificProduct"
  },

  // expiry
  expiryDate: {
    type: Date,
    required: [true, "Please set an expiry date!"],
  },

  // usage limits
  usageLimit: {
    type: Number, // total times this code can be used. leave empty = unlimited
  },
  usageCount: {
    type: Number,
    default: 0, // how many times it's been used so far
  },
  usedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // stops the same customer using it twice
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Same coupon name is allowed in different shops, but not twice in one shop
couponCodeSchema.index({ name: 1, shopId: 1 }, { unique: true });

module.exports = mongoose.model("CouponCode", couponCodeSchema);
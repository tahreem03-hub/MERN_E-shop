const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../models/shop");
const Event = require("../models/event");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

const router = express.Router();

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    }

    const files = req.files;
    const imageUrls = files.map((file) => file.filename);

    const eventData = req.body;
    eventData.images = imageUrls;
    eventData.shop = shop;

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      event,
    });
  })
);

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncError(async (req, res, next) => {
    const events = await Event.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      events,
    });
  })
);

// get all events (all shops — for home page)
router.get(
  "/get-all-events",
  catchAsyncError(async (req, res, next) => {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      events,
    });
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorHandler("Event not found with this id", 404));
    }

    // ownership check only the shop that owns this event can delete it
    if (event.shopId.toString() !== req.seller._id.toString()) {
      return next(
        new ErrorHandler("You are not the owner of this event", 403)
      );
    }

    // remove image files from disk before deleting the event
    event.images.forEach((image) => {
      const filePath = `uploads/${image}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    });

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  })
);

module.exports = router;
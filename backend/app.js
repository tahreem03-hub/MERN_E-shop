const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


// Error handling
app.use(ErrorHandler);

module.exports = app;
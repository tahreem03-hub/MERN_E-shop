const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const cors=require('cors')


// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/uploads', express.static("uploads"))

const user= require('./controller/userController');

app.use('/user', user)



// Error handling
app.use(ErrorHandler);

module.exports = app;
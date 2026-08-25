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
app.use('/api/uploads', express.static("uploads"))

const user= require('./controller/userController');
const shop=require('./controller/shopController')

app.use('/api/user', user)
app.use('/api/shop', shop)




// Error handling
app.use(ErrorHandler);

module.exports = app;
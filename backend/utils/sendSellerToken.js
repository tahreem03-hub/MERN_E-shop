//create token and saving that in cookies
const sendSellerToken = (seller, statusCode, res, message="Success") => {
  const seller_token = seller.getJwtToken();

  //Option for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    secure: process.env.NODE_ENV === "PRODUCTION",
  };

  res.status(statusCode).cookie("seller_token", seller_token, options).json({
    success: true,
    message,
    seller,
    seller_token,
  });
};

module.exports=sendSellerToken;
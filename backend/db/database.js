const mongoose = require("mongoose")

const dbConnect = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((data) => {
            console.log(`MongoDb connected: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(` MongoDB Error: ${err.message}`);
            process.exit(1);
        });
};

module.exports = dbConnect;
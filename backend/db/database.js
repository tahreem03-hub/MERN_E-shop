const mongoose = require("mongoose")

const dbConnect = () => {
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`MongoDb connected: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(` MongoDB Error: ${err.message}`);
            process.exit(1);
        });
};

module.exports = dbConnect;
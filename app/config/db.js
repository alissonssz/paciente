var mongoose = require("mongoose");
mongoose.Promise = Promise;
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(error => {
      console.log(`mongodb error on connection: ${error}`);
    });
};

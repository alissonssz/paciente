var mongoose = require("mongoose");
mongoose.Promise = Promise;

const options = {
  useMongoClient: true
};

exports.connect = () => {
  mongoose
    .connect(process.env.DB_URL, options)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(error => {
      console.log(`mongodb error on connection: ${error}`);
    });
};

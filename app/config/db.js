var mongoose = require("mongoose");
mongoose.Promise = Promise;

const options = {
  useMongoClient: true
};

exports.connect = () => {
  mongoose
    .connect("mongodb://localhost/saude", options)
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(error => {
      console.log(`mongodb error on connection: ${error}`);
    });
};

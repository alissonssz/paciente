var mongoose = require("mongoose");
mongoose.Promise = Promise;

exports.connect = () => {
  mongoose
    .connect("mongodb://localhost/saude")
    .then(() => {
      console.log("mongodb connected");
    })
    .catch(error => {
      console.log(`mongodb error on connection: ${error}`);
    });
};

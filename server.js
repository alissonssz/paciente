require("dotenv").config();
var app = require("./app/config/app");
var db = require("./app/config/db");

db.connect();

app.listen(process.env.PORT, () => {
  console.log("Server Running!");
});

module.exports = app;

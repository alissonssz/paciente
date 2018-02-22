var app = require("./app/config/app");
var db = require("./app/config/db");
require("dotenv").config();

db.connect();

app.listen(process.env.PORT, () => {
  console.log("Server Running!");
});

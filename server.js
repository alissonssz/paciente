var app = require("./app/config/app");
var startMongo = require("./app/config/db");

startMongo();
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server Running!");
});

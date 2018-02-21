var app = require("./app/config/app");
var db = require("./app/config/db");

db.connect();
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log("Server Running!");
});

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var router = require("../routes/index");
var compression = require("compression");
var helmet = require("helmet");
var dependencies = require("../routes/dependencies");
var path = require("path");
var morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.static(path.resolve("app/public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("app/views"));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

app.use("/", dependencies);
app.use("/", router);

// Error handling
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;

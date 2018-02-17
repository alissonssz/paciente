var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var router = require("../routes/index");
var Estabelecimento = require("../controllers/estabelecimento");
var controller = require("../controllers/estabelecimento");
var compression = require("compression");
var helmet = require("helmet");
var dependencies = require("../routes/dependencies");
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.static(path.resolve("app/public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("app/views"));

app.use("/", dependencies);
app.use("/", router);

// Error handling
app.use(function(req, res, next) {
  res.render("404");
});

module.exports = app;

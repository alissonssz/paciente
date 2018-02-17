var express = require("express");
var router = express.Router();
var estabelecimento = require("./estabelecimento");
var ranking = require("./ranking");
var path = require("path");

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/sobre", function(req, res) {
  res.render("sobre");
});

router.get("/ajuda", function(req, res) {
  res.render("ajuda");
});

router.get("/privacidade", function(req, res) {
  res.render("privacidade");
});

router.get("/manual", function(req, res) {
  res.sendFile(path.resolve("/public/manual.pdf"));
});

router.use("/estabelecimentos", estabelecimento);
router.use("/ranking", ranking);

module.exports = router;

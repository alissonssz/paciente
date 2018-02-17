var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    router = require('../routes/index'),
    Estabelecimento = require('../controllers/estabelecimento'),
    controller = require('../controllers/estabelecimento'),
    compression = require("compression"),
    helmet = require("helmet"),
    dependencies = require("../routes/dependencies"),
    path = require('path')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.static(path.resolve('app/public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve('app/views'));

app.use('/', dependencies);
app.use('/', router);

// Error handling
app.use(function(req, res, next) {
  res.render('404');
});

module.exports = app;

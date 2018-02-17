var express = require('express');
var router = express.Router();

router.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));
router.use('/bootstrap-switch', express.static('./node_modules/bootstrap-switch/dist/'));
router.use('/font-awesome', express.static('./node_modules/font-awesome/css/'));
router.use('/jquery', express.static('./node_modules/jquery/dist/'));
router.use('/ajax', express.static('./node_modules/jquery-form/dist/'));
router.use('/autocomplete', express.static('./node_modules/devbridge-autocomplete/dist/'));
router.use('/vue', express.static('./node_modules/vue/dist/'));
router.use('/vue-resource', express.static('./node_modules/vue-resource/dist/'));
router.use('/animate-css', express.static('./node_modules/animate.css/'));
router.use('/noty', express.static('./node_modules/noty/lib/'));
router.use('/hover', express.static('./node_modules/hover.css/css/'));
router.use('/chardin.js', express.static('./node_modules/chardin.js/'));
router.use('/moment', express.static('./node_modules/moment/min/'));
router.use('/moment-timezone', express.static('./node_modules/moment-timezone/'));

module.exports = router;
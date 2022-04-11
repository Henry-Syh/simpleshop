var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SimpleShop', bodyTitle: `this is bodytitle` });
});

module.exports = router;

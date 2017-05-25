var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.loginbean = req.session.loginbean;
  res.render('index', {});
});
router.get('/aa', function(req, res, next) {
  res.render('aa',{name:'张三李四'});
});

module.exports = router;

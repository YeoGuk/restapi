var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("upupupupupupupupupu");
  res.render('index', { title: 'Express' });
  console.log("upupupupupupupupupu");
});


module.exports = router;


"use strict";

var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');

const cassandra = require('cassandra-driver');
const assert = require('assert');
const client = new cassandra.Client({ contactPoints: ['203.250.77.180'], localDataCenter: 'dc1', keyspace: 'durnffl2'});


var id = '334fe861-0e42-4657-abfd-28e876cb3600';
var fs = require("fs");

/* GET home page. */
router.use(fileUpload({
    limits: {fileSize:256 * 1024 * 1024},
  }));

router.post('/', function(req, res, next) {
  console.log("selecting");
const query = 'select img from durnffl2.test7 where id=? ;';
client.execute(query, [id], { prepare: true}, function(err, res){
  console.log(JSON.stringify(res));  
  if(res.rows != null) {
    console.log(res.rows[0].img);
    var binImage = res.rows[0].img;
    
    fs.writeFileSync("durnfflTest2.jpg",binImage);
    if (err) return next(err);      
    next();}
});
  
}
  )
  
console.log("selected!!!//");
  
module.exports = router;


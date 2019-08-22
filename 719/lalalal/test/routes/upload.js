"use strict";
var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');



const cassandra = require('cassandra-driver');
const assert = require('assert');
const client = new cassandra.Client({ contactPoints: ['203.250.77.180'], localDataCenter: 'dc1', keyspace: 'durnffl2'});

//var authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra','cassandra');


var id


var fs = require("fs");

/* GET home page. */
router.use(fileUpload({
  limits: { fileSize:256 * 1024 * 1024},
}));

router.post('/', function(req, res, next) {
 // console.log("upupupupupupupupupu");
 
  //console.log(JSON.stringify(req));
  console.log(req);
  
//console.log(client);
  //if (Object.keys(req.files).length == 0) {
  //  return res.status(400).send('No files were uploaded.');
 // }
  //client.connect(next);
  //const query = 'INSERT INTO durnffl.test (id, img, name) VALUES (?, ?, ?);';
  //const query2 = 'select * from demo.users where id=? ;';
var sampleFile = req.files.sampleFile;
//console.log("samplefile = "+JSON.stringify(sampleFile));
var accessToken = req.body.accessToken;
console.log("access token in rest="+accessToken);
id = cassandra.types.Uuid.random();
console.log(id);
//let fileName = req.text.fileName;
  //client.execute(query, [ id, sampleFile, "lal"], { prepare: true})
  //client.execute(query2, [2], {prepare: true}, function(err, res){
  //  console.log(err);
   // console.log(res.rows);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/home/vagrant/719/html/testimage2.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    
    const query = 'INSERT INTO durnffl2.test7 (id, name, img) VALUES (?, ?, ?);';
    var fsImg;
    fsImg=fs.readFileSync("/home/vagrant/719/html/testimage2.jpg",{flag: 'rs+'});
    console.log("img length = " + fsImg.length);
    client.execute(query, [ id, 'durnffl', fsImg], function(err, result){
     console.log(err);
     console.log(result);  
    });
    res.send('File uploaded!');
  });
  

 /* const query = 'INSERT INTO durnffl.test2 (id, name, img) VALUES (?, ?, ?);';
  fs.readFileSync("/home/vagrant/719/html/testimage2.jpg", function (err, img) {
    
    console.log("img length = " + img.length);
    client.execute(query, [ id, 'durnffl', img], { prepare: true} ,next);*/
    
   
 
 
  
}
  )
  
console.log("upupupupupupupupupu!!!//");
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  

 
//});
module.exports = router;


/*

function select(next) {
  var f=1;
  const query = 'SELECT id, txt, val,img FROM examples.basic WHERE id = ?';
  var interval;
  interval = setInterval(function(){
    client.execute(query, [ id ], { prepare: true}, function (err, result) {
    if(result.first().img != null) {
      var str = result.first().img;
      fs.writeFileSync("test.jpg",str);
      clearInterval(interval); 
      if (err) return next(err);
      next();}
    });
  },1000);
  
}
*/
"use strict";
var web3 = require('web3');
var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');
var crypto =require('crypto');
/* GET home page. */

router.post('/', function(req, res, next) {
  
  //var wPasswd=JSON.stringify(req.body.wPasswd);

console.log(req.body);
var fileHash = req.body.fileHash;
var signature = req.body.signature;
var accessKey = req.body.accessKey;
var timeStampMs = new Date().getTime();
var timeStamp = parseInt(timeStampMs/1000);
console.log("rest api time stamp :"+timeStamp);
var rawAccessTokenHead = fileHash+signature+accessKey;
console.log("raw access token head" + rawAccessTokenHead);
var accessTokenHead = crypto.createHash('sha256').update(rawAccessTokenHead).digest('base64');
var accessToken = accessTokenHead+web3.utils.toHex(timeStamp);
console.log("access token ="+accessToken);
res.send(accessToken);
   
 
 
  
})
    
console.log("==========================");
 module.exports = router;


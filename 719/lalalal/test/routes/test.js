var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');


/* GET home page. */
router.use(fileUpload());
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload', function(req, res) {
  console.log
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/719/html/test.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
module.exports = router;

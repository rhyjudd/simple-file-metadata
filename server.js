'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


// require and use "multer"...

const app = express();

//Set storage engine
const storage = multer.diskStorage({
destination: './public/uploads/',
filename : function(req, file, cb){
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload
const upload = multer({
  storage: storage
}).single('upfile')

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

//Public folder
app.use(express.static('./public'));


//Main route
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', (req, res)=>{
  upload(req, res, (err) => {
    const file = req.file
    if(err){
      console.error(err);
      res.sendFile(process.cwd() + '/views/index.html');
    } else {
        if(file == undefined){
          console.error(err);
          res.sendFile(process.cwd() + '/views/index.html');
        } else { 
        console.log(file);
        res.json({ 
          filename: file.originalname,
          size: file.size
        })
      }
    }
  });
});
  
  
app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

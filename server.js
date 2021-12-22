var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//Multer Middleware.
 let multerMiddleware = multer().single('upfile');

//API ENDPOINT
const urlPath = '/api/fileanalyse';

app.post(urlPath, multerMiddleware, (request, response) => {
  
  let name = request.file.originalname;
  let type = request.file.mimetype;
  let size = request.file.size;

  response.json({"name": name, "type": type, "size": size})
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

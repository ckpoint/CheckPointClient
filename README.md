# CheckPointClient
###### Check-Point-Client depends on [PRIME-NG](https://github.com/primefaces/primeng)

#### Http request auto validation library (https://github.com/ckpoint/CheckPoint)
#### CheckPoint Support Client Project

# Installation

## 1. NODE SETUP

Install node.js for each os in the link below.

https://nodejs.org/ko/download/

## 2. DOWNLOAD_CLIENT

Download the script via the link below

https://github.com/ckpoint/CheckPointClient/raw/master/bin.zip

## 3. SERVER CONFIG

```javascript

var express = require('express');
var app = express();

var distPath='{your_Unzip_Folder_Path}/dist/CheckPointWeb'
var port = {SERVER_POST};


const allowedExt = [ '.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.gif' ];

app.listen(port, function(){ console.log("Check Point Client Start...")})


app.get('*', function(req, res) {

    if (allowedExt.filter(ext => req.url.toLowerCase().indexOf(ext) > 0).length > 0) {
      resourceSend(req,res);
    }
    else{
      sendFile(res, distPath + '/index.html');
    }
});


function resourceSend(req, res){
  var path = distPath + req.url;
  if(path.indexOf('?') > 0 ){
    path = path.substr(path, path.indexOf('?'));
  }
  sendFile(res, path);
}


function sendFile(res, path){
    res.sendFile(path, {},function(err) { if (err) console.log(err); } );
}

```

## 4. SERVER START

- Unzip the bin.zip file and move it into the folder.
- Enter the following commands in order.

        npm install
        node server

- Open your browser and connect to http: // localhost: {PORT} or http://yourhost:{PORT}

## 5. LOGIN AND SCAN

![login](https://github.com/ckpoint/CheckPointClient/blob/master/res/login.PNG)

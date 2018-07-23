
var express = require('express');
var app = express();

var distPath='D:/CheckPoint/CheckPointClient/dist/CheckPointWeb'
var port = 7000;


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



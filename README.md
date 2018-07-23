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

- {CHECK_POINT_CLIENT_PATH} : bin.zip unzip path
- {SERVER_PORT} : check point client server port

```javascript

var express = require('express');
var app = express();

var distPath='{CHECK_POINT_CLIENT_PATH}/dist/CheckPointWeb'
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
- When you connect to the client, you will see the login page shown below.

![login](https://github.com/ckpoint/CheckPointClient/blob/master/res/screenshot/login.png)

- Server URL : Your Spring boot Proejct Server URL
- Password : Your Spring boot Proejct ckpoint.password default value is taeon


## 6. SCAN YOUR PROEJCT ANNOTATION

![maintab](https://github.com/ckpoint/CheckPointClient/blob/master/res/screenshot/main_tab.png)

- With the B button you can scan the annotations into the project and load the message structure as shown below.


![annotationscan](https://github.com/ckpoint/CheckPointClient/blob/master/res/screenshot/annotation_scan.png)

## 7. VALIDATION SETTING

- After selecting the URL in the left tab, you can set the Validation Rule for the request message.
- These settings are reflected in real time without server reboot.

![validation_setting](https://github.com/ckpoint/CheckPointClient/blob/master/res/screenshot/validation_setting.png)

-------------------------------------------------------------------------------------
## 8. EXCEL DOCU DOWNLOAD

- If you open the main menu tab, you can see the Excel download button, and if the APACHE POI Library is included in the project, you can get the API structure as a document.

![main_menu_open](https://github.com/ckpoint/CheckPointClient/blob/master/res/screenshot/main_menu_open.png)

- EXCEL

![excel_download](https://github.com/ckpoint/CheckPointClient/blob/master/res/screenshot/excel_download.png)

## 8. SETTING_BACKUP

- You can download the current settings as a json file with the JSON EXPORT button.

## 9. SETTING_RESTORE

- The backed up json file can be overwritten with the current setting with the JSON IMPORT button.


var topic = require('./lib/topic.js')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./lib/db')
const http = require("http");

    
        setInterval(function () {
            http.get("http://jiseongapp.herokuapp.com");
          }, 3599);
    

app.use(express.static(path.join(__dirname, 'public')));

exports.app = app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(request, response) { 
    topic.home(request, response);
});
app.get('/bug', function(request, response) { 
    topic.bug(request, response);
});
app.get('/create/bug', function(request, response) { 
    topic.createbug(request, response);
});
app.post('/createbug_process', function(request, response){
    topic.createbug_process(request, response);
})
app.listen(process.env.PORT || 5500, function(){ 
    console.log(`start with port: ${process.env.PORT}`);
  });
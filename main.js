var topic = require('./lib/topic.js')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const http = require("http");

    
        setInterval(function () {
            http.get("http://jiseongapp.herokuapp.com");
          }, 60000);
    

app.use(express.static(path.join(__dirname, 'public')));

exports.app = app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(request, response) { 
    topic.home(request, response);
});
app.get('/bug', function(request, response) { 
    topic.bug(request, response);
});
app.get('/bug/create', function(request, response) { 
    topic.createbug(request, response);
});
app.post('/bug/create_process', function(request, response){
    topic.createbug_process(request, response);
})
app.get('/bug/:pageId', function(request, response){
    topic.bug_page(request, response);
})
app.get('/bug/update', function(request, response){
    topic.updatebug(request, response);
})
app.listen(process.env.PORT || 5500, function(){ 
    console.log(`start with port: ${process.env.PORT}`);
  });
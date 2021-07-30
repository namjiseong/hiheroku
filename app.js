var topic = require('./lib/topic.js')
var express = require('express');
var app = express();



app.get('/', function(request, response) { 
    topic.home(request, response);
});

app.listen(5500, function(){ 
    console.log(`start with port: 5500`);
  });
var topic = require('./lib/topic.js')
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) { 
    topic.home(request, response);
});
app.get('/bug', function(request, response) { 
    topic.bug(request, response);
});


app.listen(process.env.PORT || 5500, function(){ 
    console.log(`start with port: 5500`);
  });
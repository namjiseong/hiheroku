var topic = require('./lib/topic.js')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const http = require("http");
setInterval(function () {
  http.get("http://jiseongapp.herokuapp.com");
}, 600000);
app.use(express.static(__dirname + '/public'));

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
app.listen(process.env.PORT);
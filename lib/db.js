var mysql = require('mysql');
var db = mysql.createConnection({
    host:'us-cdbr-east-04',
    user:'b629f7bf92c0a3',
    password:'cf6f0b58',
    database:'heroku_0d9db5affa3ffb5'
  });
  db.connect();
module.exports = db;

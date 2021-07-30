var mysql = require('mysql');
var db = require
var db_config = {
    host:'us-cdbr-east-04.cleardb.com',
    user:'b629f7bf92c0a3',
    password:'cf6f0b58',
    database:'heroku_0d9db5affa3ffb5'
  };

var connection;

exports.handleDisconnect = function (){
  connection = mysql.createConnection(db_config);
  connection.connect(function(err){
    if(err){
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function(err){
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleDisconnect();
    }else{
      throw err;
    }
  });
}
module.exports = connection;
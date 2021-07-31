var mysql = require('mysql');
var db_config = {
    host:'us-cdbr-east-04.cleardb.com',
    user:'b629f7bf92c0a3',
    password:'cf6f0b58',
    database:'heroku_0d9db5affa3ffb5'
  };

var db;

function handleDisconnect(){
  db = mysql.createConnection(db_config);
  db.connect(function(err){
    if(err){
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on('error', function(err){
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleDisconnect();
    }else{
      throw err;
    }
  });
}
handleDisconnect();
module.exports = db;
module.exports = handleDisconnect();
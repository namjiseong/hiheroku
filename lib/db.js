var mysql = require('mysql');
var db = mysql.createConnection({
    host:'us-cdbr-east-04.cleardb.com',
    user:'b629f7bf92c0a3',
    password:'cf6f0b58',
    database:'heroku_0d9db5affa3ffb5'
  });

exports.handleDisconnect= function () {
    db.connect(function(err) {            
      if(err) {                            
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                   
    });     
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        return handleDisconnect();                      
      } else {                                    
        throw err;                              
      }
    });
  }
module.exports = db;

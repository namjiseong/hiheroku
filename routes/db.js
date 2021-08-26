var mysql = require('mysql');
var db_config = {
  host:'127.0.0.1',
  user:'root',
  password:'qsdrwe159',
  database:'gijigae'
};
db = mysql.createConnection(db_config);
db.connect(function(err){
  console.log("db on");
})

module.exports=db;
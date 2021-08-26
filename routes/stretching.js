var express = require('express');
var router = express.Router();
var db = require('./db.js');

 

  



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stretching', { title: '스트레칭' });
});
router.get('/up', function(req, res, next) {
  res.render('stretching_up', { title: 'up!스트레칭' });
});
router.get('/alert', function(req, res, next) {
  res.render('alert', { title: '스트레칭알람' });
});



router.get('/count', function(req, res) {
  db.query(`SELECT * from stretching where stretching_id=1`, function (err2, re){
    if(err2) throw err2;
    
  
    db.query(`UPDATE stretching set count=${re[0].count}+1 WHERE stretching_id=1`, function(err, result){
      if(err)throw err;
    
      res.status(200).json(result[0]);
    })
  })
})
router.get('/alltime', function(req, res) {

  db.query(`UPDATE stretching set alltime=alltime+1 WHERE stretching_id=1`, function(err, result){
    if(err)throw err;
  
    res.status(200).json(result[0]);
  })
  
})

router.get('/average/:pageId', function(req,res){
  console.log(req.params.pageId);
  db.query(`UPDATE stretching set averagecount=averagecount+1, sumscore= sumscore+${req.params.pageId} WHERE stretching_id=1`, function(err, result){
    if(err)throw err;
  db.query(`UPDATE stretching set average=sumscore/averagecount where stretching_id=1`, function(error3, result2){
    res.status(200).json(result2[0]);
  })
    
  })

  
})



module.exports = router;

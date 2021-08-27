var express = require("express");
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("statistics", { title: "Express" });
});

router.get("/page/1", function (req, res, next) {
  res.render("page_1");
});
router.get("/page/2", function (req, res, next) {
  res.render("page_2");
});
router.get("/page/3", function (req, res, next) {
  res.render("page_3");
});


// router.get('/page/2', function(req, res, next) {
//   res.render('page_2');
// });
// router.get('/page/3', function(req, res, next) {
//   res.render('page_3');
// });
// router.get('/two/stretching', function(request, response){
//   db.query(`SELECT * FROM stretching where stretching_id=2`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
// router.get('/three/stretching', function(request, response){
//   db.query(`SELECT * FROM stretching where stretching_id=3`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
// router.get('/two/posture', function(request, response){
//   db.query(`SELECT * FROM posture where posture_id=2`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
// router.get('/three/posture', function(request, response){
//   db.query(`SELECT * FROM posture where posture_id=3`, function(err, result){
//     if(err)throw err;

//     response.status(200).json(result[0]);
//   })
// })
//
//    response.status(200).json(result[0]);
//  };
//});

module.exports = router;

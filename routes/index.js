var express = require("express");
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.ejs");
});

module.exports = router;

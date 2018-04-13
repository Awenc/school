var express = require('express');
var router = express.Router();
var addUsers=require("../lib/addUsers");
var userLoad=require("../lib/userLoad");
/* GET users listing. */



router.post('/add', function(req, res, next) {
	console.log("aaa");
  var option={
		"username":req.body.username,
		"password":req.body.password,
	};
  addUsers.addUser(option,req,res);
});


router.get('/isUserExit', function(req, res, next) {
  addUsers.isUserExit(req.query.username,req,res);
});


router.post('/load', function(req, res, next) {
	var option={
		"username":req.body.username,
		"password":req.body.password,
	};
	userLoad.isUser(option,req,res);
});

module.exports = router;

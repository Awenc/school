var express = require('express');
var router = express.Router();
var adminMsg=require("../lib/adminMsg")
/* GET home page. */
router.post('/adminLogin', function(req, res, next) {
  	var option={
  		"username":req.body.username,
  		"password":req.body.password
  	}
  	adminMsg.isAdmin(option,req,res);
});

router.post('/adminManage', function(req, res, next) {
	if(typeof(req.session.username)=="undefined"  || req.session.username ==""){
		res.json({"isAdmin":2})
	}else{
		adminMsg.getAllMsg(req.session.username,req,res)
	}	
});
router.post('/getPassword', function(req, res, next) {
	adminMsg.getPassword(req.body.username,req,res);
});

router.post('/changed', function(req, res, next) {
	var username=req.body.username;
	var password=req.body.password;
	var option={
		"name":req.body.name,
		"age":req.body.age,
		"sex":req.body.sex,
		"birth":req.body.birth,
		"nowclass":req.body.nowclass,
		"job":req.body.job,
		"address":req.body.address,
		"qqnum":req.body.qqnum,
		"mail":req.body.mail,
		"tel":req.body.tel,
		"about":req.body.about,
		"username":req.body.username,
	};
	adminMsg.changed(username,password,option,req,res);
});
router.post('/deluser', function(req, res, next) {
	var username=req.body.username;
	adminMsg.delUser(username,req,res);
});
router.get('/getAllActive', function(req, res, next) {

	adminMsg.getAllActive(req,res);
});
router.post('/delActive', function(req, res, next) {

	adminMsg.delActive(req.body.id,req,res);
});
module.exports = router;
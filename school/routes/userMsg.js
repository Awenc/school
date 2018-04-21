var express = require('express');
var router = express.Router();
var userMsg=require("../lib/userMsg");
/* GET home page. */
router.post('/', function(req, res, next) {
   console.log(req.session.username);
	if(typeof(req.session.username)=="undefined"  || req.session.username ==""){
		res.json({"isUser":2})
	}else{
		userMsg.findUserMsg(req.session.username,req,res)
	}


});
router.post('/changed', function(req, res, next) {
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
		"username":req.session.username,
	};
	userMsg.changeUser(option,req,res);
});


router.post('/changedPassword', function(req, res, next) {
	userMsg.changePassword(req.body.password,req,res);
});


module.exports = router;
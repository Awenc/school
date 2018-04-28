//此路由专门处理用户参加的活动
var express = require('express');
var router = express.Router();
var joinActive=require("../lib/joinActive");

router.get('/', function(req, res, next) {
  //获取到所有的用户参加的活动

 //1.判断用户是否登录
   // console.log(req.session.username);
	if(typeof(req.session.username)=="undefined"  || req.session.username ==""){
		res.json({"isJoinActive":2})
	}else{
		//显示用户参加的所有活动
		joinActive.getAllJoin(req.session.username,req,res);
	} 
});

//取消参与的一个活动cancelJoin
router.post('/cancelJoin', function(req, res, next) {
	var option={
		"id":req.body.id,
		"username":req.session.username
	}
	joinActive.cancelJoin(option,req,res);
});

module.exports = router;
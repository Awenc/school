var express = require('express');
var router = express.Router();
var myActive_msg=require("../lib/myActive_msg");
var allActive=require("../lib/allActive");

// 获取到所有的活动信息
router.post('/', function(req, res, next) {
	//判断是否登录
   console.log(req.session.username);
	if(typeof(req.session.username)=="undefined"  || req.session.username ==""){
		res.json({"isActive":2})
	}else{
		//显示所有的自己活动
		myActive_msg.getAllActive(req.session.username,req,res)
	}
});

//添加一个活动信息
router.post('/addActive', function(req, res, next) {
  var option={
  	"time":req.body.time,
  	"tit":req.body.tit,
  	"content":req.body.content,
  	"address":req.body.address,
  	"username":req.session.username,
  	"ischange":"0",
  }    
  myActive_msg.addActive(option,req,res);
});

//修改一个活动信息
router.post('/updataActive', function(req, res, next) {
	var option={
	  	"time":req.body.time,
	  	"tit":req.body.tit,
	  	"content":req.body.content,
	  	"address":req.body.address,
	  	// "username":req.session.username,
	  	"ischange":"1",
	  	"id":req.body.id	
	}
  myActive_msg.updataActive(option,req,res);
});

//删除一个活动信息
router.post('/delActive', function(req, res, next) {
  myActive_msg.delActive(req.body.id,req,res);
});

//获取到所有的活动信息
router.get('/allActive', function(req, res, next) {
	allActive.findAll(req,res);
});

//用户参加一个活动
router.post('/joinActive', function(req, res, next) {
	//判断是否登录
	if(typeof(req.session.username)=="undefined"  || req.session.username ==""){
		res.json({"isActive":2})
	}else if(req.body.username == req.session.username){
		//判断是否为自己参加自己的活动
		res.json({"isActive":3})
	}else{
		var option={
			"id":req.body.id,
			"username":req.session.username,
		}
		allActive.joinActive(option,req,res);			
	}

});
//获取到一个活动的参加人数
router.post('/allCount', function(req, res, next) {
	allActive.joinCount(req.body.id,req,res);
});
//获取参加活动的人员名单getAllJoinUsers
router.post('/getAllJoinUsers', function(req, res, next) {
	allActive.getAllJoinUsers(req.body.id,req,res);
});

module.exports = router;
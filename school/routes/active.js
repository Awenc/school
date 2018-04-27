var express = require('express');
var router = express.Router();
var myActive_msg=require("../lib/myActive_msg");

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




module.exports = router;
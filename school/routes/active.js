var express = require('express');
var router = express.Router();
var activeMsg=require("../lib/active_msg");

// 获取到所有的活动信息
router.post('/', function(req, res, next) {
	//判断是否登录
   console.log(req.session.username);
	if(typeof(req.session.username)=="undefined"  || req.session.username ==""){
		res.json({"isActive":2})
	}else{
		//显示所有的自己活动
		activeMsg.getAllActive(req.session.username,req,res)
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
  activeMsg.addActive(option,req,res);
});

//修改一个活动信息


//删除一个活动信息

module.exports = router;
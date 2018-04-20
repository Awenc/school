var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.username);
});


router.get('/NowUsers', function(req, res, next) {
	if(typeof(req.session.username)=="undefined"){
		req.session.username="";
	}
  // console.log(typeof(req.session.username)=="undefined");
  res.json({"username":req.session.username});
});

router.get('/out', function(req, res, next) {
	req.session.username="";
 	res.json({"isOut":"1"});
});

module.exports = router;

//处理参加的活动

var connection=require("./connect");
var con=new connection().connection;


//  从数据库中获取到用户参加的所有活动信息getAllJoin(req.session.username,req,res)
exports.getAllJoin=function(username,req,res){
	var sql="select * from joinactive,actives,user_msg where actives.username=user_msg.username and joinactive.active_id=actives.id and join_username=?;"
	var Sql_Params=[username];
	con.query(sql,Sql_Params,function(err,result){
		
		if(result.length!=0){
			res.json({"allJoinActive":result,"isJoinActive":1})
		}else{
			res.json({"isJoinActive":0})
		}
	})
}

//取消参加的一个活动
exports.cancelJoin=function(option,req,res){
	
	var sql="DELETE FROM joinactive WHERE active_id =? and join_username=?";
	var sql_val=[option.id,option.username];
	con.query(sql,sql_val,function(err,result){
		if(err) throw err;
		// console.log(result);
		if(result.affectedRows == 1){
			res.json({"isDel":0});
		}else{
			res.json({"isDel":1});
		}
	});	
}




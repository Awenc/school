var connection=require("./connect");
var con=new connection().connection;


//  从数据库中获取到用户的信息


exports.findAll=function(req,res){
	var sql="select * from actives,user_msg where actives.username =user_msg.username and actives.isdel = '0'"
	con.query(sql,function(err,result){
		
		if(result.length!=0){
			res.json({"activeMsg":result,"isOk":1})
		}else{
			res.json({"isOk":0})
		}
	})
}
//用户参加一个活动
exports.joinActive=function( option,req,res){
    //添加到joinActive表中

    //添加之前判断自己是否已经参加
    var isJoin=false;
	var Sql="select * from joinActive where active_id=?"
	var Sql_Params = [option.id];
	con.query(Sql,Sql_Params,function(err,result){
		// console.log(result);
		if(result.length!=0){
			for(var i=0;i<result.length;i++){
				if(result[i].join_username == option.username){
					res.json({"isActive":4});
					isJoin=false;
					break;
				}else{
					isJoin=true;
				}
			}
			if(isJoin){
				addToData( option,req,res);
			}
		}else{
			addToData( option,req,res);
		}
	})

}
function addToData( option,req,res){
    var  userAddSql = 'INSERT INTO joinActive(active_id,join_username) VALUES(?,?)';
    var  userAddSql_Params = [option.id,option.username];
    con.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err) throw err;
        if(result.affectedRows == 1){   //用户添加进去了
            res.json({"isActive":0})
        }
        else{
            res.json({"isActive":1})
        }
    });		
}

// SELECT count(active_id) from joinactive where active_id=2;
//查询一个活动的总人数
exports.joinCount=function(id,req,res){
    //添加到joinActive表中
    var  Sql = 'SELECT count(active_id) from joinactive where active_id=?';
    var  Sql_Params = [id];
    con.query(Sql,Sql_Params,function (err, result) {
        if(err) throw err;
        if(result.length!=0){
        	res.json({"num":result,"isTrue":0})
        }else{
        	res.json({"isTrue":1})
        }
    });	
}

//获取所有的人员名单
exports.getAllJoinUsers=function(id,req,res){
    //添加到joinActive表中
    var  Sql = 'SELECT * from joinactive,user_msg where joinactive.join_username = user_msg.username and joinactive.active_id=?';
    var  Sql_Params = [id];
    con.query(Sql,Sql_Params,function (err, result) {
        if(err) throw err;
        if(result.length!=0){
        	res.json({"allUsers":result,"isTrue":0})
        }else{
        	res.json({"isTrue":1})
        }
    });	
}
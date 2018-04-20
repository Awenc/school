var connection=require("./connect");
var con=new connection().connection;

//  从数据库中获取到用户的信息


exports.findUserMsg=function(username,req,res){
  	var msg;
	var sql="SELECT *FROM user_msg WHERE username=?"
	var sql_val=[username];
	con.query(sql,sql_val,function(err,result){
		
		if(result.length==1){
			res.json({"usermsg":result,"isUser":1})
		}else if(result.length == 0){
			res.json({"isUser":0})
		}
	})
}
// 在数据库中修改用户信息
exports.changeUser=function(option,req,res){
	var  userAddSql = "UPDATE user_msg SET name=?,age=?,sex=?,birth=?,nowclass=?,job=?,address=?,qqnum=?,mail=?,tel=?,about=? WHERE username=?";
	var  userAddSql_Params = [option.name,option.age,option.sex,option.birth,option.nowclass,option.job,option.address,option.qqnum,option.mail,option.tel,option.about,option.username];
	console.log(option);
	con.query(userAddSql,userAddSql_Params,function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.changedRows == 1){
			res.json({"isChanged":1})
		}else{
			res.json({"isChanged":0})
		}

	});	
}
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

//查找所有的用户信息
exports.findAll=function(req,res){
		var sql="SELECT *FROM user_msg"
		con.query(sql,function(err,result){
		if(err) throw err;
			// console.log(result[i]);
		res.json({"allUsers":result});
		//return result;异步需要时间   这个时候返回没有值
	});
}



// 在数据库中修改用户信息
exports.changeUser=function(option,req,res){

	//判断数据库中有没有信息 

	//没有信息  insert
	var sql="SELECT *FROM user_msg WHERE username=?"
	var sql_val=[option.username];
	con.query(sql,sql_val,function(err,result){
		
		if(result.length==0){
			//新插入一条数据
			var insertUserSql="INSERT INTO user_msg(username,name,age,sex,birth,nowclass,job,address,qqnum,mail,tel,about) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
			var insertUserSql_Params=[option.username,option.name,option.age,option.sex,option.birth,option.nowclass,option.job,option.address,option.qqnum,option.mail,option.tel,option.about];
			con.query(insertUserSql,insertUserSql_Params,function (err, result) {
				if(err) throw err;
				if(result.affectedRows == 1){
					res.json({"isChanged":1});			
				}else{
					res.json({"isChanged":0})
				}

			});	
		}else{
			//有信息 updata

			
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
	})


}

//修改密码
exports.changePassword=function(password,req,res){
	var  userAddSql = "UPDATE users SET password=? WHERE username=?";
	var  userAddSql_Params = [password,req.session.username];
	// console.log(option);
	con.query(userAddSql,userAddSql_Params,function(err,result){
		if(err) throw err;
		// console.log(result);
		if(result.changedRows == 1){
			res.json({"isChanged":1})
		}else{
			res.json({"isChanged":0})
		}

	});	
}

//根据条件查询

exports.findForType=function(option,req,res){
	var isSql="";
	// console.log(option);
	if(option.name !=""){
		isSql +="name LIKE '%"+option.name+"%' AND";
	}
	if(option.age !=""){
		isSql +=" age LIKE '%"+option.age+"%' AND";
	}
	if(option.sex !=""){
		isSql +=" sex='"+option.sex+"'AND";	
	}
	if(option.nowClass !=""){
		isSql +=" nowclass LIKE '%"+option.nowClass+"%' AND";
	}
	if(option.job !=""){
		isSql +=" job LIKE '%"+option.job+"%' AND";
	}
	if(option.address !=""){
		isSql +=" address LIKE '%"+option.address+"%' AND";
	}

	isSql=isSql.substring(0,isSql.length-3);
	var sql="SELECT *FROM user_msg WHERE "+isSql;
	// console.log(sql);
	con.query(sql,function(err,result){
		if(err) throw err;
		if(result.length==0){
			res.json({"searchUser":[],"search":0});
		}else{
			res.json({"searchUser":result,"search":1});
		}
	})
};

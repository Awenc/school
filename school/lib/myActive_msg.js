//添加活动信息处理

var connection=require("./connect");
var con=new connection().connection;


//添加一个自己的活动
exports.addActive=function(option,req,res){
    console.log("添加新活动到数据库中");
    console.log(option);
    var  userAddSql = 'INSERT INTO actives(id,time,tit,content,active_address,username,ischange,isdel) VALUES(0,?,?,?,?,?,?,?)';
    var  userAddSql_Params = [option.time,option.tit,option.content,option.address,option.username,option.ischange,'0'];
    con.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err) throw err;
        if(result.affectedRows == 1){   //用户添加进去了
            res.json({"isAdd":0})
        }
        else{
            res.json({"isAdd":1})
        }
    });
}
//获取自己的所有活动
exports.getAllActive=function(username,req,res){
		var sql="SELECT *FROM actives WHERE username=? and isdel != '1'";
		var sql_params=[username];
		con.query(sql,sql_params,function(err,result){
		if(err) throw err;
			// console.log(result[i]);
		res.json({"allActive":result});
		//return result;异步需要时间   这个时候返回没有值
	});
}

//删除一个自己的活动
exports.delActive=function(id,req,res){
	//删除活动并没有直接删除 而是不可见 等管理员删除
	var  Sql = "UPDATE actives SET isdel='1' WHERE id=?";
	var  Sql_Params = id;
	// console.log(option);
	con.query(Sql,Sql_Params,function(err,result){
		if(err) throw err;
		// console.log(result);
		if(result.changedRows == 1){
			//删除修改
			res.json({"isDel":0});
		}else{
			//删除失败
			res.json({"isDel":1});
		}

	});

	// console.log("正在删除"+id);
	// 	var sql="DELETE FROM actives WHERE id =?";
	// 	var sql_val=[id];
	// 	con.query(sql,sql_val,function(err,result){
	// 		if(err) throw err;
	// 		// console.log(result);
	// 		if(result.affectedRows == 1){
	// 			res.json({"isDel":0});
	// 		}else{
	// 			res.json({"isDel":1});
	// 		}
	// 	});	
}

//更新一个活动

exports.updataActive=function(option,req,res){
	var  Sql = "UPDATE actives SET time=?,tit=?,content=?,active_address=?,ischange=?,isdel='0' WHERE id=?";
	var  Sql_Params = [option.time,option.tit,option.content,option.address,option.ischange,option.id];
	// console.log(option);
	con.query(Sql,Sql_Params,function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.changedRows == 1){
			//成功修改
			res.json({"isChanged":0});
		}else{
			//修改失败
			res.json({"isChanged":1});
		}

	});	
}
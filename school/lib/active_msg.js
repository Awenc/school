//添加活动信息处理

var connection=require("./connect");
var con=new connection().connection;


//添加一个自己的活动
exports.addActive=function(option,req,res){
    console.log("添加新活动到数据库中");
    console.log(option);
    //添加到user表中
    var  userAddSql = 'INSERT INTO actives(id,time,tit,content,address,username,ischange) VALUES(0,?,?,?,?,?,?)';
    var  userAddSql_Params = [option.time,option.tit,option.content,option.address,option.username,option.ischange];
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
		var sql="SELECT *FROM actives WHERE username=?";
		var sql_params=[username];
		con.query(sql,sql_params,function(err,result){
		if(err) throw err;
			// console.log(result[i]);
		res.json({"allActive":result});
		//return result;异步需要时间   这个时候返回没有值
	});
}
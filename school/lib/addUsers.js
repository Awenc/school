var connection=require("./connect");
var con=new connection().connection;



exports.addUser=function(option,req,res){
    console.log("添加新用户到数据库中");
    //添加到user表中
    var  userAddSql = 'INSERT INTO users(id,username,password) VALUES(0,?,?)';
    var  userAddSql_Params = [option.username,option.password];
    con.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err) throw err;
        if(result.affectedRows == 1){   //用户添加进去了
         req.session.username=option.username;
            res.json({"isTrue":0})

        }
        else{
            res.json({"isTrue":1})
        }
    });
}


exports.isUserExit=function(username,req,res){
    console.log("进入数据库查询");
    console.log(username);
    var exit=false;
    con.query("SELECT *FROM users",function(err,result){
        if(err) throw err;
        for(var i=0;i<result.length;i++){
            if(result[i].username == username){
                exit=true;
                res.json({"isExit": 1}); //发送json数前端表示这个用户名存在
                break;
            }
        }
        if(!exit) res.json({"isExit": 0}); //表示这个用户名可以用
    });
}
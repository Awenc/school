var connection=require("./connect");
var con=new connection().connection;



exports.isUser=function(option,req,res){
    console.log("进入数据库查询");
    var exit=false;
    con.query("SELECT *FROM users",function(err,result){
        if(err) throw err;
        for(var i=0;i<result.length;i++){
            if(result[i].username == option.username){
                if(result[i].password == option.password){
                    exit=true; 
                    req.session.username=result[i].username;
                    res.json({"isExit": 0}); //登录成功

                    //添加到session中

                    break;                    
                }

            }
        }
        if(!exit) res.json({"isExit": 1}); //登录失败
    });
}
var connection=require("./connect");
var con=new connection().connection;

var changeUsersMsg=require("./userMsg");

exports.isAdmin=function(option,req,res){
    console.log("进入数据库查询");
    var exit=false;
    con.query("SELECT *FROM admin_msg",function(err,result){
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

exports.getAllMsg=function(username,req,res){
    console.log("进入数据库查询");
    var  sql="SELECT *FROM admin_msg WHERE username =?";
    var  sql_params=[username];
    con.query(sql,sql_params,function(err,result){
        if(err) throw err;
        if(result.length == 0){
            res.json({"isAdmin": 1});
        }else{
            getAll(req,res);
        }
    });
}

function getAll(req,res){
    var msg={};
    // select count(*) from users;
    //获取注册的总人数
    con.query("select count(*) from users",function(err,result){
        if(err) throw err;
        console.log("总人数:"+result);
        msg.userSum=result;
        // select count(*) from actives;  所有活动
        //select count(*) from actives where ischange = '1';所有修改过的活动
        //select count(*) from actives where isdel = '1'; 所有删除的活动

        con.query("select count(*) from actives",function(err,result){
            if(err) throw err;
            console.log("总活动:"+result); 
            msg.actSum=result;
            con.query("select count(*) from actives where ischange = '1'",function(err,result){
                if(err) throw err;
                console.log("总修改活动:"+result);
                msg.actChangeSum=result;
                con.query("select count(*) from actives where isdel = '1'",function(err,result){
                    if(err) throw err;
                    console.log("总删除活动:"+result);
                    msg.actDelSum=result;  
                    res.json({"isAdmin": 0,"all":msg});        
                });           
            });

        });



    });
}

exports.getPassword=function(username,req,res){
    // console.log("进入数据库查询");
    var  sql="SELECT *FROM users WHERE username =?";
    var  sql_params=[username];
    con.query(sql,sql_params,function(err,result){
        if(err) throw err;
        if(result.length != 0){
            res.json({"userPassword": result});
        }else{
            
        }
    });
}


exports.changed=function(username,password,option,req,res){
    //判断是否存在   不存在insert
    var sql="SELECT *FROM users WHERE username=?"
    var sql_val=[username];
    con.query(sql,sql_val,function(err,result){
        
        if(result.length==0){
            //新插入一条数据
            var insertUserSql="INSERT INTO users VALUES(0,?,?)"
            var insertUserSql_Params=[username,password];
            con.query(insertUserSql,insertUserSql_Params,function (err, result) {
                if(err) throw err;
                if(result.affectedRows == 1){
                     changeUsersMsg.changeUser(option,req,res);    
                }else{
                    res.json({"isChanged":0})
                }

            }); 
        }else{
            //有信息 updata
            var  userAddSql = "UPDATE users SET username=?,password=? WHERE username=?";
            var  userAddSql_Params = [username,password,username];
            // console.log(option);
            con.query(userAddSql,userAddSql_Params,function(err,result){
                if(err) throw err;
                // console.log(result);
                // console.log("开始修改账号面")
                changeUsersMsg.changeUser(option,req,res);

            });            
        }
    })

}

exports.delUser=function(username,req,res){
    // console.log("正在删除"+id);
     var sql="DELETE FROM users WHERE username =?";
     var sql_val=[username];
     con.query(sql,sql_val,function(err,result){
         if(err) throw err;
         // console.log(result);
         if(result.affectedRows == 1){
             var delsql="DELETE FROM user_msg WHERE username =?";
             var delsql_val=[username];
             con.query(delsql,delsql_val,function(err,result){
                 if(err) throw err;
                 // console.log(result);
                 if(result.affectedRows == 1){
                     res.json({"isDel":0});
                 }else{
                     res.json({"isDel":1});
                 }
             });              
         }else{
             res.json({"isDel":1});
         }
     }); 

}
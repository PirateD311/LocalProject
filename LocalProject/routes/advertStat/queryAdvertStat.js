/**
 * Created by liuxun on 16/2/20.
 */
var express=require('express');
var router=express.Router();

router.post('/',function(req,res,next){
    //var isInputValid=G_fn_checkInput(req,["web_owner_name","web_owner_password"]);
    console.log("body:"+JSON.stringify(req.body));
    if(true){
        var sql=easyQuery("stat_advertflow",req.body,"");
        G_fn_DB_select(sql,"",function(ret){
            res.send(ret);
        });
    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

function easyQuery(table,condition,colname)
{
    var sql="select * from "+table+" where ";
    console.log(JSON.stringify(condition));

    for(var key in condition){
        sql=sql+key+" = '"+condition[key]+"'and";
    }
    console.log(sql.length);
    sql=sql.substring(0,sql.length-3);
    console.log(sql);
    return sql;

}

module.exports=router;
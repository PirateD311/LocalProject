/**
 * Created by liuxun on 16/4/4.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var easySql=G_fn_parseReqToArray(req);
    var isInputValid=G_fn_checkInput(req,["web_owner"]);
    if(isInputValid){
        var sql_obj={
            "table":"stat_advertflow",
            "sql":"insert into stat_advertflow("+easySql.filed+") values ("+easySql.wenhao+")",
            "key":"",
            "key_value":"",
            "values":easySql.pamer
        };
        G_fn_DB_insert(sql_obj.sql,easySql.pamer,function(ret){
            //ret.web_owner_name=req.body.web_owner_name;
            console.log("网站注册结果为：%s",JSON.stringify(ret));
            res.send(ret);
        });
    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
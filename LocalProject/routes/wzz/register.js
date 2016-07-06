/**
 * Created by liuxun on 16/3/18.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var easySql=G_fn_parseReqToArray(req);
    var isInputValid=G_fn_checkInput(req,["web_owner_name","web_ip","web_domain"]);
    if(isInputValid){
        var sql_obj={
            "table":"web_register",
            "sql":"insert into web_register("+easySql.filed+") values ("+easySql.wenhao+")",
            "key":"web_ip",
            "key_value":req.body["web_ip"],
            "values":easySql.pamer
        };
        G_fn_DBp_insert(sql_obj,function(ret){
            ret.web_owner_name=req.body.web_owner_name;
            console.log("网站注册结果为：%s",JSON.stringify(ret));
            res.send(ret);
        });
    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
/**
 * Created by liuxun on 16/3/18.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var easySql=G_fn_parseReqToArray(req);
    var isInputValid=G_fn_checkInput(req,["web_owner_name","web_owner_password","web_owner_phone"]);
    if(isInputValid){
        var sql_obj={
            "table":"web_signed",
            "sql":"insert into web_signed("+easySql.filed+") values (?,?)",
            "key":"web_owner_name",
            "key_value":req.body["web_owner_name"],
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
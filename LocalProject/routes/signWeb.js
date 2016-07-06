/**
 * Created by liuxun on 16/2/21.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var easySql=G_fn_parseReqToArray(req);
    var isInputValid=G_fn_checkInput(req,["web_owner_name","web_ip"]);
    if(isInputValid){
        var sql_obj={
            "table":"web_signed",
            "sql":"insert into web_signed("+easySql.filed+") values (?,?)",
            "key":"web_ip",
            "key_value":req.body["web_ip"],
            "values":easySql.pamer
        };
        G_fn_DBp_insert(sql_obj,function(ret){
            console.log("网站注册结果为：%s",JSON.stringify(ret));
            if(ret.code==1){
                var sql_obj2={
                    "table":"stat_advertflow",
                    "sql":"insert into stat_advertflow(web_owner,web_ip) values (?,?)",
                    "key":"web_owner",
                    "key_value":req.body["web_ip"],
                    "values":[req.body["web_owner_name"],req.body["web_ip"]]
                };
                G_fn_DBp_insert(sql_obj2,function(ret2){
                    res.send(ret2);
                });
            }else{
                res.send(ret);
            }
        });
    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
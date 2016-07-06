/**
 * Created by liuxun on 16/3/18.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var easySql=G_fn_parseReqToArray(req);
    var isInputValid=G_fn_checkInput(req,["web_owner_name"]);
    if(isInputValid){
        easySql.pamer.push(1);
        easySql.pamer.push(req.body.web_owner_name);
        var sql_obj={
            "table":"web_signed",
            "sql":"UPDATE web_signed SET web_owner_phone = ? ,web_owner_qq = ? ,web_owner_password = ?,web_god_name = ? WHERE web_owner_name = ?",
            "key":"web_owner_name",
            "key_value":req.body["web_owner_name"],
            "values":[req.body.web_owner_phone,req.body.web_owner_qq,req.body.web_owner_password,req.body.web_god_name,req.body.web_owner_name]
        };
        G_fn_DBp_update(sql_obj,function(ret){
            console.log("个人信息编辑结果为：%s",JSON.stringify(ret));
            res.send(ret);
        });
    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
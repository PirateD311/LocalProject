/**
 * Created by liuxun on 16/3/24.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var isInputValid=G_fn_checkInput(req,["web_ip"]);
    if(isInputValid){
        console.log(req.body["web_ip"]);
        var sql="";
        for(key in req.body)
        {
            sql=sql+key+" = '"+req.body[key]+"' ,";
        }
        sql=sql.substring(0,sql.length-1);
        console.log(sql);
        var sql_obj={
            "table":"web_register",
            "sql":"UPDATE web_register SET "+sql+ "WHERE web_ip = '"+req.body["web_ip"]+"'",
            "key":"web_ip",
            "key_value":req.body["web_ip"],
            "values":[]
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
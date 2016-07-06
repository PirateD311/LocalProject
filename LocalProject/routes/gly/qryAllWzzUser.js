/**
 * Created by liuxun on 16/4/16.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var isInputValid=G_fn_checkInput(req,[]);
    if(isInputValid){
        var sql="select web_owner_name,web_sign_date,web_state from web_signed";

        G_fn_DB_select(sql,"",function(ret){
            console.log("查询所有注册会员结果为：%s",JSON.stringify(ret));
            res.send(ret);
        });

    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
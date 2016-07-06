/**
 * Created by liuxun on 16/3/20.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    //var isInputValid=G_fn_checkInput(req,["web_owner_name","web_owner_password"]);
    console.log("body"+req.body);
    if(true){
        var sql="select * from web_signed";
        G_fn_DB_select(sql,"",function(ret){
            res.send(ret);
        });

    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
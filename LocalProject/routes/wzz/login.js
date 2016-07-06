/**
 * Created by liuxun on 16/3/18.
 */
var express = require('express');
var router = express.Router();

router.post('/',function(req,res,next){
    var isInputValid=G_fn_checkInput(req,["web_owner_name","web_owner_password"]);
    if(isInputValid){
        var sql="select * from web_signed where web_owner_name = ? and web_owner_password = ?";
        G_fn_DB_select(sql,[req.body.web_owner_name,req.body.web_owner_password],function(ret){
            ret.web_owner_name=req.body.web_owner_name;
            res.send(ret);
        });

    }else{
        res.send(RET_ERROR_INPUTWRONG);
    }
});

module.exports=router;
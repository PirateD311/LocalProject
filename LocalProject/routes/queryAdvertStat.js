/**
 * Created by liuxun on 16/2/20.
 */
var express=require('express');
var router=express.Router();

router.post('/',function(req,res,next){
    var sql="select * from stat_advertflow";
    G_fn_DB_select(sql,"",function(ret){
        console.log(JSON.stringify(ret));
        res.send(ret);
    });
})

module.exports = router;
var express = require('express');
var router = express.Router();
var urllib = require('url')
var oPvStats=require('../DIY_Fun/Visitor.js');
/* GET home page. */
router.get('/', function(req, res, next) {

    statsFlow(req);
    var DocHtml="<img style='position: fixed;bottom:0;right: 0;' src='http://img2.imgtn.bdimg.com/it/u=2104188810,1731935876&fm=21&gp=0.jpg' />";
    var data={"PvStats":oPvStat.show(),"DocHtml":DocHtml};
    var pamers=urllib.parse(req.url, true);
    //console.log("url 是：%s",JSON.stringify(pamers.query));
    var str =  pamers.query.jsoncallback + '(' + JSON.stringify(data) + ')';
    //console.log("响应 是：%s",str);
    //流量统计方法

    res.send(str);
   // res.json({"PvStats":oPvStat.show(),"DocHtml":DocHtml});
    //res.render('index', { title: 'Express' });
});
//********************
// 流量统计shi
var oPvStat=new oPvStats();

function statsFlow(req)
{
  /*
  fs.writeFile(path.join(__dirname,'requst_obj.js'),req,function(err){
    console.log(err);
  });
  */
  var ip=G_fn_Ip_getClientIp(req);
  console.log("vistor ip : %s",G_fn_Ip_getClientIp(req));
  console.log("来自 [%s] 的广告请求");
  //是否已注册
  var sql_querySigned="select * from web_signed where web_ip = ?";
  G_fn_DB_select(sql_querySigned,ip,function(ret){
    console.log("查询ip注册表结果为：%s",JSON.stringify(ret));
    if(ret.code==1){
      console.log("IP 已注册，可返回广告。");
    }
    if(ret.code==2){
      console.log("数据库错误");
    }
    if(ret.code==3){
      console.log("[%s]未注册",ip);
    }
  });
  //console.log(oPvStat.show());

}

module.exports = router;



/*
function oPvStats(){
  console.log("A PvStats is create!");
  this.PvStats={"WebIpBox":[]};
  //添加统计
  this.newVisit=function(ip){
    console.log(this.PvStats.WebIpBox);
    
    var i=checkIp(ip,this.PvStats.WebIpBox);
    if(i>=0){
      this.PvStats.WebIpBox[i].visit();
    }else{
      this.PvStats.WebIpBox.push(new oWebIp(ip));
    }
  
  }
  //显示目前统计结果
  this.show=function(){
    var str="PvStats Result:\n";
    for(var i=0;i<this.PvStats.WebIpBox.length;i++){
      str=str+this.PvStats.WebIpBox[i].show()+"\n";
    }
    return str;
  }

  function checkIp(ip,WebIpBox){
    //console.log(WebIpBox);
    for(var i=0;i<WebIpBox.length;i++){
      if (ip==WebIpBox[i].ip) {
        return i;
      };
    }
    return -1;
  }
}
//网站主对象
function oWebIp(ip)
{
  var nUvTimeout=5000;//UV访客时长
  var bUvFlag=true;
  var timeout;
  this.ip=ip;
  this.pv=1;
  this.uv=1;

  this.visit=function(){
    this.addPv();
    this.addUv();
  };
  this.addUv=function(){
    if (!bUvFlag) {
      console.log("new uv");
      this.uv++; 
      bUvFlag=true; 
    };
    if (timeout!=null) {
      clearTimeout(timeout);
      console.log("Droop a timeout");
    };
    //clearTimeout(this.timeoutId);
    timeout=setTimeout(function(){
      //console.log("TimeoutId is [%d]",timeout);
      console.log("uv logout ");
      bUvFlag=false;
    },nUvTimeout);
    console.log("Timeout is ###"+timeout);
  };
  this.addPv=function(){
    this.pv++;
  }
  this.show=function(){
    var str=this.ip+"|pv:"+this.pv+"|uv"+this.uv;
    return str;
  }
}
*/
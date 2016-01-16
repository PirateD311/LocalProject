var express = require('express');
var router = express.Router();
var oPvStats=require('../DIY_Fun/Visitor.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  //流量统计方法
  statsFlow(req);
  var DocHtml="<img src='http://img2.imgtn.bdimg.com/it/u=2104188810,1731935876&fm=21&gp=0.jpg' />"
  res.json({"PvStats":oPvStat.show(),"DocHtml":DocHtml});
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
  console.log("vistor ip : %s",G_fn_Ip_getClientIp(req));
  oPvStat.newVisit(G_fn_Ip_getClientIp(req));
  console.log(oPvStat.show());
  

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
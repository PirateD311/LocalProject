console.log("Node Build Test");
//module.exports=oPvStats;
//流量统计类,针对来源（网站ip）进行区分
/*
  function:
    newVisit(ip),   
    show()
  value:
    PvStats

*/
module.exports=function oPvStats(){
  console.log("A PvStats is create!");
  //针对站长的统计
  this.PvStats={"WebIpBox":[]};
  var self=this;
  //添加统计至数据库
  this.newVisitToDB=function(ip){

  };
  //数据库记录统计
  this.StatIpReq=function(ip){
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
  };
  //添加统计
  this.newVisit=function(ip){
    console.log(this.PvStats.WebIpBox);
    var sql_queryAdvertFlow="select * from stat_advertflow where web_ip = ?";
    G_fn_DB_select(sql_queryAdvertFlow,ip,function(ret){
      if(ret.code==1){
        console.log("[%s]已存在记录",ip);
        var i=checkIp(ip,self.PvStats.WebIpBox);
        if(i>=0){
          self.PvStats.WebIpBox[i].visit();
        }else{
          self.PvStats.WebIpBox.push(new oWebIp(ip));
        }
      }
      if(ret.code==2){
        console.log("数据库异常");
      }
      if(ret.code==3){
        console.log("[%s]无统计记录，请确认ip是否已注册...",ip);
      }
    });
    /*
    var i=checkIp(ip,this.PvStats.WebIpBox);
    if(i>=0){
      this.PvStats.WebIpBox[i].visit();
    }else{
      this.PvStats.WebIpBox.push(new oWebIp(ip));
    }
  */
  };
  //显示目前统计结果
  this.show=function(){
    var str="PvStats Result:\n";
    for(var i=0;i<this.PvStats.WebIpBox.length;i++){
      str=str+this.PvStats.WebIpBox[i].show()+"\n";
    }
    return str;
  }
  //ip是否是新的
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
  var nUvTimeout=10000;//UV访客时长
  var bUvFlag=true;
  var timeout;
  this.ip=ip;//网站ip
  this.pv=1;
  this.uv=1;
  var self=this;

  //初始化
  var sql_selectAdvertFlow="select * from stat_advertflow where web_ip = ?";
  G_fn_DB_select(sql_selectAdvertFlow,ip,function(ret){
    console.log("初始化%s 网站主对象...流量统计结果为:",ip);
    console.log(JSON.stringify(ret));
    if(ret.code==1){
      self.pv=ret.data[0].CPA;
      self.uv=ret.data[0].CPA;
    }
    if(ret.code==2){

    }
    if(ret.code==3){

    }
  });

  this.visit=function(){
    this.addPv();
    this.addUv();
  };
  this.addUv=function(){
    if (!bUvFlag) {
      console.log("new uv");
      this.uv++;
      var sql="select CPC from stat_advertflow where web_ip = ?";
      console.log("query database#######");
      G_fn_DB_select(sql,self.ip,function(res){
        console.log("查 ip 结果为：%s",JSON.stringify(res));
        switch (res.code){
          case 1:var sql2="update stat_advertflow set CPC=? where web_ip=?";
            G_fn_DB_update(sql2,[res.data[0].CPC+1,self.ip],function(res2){
              console.log(JSON.stringify(res2));
              return;
            });
            break;
          case 2:console.log("修改PV失败");
            break;
          default :break;
        }
      });
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
    var sql="select CPA from stat_advertflow where web_ip = ?";
    console.log("query database#######");
    G_fn_DB_select(sql,self.ip,function(res){
      console.log("ip--->%s",self.ip);
      console.log("添加PV方法  查 ip 结果为：%s",JSON.stringify(res));
      switch (res.code){
        case 1:var sql2="update stat_advertflow set CPA=? where web_ip=?";
               G_fn_DB_update(sql2,[res.data[0].CPA+1,self.ip],function(res2){
                  console.log(JSON.stringify(res2));
                  return;
               });
              break;
        case 2:console.log("修改PV失败");
              break;
        case 3:console.log("IP未记录");
              break;
        default :break;
      }
    });
  };
  this.show=function(){
    var str=this.ip+"|pv:"+this.pv+"     |uv"+this.uv;
    return str;
  }
}
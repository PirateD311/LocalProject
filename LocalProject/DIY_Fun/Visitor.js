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
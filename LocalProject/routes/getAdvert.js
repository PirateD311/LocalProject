/**
 * Created by liuxun on 16/2/12.
 */
var express = require('express');
var router = express.Router();
var urllib = require('url')
var oPvStats=require('../DIY_Fun/Visitor.js');
/* GET home page. */
router.get('/', function(req, res, next) {
 console.log("********************************");
 console.log(req.ip);
 //��վ��ȡ�������
 if(checkClientIp(req))
 {
    //ͳ������
   // statsFlow(req);
    //��ȡ�����

    //���ع����
 }


  //�����Ƿ�������ע�����վ
  //����ͳ�Ʒ���
  statsFlow(req);
  //�����
  var DocHtml="<img href='www.baidu.com' style='position: fixed;bottom:0;right: 0;' src='images/Guanggao01.gif' />";


  //jsonpcallback ���ص����
  var data={"PvStats":oPvStat.show(),"DocHtml":DocHtml};
  var pamaers=urllib.parse(req.url, true);;
  //console.log("url �ǣ�%s",JSON.stringify(pamaers.query));
  var str =  pamaers.query.jsoncallback + '(' + JSON.stringify(data) + ')';
  //console.log("��Ӧ �ǣ�%s",str);

  res.send(str);

});

//********************
// ����ͳ��shi
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

function checkClientIp(){

}
module.exports = router;



/*
 function oPvStats(){
 console.log("A PvStats is create!");
 this.PvStats={"WebIpBox":[]};
 //���ͳ��
 this.newVisit=function(ip){
 console.log(this.PvStats.WebIpBox);

 var i=checkIp(ip,this.PvStats.WebIpBox);
 if(i>=0){
 this.PvStats.WebIpBox[i].visit();
 }else{
 this.PvStats.WebIpBox.push(new oWebIp(ip));
 }

 }
 //��ʾĿǰͳ�ƽ��
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
 //��վ������
 function oWebIp(ip)
 {
 var nUvTimeout=5000;//UV�ÿ�ʱ��
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
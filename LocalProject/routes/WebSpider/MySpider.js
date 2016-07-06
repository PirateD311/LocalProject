var http=require('http'),
	cheerio = require('cheerio'),
	fs=require('fs');

var SpiderEat=require("./SpiderEat.js"),
	SpiderMind=require("./SpiderMind.js");
var url="http://www.rrrr58.com/p04/list_13.html";
var urlWait=[];
	main();

function main(){
	count=0;
	oSpiderMind=new SpiderMind(url);
	gg();

function gg(){
	console.log("Clam...");
	
	if(oSpiderMind.hasNext()){
		var nexturl=oSpiderMind.next();
		if(nexturl.match(/\/htm.+p\d.+?.html/ig)==null&&nexturl.match(/\/htm.+[a-z]\d.+?.html/ig)!=null){
			gg();
			return;
		}
		SpiderRun(nexturl,function(){
			setTimeout(function(){
				gg();
			},3000)
		});
	}else{
		return ;
	}
}


}

function SpiderRun(startUrl,callback){

	try{
		var req=http.request(startUrl,function(res){
			console.log(res.statusCode);
			if(res.statusCode!=200){
				//return false;
			}
			var size=0;
			var chunks=[];
			res.on('data',function(chunk){
				//console.log(chunk);
				size+=chunk.length;
				chunks.push(chunk);
			});
			res.on('end',function(){
				console.log("获取数据成功");
				var data=Buffer.concat(chunks,size);
				var Spider=new SpiderEat();
				var urls=Spider.eatPage(data);
				oSpiderMind.inputURL(urls);
				callback();
			});
			res.on('error',function(err){
				console.log("Response Error:",err);
			});
		});
		req.on('error',function(err){
			console.log(err);
			callback(err);
		});
		req.end();
	}catch(err){
		console.log(err);
		callback();
	}
}

var http=require('http'),
	cheerio = require('cheerio'),
	fs=require('fs');

var SpiderEat=require("./SpiderEat.js"),
	SpiderMind=require("./SpiderMind.js");
var url="http://www.rrrr58.com/p02/index.html";
var urlWait=[];
	main();


function main(){
	count=0;
	oSpiderMind=new SpiderMind(url);
	gg();

function gg(){
	console.log("Clam...");
	
	if(oSpiderMind.hasNext()&&count++<100){
		SpiderRun(oSpiderMind.next(),function(){
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
		});
		req.end();
	}catch(err){
		console.log(err);
		callback();
	}
}

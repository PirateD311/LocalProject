/*
	保存页面的数据

*/
var cheerio = require('cheerio'),
	fs = require('fs'),
	http = require('http'),
	path = require('path');
ROOT_DIR="/Users/liuxun/WebstormProjects/LocalProject/LocalProject/"
var superfs=require(ROOT_DIR+"DIY_Fun/G_superFS.js");

//处理扒到的页面内容
module.exports=function SpiderEat(){
	this.filePath="DataStore/";
	var self=this;
	var UrlWait=[];
	this.eatPage=function(data){
		var $=cheerio.load(data);
		var food=filterHtmlData($);
		if(food.length>0){
			storeDataByFile(food);
		}else{
			console.log("没啥好吃的");
		}
		return getAllHref(data);
	};



	//存储筛选后的信息
	//private function
	function storeDataByFile(food){
		var path=self.filePath;
		var today=new Date().toDateString();
		var title=food[0];
		path=path+today+"/"+title+"/";
		//创建目录:日期／标题／img/
		superfs.mkdir(path,function(err){
			console.log(err);
			for(var i=1;i<food.length;i++){
				//保存图片				
				var name=path+i+".png"
				downloadImage(food[i],name);
			}
		});
		/*
		var htmlDoc="<html><body>";
		path+=food[0];
		//保存html
		path+=".html";
		htmlDoc+="</body></html>"
		fs.writeFile(path,htmlDoc,function(err){
			console.log(err);
		});
		*/
	}
	//过滤Page需要的信息，返回信息数组
	var filterHtmlData=function($){
		var ret=[];
		var title=$("title").text();
		ret.push(title);
		var data=$("#view1 img");
		if(data.length<1){
			return [];
		}
		for(var i=0;i<data.length;i++)
		{
			try{
				var src=data[i].attribs.src;
				//console.log(src);
				ret.push(src);
			}catch(e){
				console.log(e);
			}			
		}
		return ret;
	}

}
console.log(__dirname);
console.log(new Date().toDateString());

function downloadImage(src,name){
	http.get(src,function(res){
		var chunks="";
		res.setEncoding("binary"); 
		res.on("data",function(chunk){
			chunks+=chunk;
		});
		res.on("end",function(){
			fs.writeFile(name+".png", chunks, "binary", function(err){
            if(err){
                console.log("down fail");
            }
        });
		});
	}).end();
}
	//getAllHref('href="/p2/4/5.html"ddddw<>href="/p3/6/2.html"');
	//http://www.rrrr58.com/htm/2016/1/15/p03/353855.html
function getAllHref(data){
	var regexp=/href=\"\/.+?.html/g;
	var regexp2=/href=\"\/htm.+p.+?.html/g;
	data=data.toString();
	//console.log(data);
	var urls=data.match(regexp2);
	if(urls==null){
		urls=data.match(regexp);
	}
	//console.log(urls);
	return urls;
};


var fs=require("fs");
module.exports=function SpiderMind(RootUrl){
	this.RootUrl=RootUrl;
	this.PageCount=0;
	this.FootMark=[];
	this.UrlWait=[];
	this.currentStep=RootUrl;

	var self=this;
	var url_head="http://www.rrrr58.com";
	var footmark_fsname="SpiderFoot.txt";
	var footmark_fs;
	self.UrlWait.push(RootUrl);

	init();

	this.hasNext=function(){
		if(self.UrlWait.length>0){
			return true;
		}else{
			return false;
		}
	};
	this.next=function(){
		getNextUrl();
		console.log("Next Url is [%s]",self.currentStep);
		return self.currentStep;
	};
	this.inputURL=function(urls){
		for(i in urls){
			urls[i]=urls[i].replace('href="',"")
			if(urls[i].search("www.")<0){
				urls[i]=url_head+urls[i];
			}
			if(urls[i].search("http://")<0){
				urls[i]="http://"+urls[i];
			}
			//console.log(urls[i]);
			if(self.UrlWait.toString().search(urls[i])<0&&self.FootMark.toString().search(urls[i])<0){	
				self.UrlWait.push(urls[i]);
				//console.log("Pushed--->%s",urls[i]);
			}else{
				//console.log("%s--->已添加",urls[i]);
			}

		}
	};

	function init(){
		console.log("!!!!!!!!!!!!!!!!!")
		fs.readFile(footmark_fsname,function(err,data){
			if(err){
				console.log("init FootMark Failed",err);
			}else{
				self.FootMark=data.toString().split(',');
				console.log(self.FootMark);
			}
		})
	}

	function getNextUrl(){
		if(self.UrlWait.length>0){
			self.currentStep=self.UrlWait.shift();
			console.log("出站：%s",self.currentStep);
		}
		if(self.currentStep.match(/\/htm.+p\d.+?.html/ig)!=null){
			self.FootMark.push(self.currentStep);			
		}
		console.log("已浏览数：［%d］\t 待浏览：［%d］",self.FootMark.length,self.UrlWait.length);
		if(self.FootMark.length%10==0&&self.FootMark.length>=10){
			fs.writeFile(footmark_fsname,self.FootMark.toString(),function(err){
				console.log("记录%d条浏览记录",self.FootMark.length);
			});
		}
		//console.log(self.FootMark);		
	}

	// function getNextUrl(url){
	// 	var index=url.indexOf(".html");
	// 	var num=url.charAt(index-1);
	// 	num++;
	// 	//console.log(++num);
	// 	url=url.replace(self.regular,num+".html");
	// 	//console.log(url);
	// 	return url;
	// }	

}
/*
var testUrls=["123","234","345"];
console.log(testUrls,testUrls instanceof Array);
var strArray=testUrls.toString();
console.log("String Array is :%s.Is Array？",strArray,strArray instanceof Array);
fs.writeFile("text.txt",strArray,function(err){
	console.log("成功1")
});
strArray+=",456";
fs.writeFile("text.txt",strArray,function(err){
	console.log("成功2")
});
var strToArray=new Array();
strArray=fs.readFile("text.txt",function(err,data){
	if(err){

	}else{
		//console.log(data.toString());
		strToArray=data.toString().split(',');
		console.log(strToArray,strToArray instanceof Array);		
	}
	
});
*/


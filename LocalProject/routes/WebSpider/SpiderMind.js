module.exports=function SpiderMind(RootUrl){
	this.RootUrl=RootUrl;
	this.PageCount=0;
	this.FootMark=[];
	this.UrlWait=[];
	this.currentStep=RootUrl;

	var self=this;
	var url_head="http://www.rrrr58.com";
	self.UrlWait.push(RootUrl);

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
				console.log("Pushed--->%s",urls[i]);
			}else{
				console.log("%s--->已添加",urls[i]);
			}

		}
	};

	function getNextUrl(){
		if(self.UrlWait.length>0){
			self.currentStep=self.UrlWait.pop();
			console.log("出站：%s",self.currentStep);
		}
		self.FootMark.push(self.currentStep);
		console.log("浏览记录")
		console.log(self.FootMark);		
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

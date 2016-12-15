var fs=require('fs');

module.exports={
	"mkdir":function(dir,callback){
		console.log("My Mkdir test");
		var catalogs=[];
		var newDir="";
		//剥离__dirname
		dir=dir.replace(__dirname,"");
		catalogs=dir.split("/");
		console.log(catalogs);
		//逐层分解目录并检查
		//没有的目录就创建
		for(i in catalogs){
			newDir+=catalogs[i];
			if(newDir!=""){
				if(!fs.existsSync(newDir)){
					console.log(newDir+"不存在！创建。。。");
					try{
						fs.mkdirSync(newDir);
					}catch(err){
						console.log(err);
						callback(err);
					}
				};
				newDir=newDir+"/";
			}
		}
		var cb="This is callback";
		callback();
	},
	"test":function(){

	},
	"dir":"www"
}

//Test Cases
/*
Superfs.mkdir(__dirname+"/1/2/3",function(err){
	console.log(err);
});
*/


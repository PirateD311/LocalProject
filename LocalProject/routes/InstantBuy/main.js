var request=require('request');
var iconv=require('iconv-lite');

var testURL1="https://item.taobao.com/item.htm?spm=a21bo.7724922.1997525049.2.303uNu&id=524233730975";
var testURL2="https://buy.taobao.com/auction/buy_now.jhtml?spm=2013.1.20140002.d1.X0BSVZ";
var testURL3="https://fbuy.tmall.com/cart/addCartItems.do?_tb_token_=Y5D508hAMSTuc59&add=%7B%22deliveryCityCode%22%3A320100%2C%22campaignId%22%3A0%2C%22from_etao%22%3A%22%22%2C%22umpkey%22%3A%22%22%2C%22items%22%3A%5B%7B%22itemId%22%3A%2242570895381%22%2C%22skuId%22%3A72087482171%2C%22iChannel%22%3A%22%22%2C%22quantity%22%3A1%2C%22serviceInfo%22%3A%2241282187935%7C0%22%2C%22extraAttribute%22%3A%7B%7D%7D%5D%7D&tsid=dfdd77b91c4aebe318657193e7b122af&itemId=42570895381&sellerId=2202462676&categoryId=50008556&root_refer=&item_url_refer=&_ksTS=1453009061050_2203&callback=jsonp2204";

// var header={
// 	:host:fbuy.tmall.com
// 	:method:GET
// 	:path:/cart/addCartItems.do?_tb_token_=Y5D508hAMSTuc59&add=%7B%22deliveryCityCode%22%3A320100%2C%22campaignId%22%3A0%2C%22from_etao%22%3A%22%22%2C%22umpkey%22%3A%22%22%2C%22items%22%3A%5B%7B%22itemId%22%3A%2242570895381%22%2C%22skuId%22%3A72087482171%2C%22iChannel%22%3A%22%22%2C%22quantity%22%3A1%2C%22serviceInfo%22%3A%2241282187935%7C0%22%2C%22extraAttribute%22%3A%7B%7D%7D%5D%7D&tsid=dfdd77b91c4aebe318657193e7b122af&itemId=42570895381&sellerId=2202462676&categoryId=50008556&root_refer=&item_url_refer=&_ksTS=1453009061050_2203&callback=jsonp2204
// 	:scheme:https
// 	:version:HTTP/1.1
// 	//accept:*/*
// 	accept-encoding:gzip, deflate, sdch
// 	accept-language:zh-CN,zh;q=0.8,en;q=0.6
// 	cookie:cna=RvruDsoHBgQCAXnlbcptxfuC; skt=fb4dbe0a6048e267; _tb_token_=Y5D508hAMSTuc59; uc3=nk2=EEs1qt6Nv%2FZWWCc%3D&id2=WvKSntnRRfrE&vt3=F8dAScRvbqA8vtkuUbw%3D&lg2=VFC%2FuZ9ayeYq2g%3D%3D; lgc=summerel008; tracknick=summerel008; _l_g_=Ug%3D%3D; hng=US%7Czh-cn%7CUSD; cookie2=1c4870d7e6be6bbb33f560496fdd7002; cookie1=BxAWI5RJhqlKBkWEQIGYqKUiQKoesN8m4lVliFm5yPc%3D; uc1=cookie15=W5iHLLyFOGW7aA%3D%3D&existShop=false; unb=925412281; t=dfdd77b91c4aebe318657193e7b122af; _nk_=summerel008; cookie17=WvKSntnRRfrE; login=true; ucn=center; isg=E23BCA13FB1A0B261F52979EEBDA108F; l=Ari4xpd1bB9kAoruk0hi-H5YCGxINR6w
// 	referer:http://world.tmall.com/item/42570895381.htm?spm=a230r.1.14.3.9SMURA&id=42570895381&cm_id=140105335569ed55e27b&_u=hrihatp731d&abbucket=20&skuId=72087482171
// 	user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
// }

var testCookie="cna=RvruDsoHBgQCAXnlbcptxfuC; skt=fb4dbe0a6048e267; _tb_token_=Y5D508hAMSTuc59; uc3=nk2=EEs1qt6Nv%2FZWWCc%3D&id2=WvKSntnRRfrE&vt3=F8dAScRvbqA8vtkuUbw%3D&lg2=VFC%2FuZ9ayeYq2g%3D%3D; lgc=summerel008; tracknick=summerel008; _l_g_=Ug%3D%3D; hng=US%7Czh-cn%7CUSD; cookie2=1c4870d7e6be6bbb33f560496fdd7002; cookie1=BxAWI5RJhqlKBkWEQIGYqKUiQKoesN8m4lVliFm5yPc%3D; uc1=cookie15=W5iHLLyFOGW7aA%3D%3D&existShop=false; unb=925412281; t=dfdd77b91c4aebe318657193e7b122af; _nk_=summerel008; cookie17=WvKSntnRRfrE; login=true; ucn=center; isg=E23BCA13FB1A0B261F52979EEBDA108F; l=Ari4xpd1bB9kAoruk0hi-H5YCGxINR6w";
var j = request.jar()
var cookie = request.cookie(testCookie);
j.setCookie(cookie, testURL3, function (err, cookie){
	console.log(cookie);
})
request({url:testURL3,jar:j},function(error,response,body){
	if (!error && response.statusCode == 200){
		console.log(iconv.decode(body,'GBK').toString());
	}
});
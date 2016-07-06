/**
 * Created by PirateD on 2015/7/25.
 */
/*
 * 主要功能：1.操作cookie(初始化时取得页面cookie#c.cookie)
 * 操作函数：1.getCookie(c_name)取得cookie中c_name的值，返回-1
 *           2.getUserInfo(c_key,c_value)已任意字段取得用户信息,返回用户信息的json
 *           3.getPublished(usernickname)取得用户发布的所有帖子
 *           4.检查是否登陆，登陆返回用户信息，未登录返回false
 *
 * */
(function($){
var c={};
    BASEURL="../../";
    $.fn.extend({
        opCookie:function(options){
            var opts= $.extend(c,options);
            init();
            var obj={getCookie:function getCookie(c_name){return getCookie_o(c_name);},
                    getUserInfo:function getUserInfo(c_key,c_value){return getUserInfo_o(c_key,c_value)},
                    getPublished:function getPublished(usernickname){return getPublished_o(usernickname)},
                    checkLog:function checkLog(){return checkLog_o()}
            };
            return obj;
        }
    });
    function init(){
        c.cookie=document.cookie;
        c.c_length=c.cookie.length;
    }

    function checkLog_o(){
        var user={};
        user.nickname=getCookie_o("nickname");
        if(user.nickname!=-1&&user.nickname!=0){
            user.info=getUserInfo_o("nickname",user.nickname);
            $("#login").hide();
            $("#logout").show();
            return user.info;
        }else{
            return false;
        }
    }
    function getUserInfo_o(c_key,c_value){
        var data={};
        var profile={};
        data[c_key]=c_value;
        $.ajax({
            url:BASEURL+"collegeAPI/user/queryUserBase.php",
            type:"POST",
            data:data,
            async:false,
            success:function(resp){
                resp = eval("("+resp+")");
                if(resp!=null&resp.length!=0){
                    //[{"id":"1","nickname":"zp","realname":"zp","qq":"","phone":"","address":"","user_status":"0","registertime":"2015-07-10 16:26:54","sex":"","school":"","major":"b","skills":"b","punish_status":"0"}]
                    console.log(resp+","+resp[0].id+","+resp[0].major);
                    profile=resp[0];
                }else{
                    profile=-1;
                }
            },
            error:function(){
                profile=-1;
            }
        });
        return profile;
    }
    function getCookie_o(c_name){
        var ret="";
        if(c.c_length>0){
            var start= c.cookie.indexOf(c_name);
            if(start!=-1){
                start=start+c_name.length+1;
                var end= c.cookie.indexOf(";",start);
                if(end!=-1){
                    ret=c.cookie.substring(start,end);
                    console.log(c_name+"="+ret);
                    return ret;
                }else{
                    ret=c.cookie.substring(start,end);
                    console.log(c_name+"="+ret);
                    return ret;
                }
            }else{
                ret=0;
                console.log(c_name+"is not in cookie!");
                return ret;
            }
        }else{
            ret=-1;
            console.log("cookie is not set!");
            return ret;
        }
    }
    function getPublished_o(usernickname){
        var published={};
        if(usernickname==""||usernickname==null){
            usernickname=getCookie_o("nickname");
        }
        $.ajax({
            url:BASEURL+"collegeAPI/job/queryJobBase.php",
            type:"post",
            data:{"author_nickname":usernickname},
            async:false,
            success:function(resp){
                published = eval("("+resp+")");
                console.log(published.length);
            }
        });
        return published;
    }

})(jQuery);
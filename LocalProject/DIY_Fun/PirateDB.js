/**
 * Created by PirateD on 2015/11/30 0030.
 */
/*���Post����������ĺ���.Input:req�������pamers�ش���������
 *eg:G_fn_checkInput(req,["nickname","password","phone","email"]);
 * ���������м�Ϊpost�����data�ش��Ĳ�����
* */
global.G_fn_parseReqToArray=function(req){
    var easySql={
        "filed":"",
        "pamer":[],
        "wenhao":""
    };

    for(var key in req.body)
    {
        easySql.filed=easySql.filed+","+key;
        easySql.pamer.push(req.body[key]);
        easySql.wenhao=easySql.wenhao+",?";
    }
    easySql.filed=easySql.filed.substring(1,easySql.filed.length);
    easySql.wenhao = easySql.wenhao.substring(1,easySql.wenhao.length);
    console.log(easySql);
    return easySql;
}
global.G_fn_checkInput=function (req,pamers){
    console.log("checkInput::");
    if(pamers instanceof Array){
        for(var i in pamers){
            console.log("check pamer i = [%d],input is[%s]",i,req.body[pamers[i]]);
            if(!req.body[pamers[i]]){
                console.log("[%s]not exist",pamers[i]);
                console.log("Input invalid");
                console.log("checkInput::End");
                return false;
            }
        }
        console.log("Input valid");
        console.log("checkInput::End");
        return true;
    }else{
        console.log("Not a Array");
        console.log("checkInput::End");
        return true;
    }
};

/*�������ݿ���ɾ�Ĳ����*/
//����ֵ
var SUCCESS={code:1,info:"",data:[]},
    ERROR={code:2,info:"",data:[]},
    NORECORD={code:3,info:""},
    RECORD_EXIST={code:4,info:""};
    //NORECORD={code:3,info:""};
var conn = require('../database/connectDatabase').connectDatabase();
global.G_fn_DB_select=function(sql,pamers,callback){
    //console.log("G_fn_DB_select::sql is [%s],pamers is [%s].",sql,pamers.join(","));
    console.log("G_fn_DB_select");
    conn.query(sql,pamers,function(err,res){
        console.log("Select########")
        if(err){
            ERROR.data=err;
            callback(ERROR);
            return false;
        }
        console.log(res);
        if(res.length==0)
            callback(NORECORD);
        else{
            SUCCESS.data=res;
            callback(SUCCESS)
        }
    });
};
global.G_fn_DB_delete=function(sql,pamers,callback){
    console.log("G_fn_DB_delete::sql is [%s],pamers is [%s].",sql,pamers.join(","));
    conn.query(sql,pamers,function(err,res){
        if(err){
            ERROR.data=err;
            callback(ERROR);
            return false;
        }
        if(res.length==0)
            callback(NORECORD);
        else{
            SUCCESS.data=res;
            callback(SUCCESS);
        }
    });
};
global.G_fn_DB_update=function(sql,pamers,callback){
    console.log("G_fn_DB_update::sql is [%s],pamers is [%s].",sql,pamers.join(","));
    conn.query(sql,pamers,function(err,res){
        if(err){
            ERROR.data=err;
            callback(ERROR);
            return false;
        }else{
            SUCCESS.data=res;
            callback(SUCCESS);
        }
    });
};
global.G_fn_DB_insert=function(sql,pamers,callback){
    console.log("G_fn_DB_insert::sql is [%s],pamers is [%s].",sql,pamers.join(","));
    conn.query(sql,pamers,function(err,res){
        if(err){
            ERROR.data=err;
            callback(ERROR);
            return false;
        }else{
            SUCCESS.data=res;
            callback(SUCCESS);
        }
    });
};

/*��װ�棬���ӡ�ɾ�����޸ļ�¼ǰ��ѯ�Ƿ��м�¼�����Ӽ�¼�󷵻�key*/
sql_obj={"table":"","values":[],"key":"","key_value":"","sql":""}
global.G_fn_DBp_update=function(sql_obj,callback){

    var select_sql="select * from "+sql_obj.table+" where "+sql_obj.key+"= ?" ;
    G_fn_DB_select(select_sql,sql_obj.key_value,function(ret1){
        console.log(ret1);
        if(ret1.code==3)
            callback(ret1);
        if(ret1.code==2)
            callback(ret1);
        if(ret1.code==1){
            var updata_sql=sql_obj.sql;
            G_fn_DB_update(updata_sql,sql_obj.values,function(ret2){
                callback(ret2);
            });
        }
    });
}

global.G_fn_DBp_insert=function(sql_obj,callback) {
    var select_sql="select * from "+sql_obj.table+" where "+sql_obj.key+"= ?" ;
    G_fn_DB_select(select_sql,sql_obj.key_value,function(ret1){
        if(ret1.code==3)
            //��¼δ����
            G_fn_DB_insert(sql_obj.sql,sql_obj.values,function(ret2){
                callback(ret2);
            });
        if(ret1.code==2)
            callback(ret1);
        if(ret1.code==1){
            //��¼�Ѵ���
            callback(RECORD_EXIST);
        }
    });
}

global.G_fn_DBp_delete=function(sql_obj,callback){
    var select_sql="select * from "+sql_obj.table+" where "+sql_obj.key+"= ?" ;
    G_fn_DB_select(select_sql,sql_obj.key_value,function(ret1){
        if(ret1.code==3)
            callback(ret1);
        if(ret1.code==2)
            callback(ret1);
        if(ret1.code==1){
            G_fn_DB_delete(sql_obj.sql,sql_obj.values,function(ret2){
                callback(ret2);
            });
        }
    });
}
/**
 * Created by Administrator on 2015/11/14.
 */
var MYSQL_INFO = {
    "MYSQL_HOST":"localhost",
    "MYSQL_USER":"",
    "MYSQL_PASSWORD":"",
    "MYSQL_PORT":3308,
    "MYSQL_DATABASE":"nodejs"
};
var MYSQL_CONNECT_INFO={ host:"localhost",user:"root",password:"",database:"AdvertLM",port:"3306" }
var ms = require("mysql");
exports.connectDatabase=function(){
    console.log("connect to mysql..");
    var conn=ms.createConnection(MYSQL_CONNECT_INFO);
    conn.connect();
    console.log("Mysql Connected!Connect info is :[%s]",JSON.stringify(MYSQL_CONNECT_INFO));
    return conn;
}
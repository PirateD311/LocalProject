/**
 * Created by liuxun on 15/12/9.
 */
global.G_fn_Ip_getClientIp=function(req){
    return req.headers['x-real-ip']||
           req.headers['x-forwarded-for'] ||
           req.connection.remoteAddress ||
           req.socket.remoteAddress ||
           req.connection.socket.remoteAddress;
}
console.log("G_fn_Ip_getClientIp required OK!");
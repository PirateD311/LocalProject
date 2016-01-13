/**
 * Created by liuxun on 15/12/9.
 */
function ip_vistor_visit(ClientIp){
    if(IP_VISTOR[ClientIp]){
        console.log("[%s] is not a new vistor.",ClientIp);
    }else{
        console.log("[%s] is a new vistor.",ClientIp);
    }

}
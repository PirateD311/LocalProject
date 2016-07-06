/**
 * Created by liuxun on 16/4/4.
 */
/*
 *   React 模板
 *
 * */
var StatTableNormal=React.createClass({
    getInitialState:function(){
    return {ShowJson:[],ShowHtml:"",PostURL:"/queryAdvertStat"};
},
componentDidMount:function(){
    console.log("componentDid...");
    this.freshStatTable();
},
freshStatTable:function(){
    var postdata="";
    if(this.props.postdata&&this.props.postdata!="")
        postdata=eval('(' + this.props.postdata + ')');
    console.log(this.props.postdata);
    $.post(this.props.posturl,postdata,function(res){
        console.log(JSON.stringify(res));
        this.setState({ShowJson:res.data});
    }.bind(this));
    console.log("fresh...");

},
createTableHtml:function(){
    var StatMap={0:"未审核",1:"已审核",2:"已暂停",3:"已锁定",4:"已拒绝"};


    var html=new Array();
    var tableColsName=new Array();
    var tableColItemName=this.props.TableItemName.split(',');
    console.log(this.props.TableItemName);
    this.props.TableCol.split(',').map(function(item){
        tableColsName.push(<td height="30" align="center">{item}</td>);
    });
    html.push(<tr >{tableColsName}</tr>);
    if(this.state.ShowJson&&this.state.ShowJson.length>0)
    {
        for(var i=0;i<this.state.ShowJson.length;i++){
            var data=this.state.ShowJson[i];
            if(data["web_register_state"]||data["web_register_state"]==0)
                data["web_register_state"]=StatMap[data["web_register_state"]];
            var tableColItem=new Array();
            for(key in tableColItemName){
                if((tableColItemName[key]=="date"||tableColItemName[key]=="web_sign_date")&&data[tableColItemName[key]])
                    tableColItem.push(<td>{data[tableColItemName[key]].substring(0,10)}</td>);
            else
                tableColItem.push(<td>{data[tableColItemName[key]]}</td>);
            }
            html.push(<tr>{tableColItem}</tr>);
        };
    }
    return html;
},
render:function(){

    var TableHtml=this.createTableHtml();

    return (<div>
        <button  id="handleFreshTableBtn" onClick={this.freshStatTable}>刷新</button>
<form className="form-group">
    <label > 按日期查询:</label>
<input type="date" />
    <input type="button" value="查询" />
    </form>
    <div className="stat-table">
    <h4>{this.props.TableTitle}</h4>
<table className="table table-striped table-hover table-bordered"><tbody>{TableHtml}</tbody></table>
</div>
</div>)
}
});

var StatTableWithOption=React.createClass({
    getInitialState:function(){
    return {ShowJson:[],ShowHtml:"",PostURL:"/queryAdvertStat"};
},
componentDidMount:function(){
    console.log("componentDid...");
    this.freshStatTable();
},
freshStatTable:function(){
    var postdata="";
    if(this.props.postdata&&this.props.postdata!="")
        postdata=eval('(' + this.props.postdata + ')');
    console.log(postdata);
    $.post(this.props.posturl,postdata,function(res){
        console.log(JSON.stringify(res));
        this.setState({ShowJson:res.data});
    }.bind(this));
    console.log("fresh...");

},
createTableHtml:function(){
    var StatMap={0:"未审核",1:"已审核",2:"已暂停",3:"已锁定",4:"已拒绝"};

    var html=new Array();
    var tableColsName=new Array();
    var tableColItemName=this.props.TableItemName.split(',');
    console.log(this.props.TableItemName);
    this.props.TableCol.split(',').map(function(item){
        tableColsName.push(<td height="30" align="center">{item}</td>);
    });
    html.push(<tr class="table-col-name">{tableColsName}</tr>);
    if(this.state.ShowJson&&this.state.ShowJson.length>0)
    {
        for(var i=0;i<this.state.ShowJson.length;i++){
            var data=this.state.ShowJson[i];
            if(data["web_register_state"]||data["web_register_state"]==0)
                data["web_register_state"]=StatMap[data["web_register_state"]];
            var tableColItem=new Array();
            for(key in tableColItemName){
                if((tableColItemName[key]=="date"||tableColItemName[key]=="web_sign_date")&&data[tableColItemName[key]])
                    tableColItem.push(<td>{data[tableColItemName[key]].substring(0,10)}</td>);
            else
                tableColItem.push(<td>{data[tableColItemName[key]]}</td>);
            }
            tableColItem.push(<td ><OptionWzzBtn data={data} btnName="审批"></OptionWzzBtn>
                <OptionWzzBtn data={data} btnName="暂停"></OptionWzzBtn>
                <OptionWzzBtn data={data} btnName="锁定"></OptionWzzBtn>
                <OptionWzzBtn data={data} btnName="拒绝"></OptionWzzBtn>
                <OptionWzzBtn data={data} btnName="网站说明"></OptionWzzBtn></td>);
            html.push(<tr>{tableColItem}</tr>);
        };
    }
    return html;
},
render:function(){

    var TableHtml=this.createTableHtml();

    return (<div>
        <button  id="handleFreshTableBtn" onClick={this.freshStatTable}>刷新</button>
<form className="form-group">
    <label > 按日期查询:</label>
<input type="date" />
    <input type="button" value="查询" />
    </form>
    <div className="stat-table">
    <h4>{this.props.TableTitle}</h4>
<table className="table table-striped table-hover table-bordered"><tbody>{TableHtml}</tbody></table>
</div>
</div>)
}
});

var OptionWzzBtn=React.createClass({
    render:function(){
    //console.log("btn 数据：",JSON.stringify(this.props.data))
    return (
        <input className="btn-xs" onClick={this.handleOptionClick} type="button" value={this.props.btnName} />
)
},
componentDidMount:function(){

},
handleSubmit:function(){
    console.log("ddd");
    console.log("doYes")
    var postData={
        "web_owner_name":this.props.data.web_owner_name,
    };
    switch (this.props.btnName){
        case "审批":
            postData.web_register_state=1;
            postData.web_state=1;
            break;
        case "暂停":
            postData.web_register_state=2;
        case "锁定":
            postData.web_register_state=3;
            break;
        case "拒绝":
            postData.web_register_state=4;
            break;
        case "网站说明":
            postData.web_register_state=2;
            break;
        default :break;
    }
    console.log(JSON.stringify(postData));
    $.post("/gly/editWzz",postData,function(res){
        if(res.code==1)
            alert("操作成功！");
        else
            alert("操作失败！");
    });
    $("#NiceDialog").hide();
    $("#handleFreshTableBtn").click();
},
handleOptionClick:function(){

    var dialogInfo="确定要对 "+this.props.data.web_owner_name+" 进行操作？";

    React.render(
    <NiceDialog handle={this.handleSubmit} dialogInfo={dialogInfo} />,
    document.getElementById('NiceDialogContainer')
);
$("#NiceDialog").show();
}

});

var NiceDialog=React.createClass({
    render:function(){
    return (
        <div id="NiceDialog" className="nice-dialog">
        <div onClick={this.handleClose} className="dialog-close">X</div>
    <div className="dialog-infowarp">
    <h4>{this.props.dialogInfo}</h4>
    </div>
    <div className="dialog-btn">
        <button onClick={this.props.handle}>确定</button>
    <button onClick={this.handleClose}>取消</button>
    </div>
    </div>
    )
},
handleClose:function(){
    $("#NiceDialog").hide();
}

});




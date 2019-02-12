/**
 * Created by Echonessy on 2018/12/27.
 */
$(function () {
    //获取合同信息
    contractInfo();
    function contractInfo() {
        var Url = '/contractInfo';
        var SubData = {};
        SubData.id = getUrl.id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
                renderBaseInfo(res.data);
            })
        })
    }
    //渲染基础数据
    function renderBaseInfo(data) {
        $("#contractStatus").html(isExistData(data.contractStatus))
        $("#contractName").html(isExistData(data.contractName))
        $("#contractNo").html(isExistData(data.contractNo))
        $("#startTime").html(isExistData(data.startTime))
        $("#signTime").html(isExistData(data.signTime))
        $("#initiatorName").html(isExistData(data.initiatorName))
        $("#initiatorPhone").html(isExistData(data.initiatorPhone))
        $("#contractUrl").attr('href',isExistData(data.contractUrl))
        $("#J_contractStartBlockUrl").attr('href',isExistData(data.contractStartBlockUrl)).html(isExistData(data.contractStartBlockUrl));
        $("#J_contractEndBlockUrl").attr('href',isExistData(data.contractEndBlockUrl)).html(isExistData(data.contractEndBlockUrl));
        proofList(data.proofList);
        roleList(data.roleList)
    }
    //鉴别数据是否存在
    function isExistData(data) {
        return data ? data:' ';
    }
    // 合同状态列表
    function proofList(data) {
		var this_Data=data[0];//区第一条数据
        var Html = '';
        Html += '<li class="single top">';
        Html += '<span style="text-align:left;padding-left:40px">文件Hash</span>';
        Html += '</li>';
		Html += '<li class="single" data-this_Data="'+JSON.stringify(this_Data)+'">';
		Html += '<span style="text-align:left;padding-left:50px" title="'+this_Data.fileHash+'">'+isExistData(this_Data.fileHash)+'</span>';
		Html += '</li>';
            
        
        $("#proofList").html(Html);
    }
    //签约主体信息
    function roleList(data) {
        var Html = '';
        Html += '<li class="single top">';
        Html += '<span>签署主体</span>';
        Html += '<span>签署方账号</span>';
        Html += '<span style="border-right:none">签署方公钥</span>';
        Html += '</li>';
        if(data.length > 0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li class="single" data-this_Data="'+JSON.stringify(this_Data)+'">';
                Html += '<span title="'+this_Data.name+'">'+this_Data.name+'</span>';
                Html += '<span title="'+this_Data.phone+'">'+this_Data.phone+'</span>';
                Html += '<span style="border-right:none" title="'+this_Data.publicKeys+'">'+this_Data.publicKeys+'</span>';
                Html += '</li>';
            }
        }
        $("#roleList").html(Html);
    }
})
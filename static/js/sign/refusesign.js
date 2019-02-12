/**
 * Created by Echonessy on 2018/12/28.
 */
$(function () {
//    加载缓存信息
    gotSigniInfo();
    function gotSigniInfo() {
        $("#gotSigniInfo").on('click',function () {
            var id = getUrl.id;
            window.location.href = '/signinfo?id='+id
        })
    }
    contractSimpleInfo()
    function contractSimpleInfo() {
        var Url = '/contractSimpleInfo';
        var SubData = {};
        SubData.id = getUrl.id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var passiInfo = res.data;
                $("#contractName").html(isExistData(passiInfo.contractName))
                $("#endTime").html(isExistData(passiInfo.endTime))
                renderList(res.data.roleList);
            })
        })
    }
    // 渲染列表
    function renderList(data) {
        var Html = '';
        Html += '<li class="single top">';
        Html += '<span>签署人</span>';
        Html += '<span>签署人账号</span>';
        Html += '<span>签署时间</span>';
        Html += '</li>';
        if(data.length>0) {
            for(var i = 0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li class="single" data-this_Data="'+JSON.stringify(this_Data)+'">';
                Html += '<span title="'+this_Data.name+'">'+isExistData(this_Data.name)+'</span>';
                Html += '<span title="'+this_Data.phone+'">'+isExistData(this_Data.phone)+'</span>';
                Html += '<span title="'+this_Data.signTime+'">'+isExistData(this_Data.signTime)+'</span>';
                Html += '</li>';
            }
        }
        $("#result_List").html(Html);
    }
})
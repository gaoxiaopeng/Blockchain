/**
 * Created by Echonessy on 2018/12/27.
 */
$(function () {
    //加载数据
    renderData()
    function renderData() {
        var stepInfo = JSON.parse(localStorage.getItem('stepInfo'));
        signUser(stepInfo.signatory)
        $("#contactTime").html(stepInfo.contactTime)
        $("#contactName").html(stepInfo.contactName)
    }
    //渲染签署方基础信息
    function signUser(data) {
        var Html = '';
        Html += '<li class="single top">';
        Html += '<span>签署人</span>';
        Html += '<span>签署人账号</span>';
        Html += '<span>签署时间</span>';
        Html += '</li>';
        Html += '<li class="single">';
        Html += '<span>我</span>';
        Html += '<span>'+window.localStorage.getItem('c_pid')+'</span>';
        Html += '<span>'+getNowTime()+'</span>';
        Html += '</li>';
        if(data.length>0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += '<li class="single" data-this_Data="'+this_Data+'">';
                Html += '<span>'+isExistData(this_Data.name)+'</span>';
                Html += '<span>'+isExistData(this_Data.phone)+'</span>';
                Html += '<span>--</span>';
                Html += '</li>';
            }
        }
        $("#result_List").html(Html);
    }
    //获取当前日期
    function getNowTime() {
        var myDate = new Date();
        var getFullYear = myDate.getFullYear(); //获取当前年份(2位)
        var getMonth =  myDate.getMonth()+1;
        var getDate =  myDate.getDate();;
        return getFullYear+'-'+getMonth + '-'+getDate;
    }
    gotSigniInfo()
    function gotSigniInfo() {
        $("#gotSigniInfo").on('click',function () {
            var id = getUrl.id;
            window.location.href = '/signinfo?id='+id
        })
    }
})
/**
 * Created by Echonessy on 2018/12/25.
 */
//初始化LayUI组件
$(function () {
    initLayUi()
    function initLayUi() {
        layui.use(['form', 'laydate'], function(){
            var laydate = layui.laydate;
            var form = layui.form;
            //常规用法
            laydate.render({
                elem: '#contactTime',
                theme: '#2F53B1'
            });
			 //常规用法
			laydate.render({
			    elem: '#contactEffectiveTime',
			    theme: '#2F53B1'
			});
            //监听指定开关
            form.on('switch(contactSecret)', function(data){
                $("#contactSecret").attr('data-checked',(this.checked ? 'true' : 'false'))
                // layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'));
                layer.msg('暂未开放');
            });
        });
    }
//打开弹窗相关事件
    fadeEvt()
    function fadeEvt() {
        //    打开弹窗
        $('.step_Add').on('click',function () {
            $('#add_Link').stop(true).fadeIn(150);
        })
        //    关闭弹窗
        $('.fade_Close').on('click',function () {
            $(this).parents('.fade_Box').stop(true).fadeOut(150);
        })

    }
//上传
    function uploadLocalFile(formDom,fileDom,callback) {
        var Url = "/upload3";
        uploadEvt(Url,formDom,fileDom,function (data) {
            callback(data);
        })
    }
//自动上传
    selfUpload()
    function selfUpload() {
        $("#fileCont").on('change',function () {
            var formDom = '#fileContForm';
            var fileDom = '#fileCont';
            uploadLocalFile(formDom,fileDom,function (data) {
				var src=data.data.urls[1];
				var pdf=data.data.urls[0];
                $("#fileContImg").attr({
                    'src':src,
                    'data-pdf':pdf,
                })
				var imglist=data.data.urls;
				imglist.splice(0,1);//删除 pdf url
				sessionStorage.pdfToImgList=imglist.toString();
            });
        })
    }
	
//    查询事件
    searchEvt();
    function searchEvt() {
        // 查询
        $('#search').on('input',function () {
            listSearch();
        });
    }
    listSearch();
    // 查询联系人
    function listSearch() {
        var Url = '/listSearch';
        var SubData = {}
        SubData.search = $("#search").val();
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var resData = res.data;
                renderLink(resData);
            })
        })
    }
    // 渲染联系人列表
    function renderLink(data) {
        var Html = '';
        Html +='<li class="top">';
        Html +='<span>姓名、企业名</span>';
        Html +='<span>账号（手机号）</span>';
        Html +='</li>';
        if(data) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += "<li data-this_Data='"+JSON.stringify(this_Data)+"'>";
                Html += '<span title="'+this_Data.name+'">'+this_Data.name+'</span>';
                Html += '<span title="'+this_Data.phone+'">'+this_Data.phone+'</span>';
                Html += '</li>';
            }
        }
        $("#serch_List").html(Html);
        addChoiceLink();
        cerChoiceBtn()
    }
    //左右选择联系人
    function addChoiceLink() {
        leftToRight()
    }
    //从左迁移至右侧
    function leftToRight() {
        $("#serch_List li").off('click');
        $("#serch_List li").on('click',function () {
            var objNew = JSON.parse($(this).attr('data-this_Data'));
            var that = this;
            var name = objNew.name;
            var Html = '';
            Html += "<li data-this_Data='"+JSON.stringify(objNew)+"'>";
            Html += '<span>'+name+'</span>';
            Html += '<i class="layui-icon layui-icon-close"></i>';
            Html += '</li>';
            $("#step_User_Done").append(Html);
            $(this).remove()
            removeNowUser();
        })
    }
    //    移除已添加列表
    function removeNowUser() {
        $('#step_User_Done i').off('click');
        $('#step_User_Done i').on('click',function () {
            var this_Pre = $(this).parents('li');
            var objNew =JSON.parse(this_Pre.attr('data-this_Data')) ;
            var name = objNew.name;
            var phone = objNew.phone;
            console.log(objNew)
            var sHtml = $("#serch_List").html();
            sHtml += "<li data-this_Data='"+JSON.stringify(objNew)+"'>";
            sHtml += '<span title="'+name+'" >'+name+'</span>';
            sHtml += '<span title="'+phone+'">'+phone+'</span>';
            sHtml += '</li>';
            $('#serch_List').html(sHtml);
            $(this).parents('li').remove();
            leftToRight()
        });
    }


    //确认联系人
    function cerChoiceBtn() {
        $("#step_User_CerBtn").off('click');
        $("#step_User_CerBtn").on('click',function () {
            var Arr = [];
            $.each($('#step_User_Done li'),function (i,obj) {
                if(i>0) {
                    var objNew = {};
                    var thisLi = JSON.parse($(obj).attr('data-this_Data'));
                    Arr.push(thisLi);
                }
            })
            console.log(Arr)
            $("#add_Link").fadeOut(150);
            renderResultLink(Arr);
        });
    }
    //确认签署方渲染
    function renderResultLink(data) {
        var Html = '';
        if(data.length>0) {
            for(var i=0;i<data.length;i++) {
                var this_Data = data[i];
                Html += "<li data-this_Data='"+JSON.stringify(this_Data)+"'>";
                Html += '<div class="list_Bor">';
                Html += '<span>'+(i+1)+'</span>';
                Html += '<input class="this_name" type="text" value="'+this_Data.name+'" placeholder="姓名、机构号">';
                Html += '<input class="this_phone"  type="text" value="'+this_Data.phone+'" placeholder="账号(手机号)">';
                Html += '<input class="this_publicKeys"  type="hidden" value="'+this_Data.publicKeys+'" placeholder="">';
                Html += '<input class="this_id"  type="hidden" value="'+this_Data.id+'" placeholder="">';
                Html += '</div>';
                Html += '<button class="deleteUser">撤&nbsp;&nbsp;销</button>';
                Html += '</li>';
            }
            $("#sign_User").html(Html);
            deleteUser()
        }
    }

    function deleteUser() {
        $(".deleteUser").off('click');
        $(".deleteUser").on('click',function () {
            $(this).parents('li').remove();
        })
    }
/**
 *@description 读取标签列表
 * @param {int} value 需要选中的选项值
 *@author gaoxiaopeng
 *@time 2019-1-16 
 */
function getLableList(value){
	var Url = '/labeList';
	var SubData = {}
	echo.ajax.post(Url,SubData,function (res) {
	    echo.ajax.callback(res,function () {
	        var resData = res.data.labels||[];
			var html='<option value="0">--请选择标签--</option>';
			for(var i=0;i<resData.length;i++){
				var m=resData[i];
				var selected=""
				if(value){
					selected="selected";
				}
				html+='<option value="'+m.id+'" '+selected+'>'+m.labelName+'</option>';
			}
	        $("#J_lableList").html(html);
			
	    })
	})
}
getLableList();//默认读取标签列表


/**
 *@description 添加标签 
 *@author gaoxiaopeng
 *@time 2019-1-16 
 */
function clickAddLable(){
	var Url = '/addLabel';
	var labelName=$("#J_LableName").val();
	var SubData = {labelName:labelName}
	echo.ajax.post(Url,SubData,function (res) {
		var selectedId=res.data&&res.data.id;
		 getLableList(selectedId);//重新读取标签列表,并选中
	})
}

//添加标签 绑定点击事件
$("#J_addLable").on("click",function(){
      //示范一个公告层
      layer.open({
        type: 1
		,title:"请输入标签名称"
        ,area: '300px;'
        ,shade: 0.6
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['添加', '取消']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 30px 50px; line-height: 22px; font-weight: 300;"><input style="border:1px solid #999;height:30px;width:200px" type="text" id="J_LableName"></div>'
        ,yes: function(){
           clickAddLable()//执行添加标签操作
		   layer.closeAll();//关闭弹窗
        }
        ,btn2: function(){
          layer.closeAll();
        }
      });

})




//    下一步
    toSignnext()
    function toSignnext() {
        $("#toSignnext").off('click');
        $("#toSignnext").on('click',function () {
            var fileContImg = $("#fileContImg");
            var contactUrl = fileContImg.attr("src");//合同生成的图片 url 地址
			var contractSourceUrl= fileContImg.data('pdf'); //合同pdf url 地址
            var contactName = $('#contactName').val();
			var contactTime = $('#contactTime').val();//截止日期
			var contactEffectiveTime = $('#contactEffectiveTime').val();//失效日期
			var labelId = $('#J_lableList').val();//标签
            var contactRemark = $('#contactRemark').val();
            var contactSecret = $('#contactSecret').attr('data-checked');
            var sign_User = $("#sign_User li");
            if(!contractSourceUrl) {layer.msg('请先上传合同');return;}
            if(!contactName) {layer.msg('请填写合同名');return;}
            if(!contactTime) {layer.msg('请设置截止时间');return;}
			if(!contactEffectiveTime) {layer.msg('请设置合同有效期');return;}
			if(!labelId) {layer.msg('请选择标签');return;}
            if(sign_User.length ==0) {layer.msg('请选择签署方');return;}
            var toData = {};
            toData.contactName = contactName;
            toData.contactTime = contactTime;
			toData.validTime=contactEffectiveTime;
            toData.labelId = labelId;
			toData.contactRemark = contactRemark;
            toData.contactUrl = sessionStorage.pdfToImgList;//pdf  生成都图片列表
            toData.contactSecret = contactSecret;
			toData.contractSourceUrl=contractSourceUrl;//合同pdf url 地址   2019-1-30  新增参数
			
            var Arr = [];
            $.each(sign_User,function (i,obj) {
                console.log($(obj).attr('data-this_Data'))
                var objNew = JSON.parse($(obj).attr('data-this_Data'));
                Arr.push(objNew);
            })
            toData.signatory = Arr;
            console.log(toData);
            window.localStorage.setItem('stepInfo',JSON.stringify(toData));
            window.location.href = '/signnext'
        });
    }



})
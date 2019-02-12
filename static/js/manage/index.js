/**
 * Created by Echonessy on 2018/12/13.
 */
//
var manageStatu="all";//合同状态 -- 用户点击查询all, expire,waitmine,waitother,complete,refuse,draft  
var timeType="";//查询时间类型  -- 用户点击表头查询   startTime, endTime,validTime
$(function () {
    //Tab切换
	//注册日期弹出
	layui.use('laydate', function(){
    var laydate = layui.laydate;
		 //日期范围
		 laydate.render({
			elem: '#J_searchTime'
			,range: true,
			format: 'yyyy/MM/dd'
		 });
	 })
	
	
    manaTabEvt()
    function manaTabEvt() {
        $('#mana_Tab>li').on('click',function () {
			manageStatu=$(this).data("value")//获取用户点击的合同状态
            $(this).siblings().removeClass();
            $(this).addClass('this_Tab');
            $('#mana_TabCon>li').css('display','none');
            $('#mana_TabCon>li').eq($(this).index()).stop(true).fadeIn(150);
        });
        $(".fade_Close").on('click',function () {
            $(this).parents('.fade_Box').stop(true).fadeOut(150);
        })
        $("#alias").val(window.localStorage.getItem('c_pid'))
		var status=window.location.hash;//获取hash 值（代码合同状态）
		if(status){ //地址栏存在hash 状态  开启定位   
			$('#mana_Tab>li').eq(parseInt(status.replace("#",""))).click();//  模拟点击  定位到某状态选项卡
		}
		
		
    }
    messageUpdateRead();
    function messageUpdateRead() {
        var Url = '/messageUpdateRead';
        var SubData = {};
        SubData.id = ''
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                
            })
        })
    }
    
    //阻止冒泡
    function stopBubble(evt) {
        var evt = evt||window.event;
        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
        else {
            window.event.cancelBubble = true;
        }
    }
    //模拟跳转
    mockRedirect()
    function mockRedirect() {
        $('.to_Passivesign').on('click',function () {
            window.location.href  = '/passivesign'
        })
        $('.to_Signinfo').on('click',function () {
            window.location.href  = '/signinfo'
        })
        $('.to_Agreeinfo').on('click',function () {
            window.location.href  = '/agreeinfo'
        })
        $('.to_Refuseinfo').on('click',function () {
            window.location.href  = '/refuseinfo'
        })
        $('.to_Signnext').on('click',function () {
            window.location.href  = '/signnext'
        })
    }

    //全部文件  Ajax  请求
	getAllAjax();
    function getAllAjax(SubData) {
        var Url = '/contractAll';
        var SubData = SubData || {};
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                renderAllHtml(res.data)
            })
        })
    };
    //全部文件   渲染数据
    function renderAllHtml(data) {
		//头部 表头
	    var Html = '<ul class="single total_List">'
		Html += '<li class="top">';
		Html += '<span style="width:20%">合同名称</span>';
		Html += '<span style="width:15%">发起人</span>';
		Html += '<span data-value="startTime" class="byTime J_byTime">发起时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="endTime" class="byTime J_byTime">截止时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="validTime" class="byTime J_byTime">有效期<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%">状态</span>';
		Html += '<span style="width:10%;border-right:none" class="J_byLable">标签<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '</li>';
		//内容 行
		if(data.length > 0) {
		    for(var i=0;i<data.length;i++) {
		        var this_Data = data[i];
		        Html += '<li>';
		        if(this_Data.status == '待我签') {
		            Html += '<span style="width:20%" data-id="'+this_Data.id+'"><a href="/passivesign?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        } else {
		            Html += '<span style="width:20%" data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        }
		        Html += '<span style="width:15%">'+this_Data.initiator+'</span>';
		        Html += '<span style="width:15%">'+this_Data.startTime+'</span>';
		        Html += '<span style="width:15%">'+this_Data.endTime+'</span>';
				Html += '<span style="width:15%">'+this_Data.validTime+'</span>';//有效期
		        Html += '<span style="width:10%">'+this_Data.status+'</span>';
			    Html += '<span class="J_LableUpdate" data-name="'+this_Data.labelName+'" data-id="'+this_Data.id+'" style="width:10%;border-right:none" >'+this_Data.labelName+'| <i style="color:#2F53B1;cursor: pointer;">修改</i></span> ';//标签
		        Html += '</li>';
		    }
		}
		Html += '</ul>';
        $('#total_List').html(Html);//绑定 数据到页面
	
    }
	
	
	// 时间区间 弹出
	(function bindShowTimeSearchBox(){
		//绑定点击事件 弹出 事件选择框
		$("#mana_TabCon").on("click",".J_byTime",function(){
			var m=$(this).data("value");//获取用户选择的哪一个时间条件
			if(m){
				 timeType=m;//获取用户选择的哪一个时间条件
				$("#J_searchTime").val("");//情况时间输入框内容
				$("#J_rangeTimeBox").show()//弹出时间搜索框
			}
		})
	})();
	
	
	
	//时间搜索框 取消  ---直接关闭
	(function closeBox(){
		$("#J_cencal_btn").on("click",function(){
			$("#J_rangeTimeBox").hide()//关闭 时间搜索框
		})
	})();
	//时间搜索框 确认  ---执行查询
	(function searchBox(){
		$("#J_seach_btn").on("click",function(){
			$("#J_rangeTimeBox").hide()//关闭 时间搜索框
			//执行查询操作
			getListByTime();
		})
	})()
	/**
	 * @description 全部文件  -  根据时间 查询列表
	 * @param {String} timeType 时间类型  =[开始时间|截止时间|失效时间]
	 */
    function getListByTime(){
		   //执行查询
		  var timeValue=$("#J_searchTime").val();//获取 用户选中的时间区间值
		  if(timeType=="startTime"){ //开始时间
		    var param={startTime:timeValue};//请求参数
			//all, expire,waitmine,waitother,complete,refuse,draft  	
			getListByManageStatu(param);
		  }else if(timeType=="endTime"){ //结束时间
		    var param={endTime:timeValue};//请求参数
			getListByManageStatu(param);
		  }else if(timeType=="validTime"){ //有效期
		    var param={validTime:timeValue};//请求参数
			getListByManageStatu(param);
		  } else if(timeType=="completeTime"){ //完成时间
		    var param={completeTime:timeValue};//请求参数
			getDoneAjax(param);
		  }
	}
	//搜索框回车搜索事件
	$("#J_searchKey").on("keydown",function(e){
		if(e.keyCode==13){;
			 var param={search:$(this).val()};//请求参数
			getListByManageStatu(param);
		}
	})
	
	
	
	//根据Tab 选项卡，读取对于查询  ajax
	function getListByManageStatu(param){
		var searchValue=$("#J_searchKey").val();
		if(searchValue){ //文件名称搜索 有值
			param.search=searchValue;
		}
		layer.msg('加载中', {
		  icon: 16
		  ,shade: 0.01
		  ,time:2
		});
		switch(manageStatu){
			case "all" : 
			getAllAjax(param);//全部文件
			break;
			case "expire" : 
			getExpireAjax(param);//即将截止
			break;
			case "waitmine" :
			getWaitMineAjax(param);//代我签
			break;
			case "waitother" :
			getWaitYouAjax(param);//待对方签
			break;
			case "complete" :
			getDoneAjax(param);//已完成
			break;
			case "refuse" :
			getRefuseAjax(param);//已拒签
			break;
			case "draft" :
			getDraftAjax(param);//草稿箱
			break;
			default:
			break;
		}
	}
	
	//即将截止  Ajax  请求
	getExpireAjax();
	function getExpireAjax(SubData) {
	    var Url = '/contractExpire';
	    var SubData = SubData || {};
	    echo.ajax.post(Url,SubData,function (res) {
	        echo.ajax.callback(res,function () {
				//res={"result":"success","msg":"请求成功","reqCode":"0000","data":[{"contract":"测试","initiator":"我","startTime":"2018/12/19","validTime":"2019/01/19","id":1,"endTime":"2018/12/31","labelName":"","status":"已完成"},{"contract":"12312312313","initiator":"Echonessy","startTime":"2018/12/27","validTime":"","id":2,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"这是一个原子弹","initiator":"我","startTime":"2018/12/27","validTime":"","id":4,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"我是一个原子弹","initiator":"我","startTime":"2018/12/27","validTime":"","id":5,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"这是合同啊啊啊所多","initiator":"我","startTime":"2018/12/28","validTime":"","id":6,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"213123","initiator":"啊实打实","startTime":"2018/12/28","validTime":"","id":10,"endTime":"2018/12/26","labelName":"","status":"已完成"}],"sessionId":"2140BE7C4B83847B3263A1F7E38ABCB9"};
	            renderExpireHtml(res.data)
	        })
	    })
	};
	//16.即将截止   渲染数据
	function renderExpireHtml(data) {
		//头部 表头
	    var Html = '<ul class="single total_List">'
		Html += '<li class="top">';
		Html += '<span style="width:15%">合同名称</span>';
		Html += '<span style="width:10%">发起人</span>';
		Html += '<span data-value="startTime" class="byTime J_byTime">发起时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="endTime" class="byTime J_byTime">截止时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="validTime" class="byTime J_byTime">有效期<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%">状态</span>';
		Html += '<span style="width:10%;" class="J_byLable">标签<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%;border-right:none">剩余时间</span>';
		Html += '</li>';
		//内容 行
		if(data.length > 0) {
		    for(var i=0;i<data.length;i++) {
		        var this_Data = data[i];
		        Html += '<li>';
		        if(this_Data.status == '待我签') {
		            Html += '<span style="width:15%" data-id="'+this_Data.id+'"><a href="/passivesign?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        } else {
		            Html += '<span style="width:15%" data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        }
		        Html += '<span style="width:10%">'+this_Data.initiator+'</span>';
		        Html += '<span >'+this_Data.startTime+'</span>';
		        Html += '<span >'+this_Data.endTime+'</span>';
				Html += '<span >'+this_Data.validTime+'</span>';//有效期
		        Html += '<span style="width:10%">'+this_Data.status+'</span>';
			    Html += '<span style="width:10%;" class="J_LableUpdate" data-name="'+this_Data.labelName+'" data-id="'+this_Data.id+'">'+this_Data.labelName+'| <i style="color:#2F53B1;cursor: pointer;">修改</i></span>';//标签
				Html += '<span style="width:10%;border-right:none">'+this_Data.remainTime+'</span>';//剩余时间
		        Html += '</li>';
		    }
		}
		Html += '</ul>';
	    $('#expire_List').html(Html);//绑定 数据到页面
	}
	
	

    //待我签---Ajax
	getWaitMineAjax();
    function getWaitMineAjax(SubData) {
        var Url = '/waitMineList';
        var SubData = SubData || {};
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
				//res={"result":"success","msg":"请求成功","reqCode":"0000","data":[{"contract":"测试","initiator":"我","startTime":"2018/12/19","validTime":"2019/01/19","id":1,"endTime":"2018/12/31","labelName":"","status":"已完成"},{"contract":"12312312313","initiator":"Echonessy","startTime":"2018/12/27","validTime":"","id":2,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"这是一个原子弹","initiator":"我","startTime":"2018/12/27","validTime":"","id":4,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"我是一个原子弹","initiator":"我","startTime":"2018/12/27","validTime":"","id":5,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"这是合同啊啊啊所多","initiator":"我","startTime":"2018/12/28","validTime":"","id":6,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"213123","initiator":"啊实打实","startTime":"2018/12/28","validTime":"","id":10,"endTime":"2018/12/26","labelName":"","status":"已完成"}],"sessionId":"2140BE7C4B83847B3263A1F7E38ABCB9"};
                renderWaitMineHtml(res.data)
            })
        })
    };
  
    //渲染数据
    function renderWaitMineHtml(data) {
		var Html = '<ul class="single wait_Me">'
		Html += '<li class="top">';
		Html += '<span style="width:20%">合同名称</span>';
		Html += '<span style="width:15%">发起人</span>';
		Html += '<span data-value="startTime" class="byTime J_byTime">发起时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="endTime" class="byTime J_byTime">截止时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="validTime" class="byTime J_byTime">有效期<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%;" class="J_byLable">标签<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%;">剩余时间</span>';
		Html += '</li>';
		if(data.length > 0) {
		     for(var i=0;i<data.length;i++) {
		         var this_Data = data[i];
		         Html += '<li>';
		         Html += '<span style="width:20%" data-id="'+this_Data.id+'"><a href="/passivesign?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		         Html += '<span >'+this_Data.initiator+'</span>';
		         Html += '<span>'+this_Data.startTime+'</span>';
		         Html += '<span>'+this_Data.endTime+'</span>';
				 Html += '<span >'+this_Data.validTime+'</span>';//有效期
				 Html += '<span style="width:10%;" class="J_LableUpdate" data-name="'+this_Data.labelName+'" data-id="'+this_Data.id+'">'+this_Data.labelName+'| <i style="color:#2F53B1;cursor: pointer;">修改</i></span>';//标签
				 Html += '<span style="width:10%;">'+this_Data.remainTime+'</span>';//剩余时间
		         Html += '</li>';
		     }
		 }
		 Html += '</ul>';
        $('#wait_Me').html(Html)

    }
    //待对方签-----Ajax
	getWaitYouAjax();
    function getWaitYouAjax(SubData) {
            var Url = '/waitOtherList';
            var SubData = SubData|| {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderWaitYouHtml(res.data)
                })
            })
      };
   
    //待对方签-----渲染数据
    function renderWaitYouHtml(data) {
		var Html = '<ul class="single wait_You">'
		Html += '<li class="top">';
		Html += '<span style="width:20%">合同名称</span>';
		Html += '<span style="width:15%">待签方</span>';
	    Html += '<span data-value="startTime" class="byTime J_byTime">发起时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
	    Html += '<span data-value="endTime" class="byTime J_byTime">截止时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
	    Html += '<span data-value="validTime" class="byTime J_byTime">有效期<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%;" class="J_byLable">标签<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%;">剩余时间</span>';
		Html += '</li>';
		if(data.length > 0) {
		    for(var i=0;i<data.length;i++) {
		        var this_Data = data[i];
		        Html += '<li>';
		        Html += '<span style="width:20%" data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        Html += '<span style="width:15%">'+this_Data.signinArticle+'</span>';
		        Html += '<span>'+this_Data.startTime+'</span>';
		        Html += '<span>'+this_Data.endTime+'</span>';
				Html += '<span >'+this_Data.validTime+'</span>';//有效期
				Html += '<span style="width:10%;" class="J_LableUpdate" data-name="'+this_Data.labelName+'" data-id="'+this_Data.id+'">'+this_Data.labelName+'| <i style="color:#2F53B1;cursor: pointer;">修改</i></span>';//标签
				Html += '<span style="width:10%;">'+this_Data.remainTime+'</span>';//剩余时间
		        Html += '</li>';
		    }
		}
		Html += '</ul>';
        $('#wait_You').html(Html)
    }


    //已完成-------Ajax
	getDoneAjax();
    function getDoneAjax(SubData) {
            var Url = '/completeList';
            var SubData = SubData||{};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderDoneHtml(res.data)
                })
            })
     }
   
    //已完成------渲染数据
    function renderDoneHtml(data) {
		var Html = '<ul class="single sign_Done">'
		Html += '<li class="top">';
		Html += '<span style="width:20%">合同名称</span>';
		Html += '<span >签署方</span>';
		Html += '<span data-value="startTime" class="byTime J_byTime">发起时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="endTime" class="byTime J_byTime">截止时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="validTime" class="byTime J_byTime">有效期<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span data-value="completeTime" class="byTime J_byTime">完成时间<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:13%;" class="J_byLable">标签<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:17%;border-right:none">操作</span>';
		//Html += '<span style="width:7%;text-align: left;">作</span>';
		Html += '</li>';
		if(data.length > 0) {
		    for(var i=0;i<data.length;i++) {
		        var this_Data = data[i];
		        Html += '<li>';
		        Html += '<span style="width:20%" data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        Html += '<span >'+this_Data.signin+'</span>';
		        Html += '<span>'+this_Data.startTime+'</span>';
		        Html += '<span>'+this_Data.endTime+'</span>';
				Html += '<span >'+this_Data.validTime+'</span>';//有效期
				Html += '<span >'+this_Data.completeTime+'</span>';//有效期
				Html += '<span style="width:13%;" class="J_LableUpdate" data-name="'+this_Data.labelName+'" data-id="'+this_Data.id+'">'+this_Data.labelName+'| <i style="color:#2F53B1;cursor: pointer;">修改</i></span>';//标签
				Html+="<span style='width:17%;border-right:none'>";
// 		        if(this_Data.flag == 'Y') {
// 		            Html +="<button  class='btn btn-primary wasmSignBtn' data-this_Data='"+JSON.stringify(this_Data)+"'>私钥签名</button>"
// 					
// 		        } else {
// 		            Html +="<button class='btn btn-primary ' disabled data-this_Data='"+JSON.stringify(this_Data)+"'>已上链</button>"
		       // }
				//Html+="</span>";
				//Html+="<span style='width:7%;text-align: left;'>";
				if(this_Data.isShowArchive=="Y"){
					Html+="<i id='J_archive' data-id="+this_Data.id+"  title='归档' class='layui-icon layui-icon-delete' style='font-size:25px;padding:5px 10px'> </i>";
				}
				Html+="</span>";
		        Html += '</li>';
		    }
		}
		Html += '</ul>';
        $('#sign_Done').html(Html).on("click","#J_archive",function(){
			var id=$(this).data("id");
			toArchive(id);//执行归档
		})
		
        wasmSignBtnEvt();//签名
    }
    //签名
    function wasmSignBtnEvt() {
        $('.wasmSignBtn').on('click',function () {
            var this_Data = JSON.parse($(this).attr('data-this_Data'));
            $("#creatSign").stop(true).fadeIn(150);
            $("#creatSignBtn").attr('data-this_Data',$(this).attr('data-this_Data'));
        })
    }
    creatSignBtn();
    function creatSignBtn() {
        $("#creatSignBtn").on('click',function () {
            var this_Data = JSON.parse($(this).attr('data-this_Data'));
            var message = this_Data.fileHash;
            var id = this_Data.id;
            var alias = $('#alias').val();
            var auth = $('#auth').val();
            if(!alias) {layer.msg('请输入用户名(注册时的手机号)');return}
            if(!echo.fun.checkPhone(alias)) {
                layer.msg('账户格式错误，请重新输入');
                return
            }
            if(!auth) {layer.msg('请输入密码');return}
            readKeyFile(alias,auth,message,id);
        })
    }
    //文件读取
    function readKeyFile(alias,auth,message,id) {
        layer.msg('签名中，请稍后...签名结束自动关闭此弹窗.')
        var SubData = {};
        var Url = '/readKeyFile';
        SubData.alias = alias;
        SubData.auth = auth;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback( res,function () {
                console.log(res)
                var key = res.data;
                var signData = {message:message, key: key, password: auth}
                // var signData = {message:'91c3ea050a9226ca95348ba2ed6f98ab6fd8ec1ce43a7b140476592d4406c449', key: key, password: auth}
                createSignMessage(signData,id)
            })
        })
    }

    //创建签名
    function createSignMessage(signData,id) {
        signMessage(signData).then(r =>{
            var signature = r.data;
            console.log(signature)
            contractSaveSignature(signature,id)
        }).catch(err => {
            echo.box.alert(err)
        })
    }
    //请求后台
    function contractSaveSignature(signature,id) {
        var Url = '/contractSaveSignature';
        var SubData = {};
        SubData.id = id
        SubData.signature = signature
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('签名成功!');
                $("#creatSign").stop(true).fadeOut(150);
                getDoneAjax()
            })
        })
    }
    //已拒绝-------Ajax
	getRefuseAjax();
    function getRefuseAjax(SubData) {
            var Url = '/refuseList';
            var SubData = SubData || {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
					//res={"result":"success","msg":"请求成功","reqCode":"0000","data":[{"contract":"测试","initiator":"我","startTime":"2018/12/19","validTime":"2019/01/19","id":1,"endTime":"2018/12/31","labelName":"","status":"已完成","isShowArchive":"Y"},{"isShowArchive":"N","contract":"12312312313","initiator":"Echonessy","startTime":"2018/12/27","validTime":"","id":2,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"这是一个原子弹","initiator":"我","startTime":"2018/12/27","validTime":"","id":4,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"我是一个原子弹","initiator":"我","startTime":"2018/12/27","validTime":"","id":5,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"这是合同啊啊啊所多","initiator":"我","startTime":"2018/12/28","validTime":"","id":6,"endTime":"2018/12/31","labelName":"","status":"待对方签"},{"contract":"213123","initiator":"啊实打实","startTime":"2018/12/28","validTime":"","id":10,"endTime":"2018/12/26","labelName":"","status":"已完成"}],"sessionId":"2140BE7C4B83847B3263A1F7E38ABCB9"};
                    renderRefuseHtml(res.data)
                })
            })
     };
    //已拒绝-----渲染数据
    function renderRefuseHtml(data) {
		 var Html = '<ul class="single refuse_List">'
		 Html += '<li class="top">';
		Html += '<span style="width:20%">合同名称</span>';
		Html += '<span>发起人</span>';
		Html += '<span>拒签主体</span>';
		Html += '<span>发起时间</span>';
		Html += '<span>拒签时间</span>';
		Html += '<span style="width:10%;" class="J_byLable">标签<i class="layui-icon layui-icon-triangle-d"></i></span>';
		Html += '<span style="width:10%;">归档</span>';
		Html += '</li>';
		if(data.length > 0) {
		    for(var i=0;i<data.length;i++) {
		        var this_Data = data[i];
		        Html += '<li>';
		        Html += '<span style="width:20%" data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        Html += '<span>'+this_Data.initiator+'</span>';
		        Html += '<span>'+this_Data.denied+'</span>';
		        Html += '<span>'+this_Data.startTime+'</span>';
		        Html += '<span>'+this_Data.deniedTime+'</span>';
				Html += '<span style="width:10%;" class="J_LableUpdate" data-name="'+this_Data.labelName+'" data-id="'+this_Data.id+'">'+this_Data.labelName+'| <i style="color:#2F53B1;cursor: pointer;">修改</i></span>';//标签
				Html+="<span style='width:10%;border-left:none;'>";
				if(this_Data.isShowArchive=="Y"){
					Html+="<i id='J_archive' data-id="+this_Data.id+" title='归档' class='layui-icon layui-icon-delete' style='font-size:25px;padding:5px 10px'> </i>";
				}
				 Html += '</span>';
		        Html += '</li>';
		    }
		}
		Html += '</ul>';
        $('#refuse_List').html(Html).on("click","#J_archive",function(){
			var id=$(this).data("id");
			toArchive(id);//执行归档
		})
    }
	
	
	//合同归档
	function  toArchive(id){
		layer.confirm('被归档的合同将不可恢复,您确定到将该合同归档吗？', {
		  btn: ['确认','取消'] //按钮
		}, function(){
			var Url = '/contractArchive';
			var SubData =  {id:id};
			echo.ajax.post(Url,SubData,function (res) {
			     if(res.result=="success")//修改成功
			     {
			     	layer.msg("修改标签成功",{time:1000},function(){
			     		 //刷新列表数据
			     		getListByManageStatu();//刷新列表数据
			     	})
			     }else{
			     	layer.msg(res.msg)
			     }
				
			})
		},
		function(){
			
		})
	}
	//--------标签修改-------
	//根据标签查询标签
	$("#mana_TabCon").on("click",".J_LableUpdate",function(){
		$("#J_lableBox").show()//弹标签修改框
		$("#J_contractId").val($(this).data("id"));//获取合同id 
	})
	//标签修改框 取消  ---直接关闭
	
	$("#J_lableBox").find(".J_cencal_btn").on("click",function(){
		$("#J_lableBox").hide()//关闭 标签修改框
	})

	//标签修改框  确认  ---执行查询
	
		$("#J_lableBox").find(".J_sure_btn").on("click",function(){
			$("#J_lableBox").hide()//关闭 时间搜索框
			//执行查询操作
			var lableName=$("#J_LableName").val().trim()
			if(lableName){//文本框中存在标签名，执行新增 标签
				var Url = '/addLabel';
				var SubData = {labelName:lableName}
				echo.ajax.post(Url,SubData,function (res) {
					if(res.result=="success")//修改成功
					{
						var labelId=res.data.id;//新增标签的id
						var id=$("#J_contractId").val();//合同id
						//调用修改合同标签接口{合同id,标签id}
						var SubData = {labelId:labelId,id:id}
						echo.ajax.post("/contractUpdateLabel",SubData,function (res) {
							if(res.result=="success")//修改成功
							{
								layer.msg("修改标签成功",{time:1000},function(){
									getListByManageStatu();//刷新列表数据
								})
							}else{
								layer.msg(res.msg)
							}
						})
						
					}
					
				})
				
			}else{ //修改合同标签
				var labelId=$("#J_lableList").val();//新增标签的id
				var id=$("#J_contractId").val();//合同id
				//调用修改合同标签接口{合同id,标签id}
				var SubData = {labelId:labelId,id:id}
				echo.ajax.post("/contractUpdateLabel",SubData,function (res) {
					if(res.result=="success")//修改成功
					{
						layer.msg("修改标签成功",{time:1000},function(){
							//刷新列表数据
							getListByManageStatu();//刷新列表数据
						})
					}else{
						layer.msg(res.msg)
					}
				})
			}
		})

	//*******************S 根据标签查询************************
	
    //根据标签查询标签
	$("#mana_TabCon").on("click",".J_byLable",function(){
		$("#J_lableSearchBox").show()//弹出标搜索框
	})
	
	$("#J_lableSearchBox").find(".J_cencal_btn").on("click",function(){
		$("#J_lableSearchBox").hide()//关闭 标签搜索框
	})


	$("#J_lableSearchBox").find(".J_sure_btn").on("click",function(){
		$("#J_lableSearchBox").hide()//关闭 标签搜索框
		var lableId=$("#J_lableListSearch").val();//
		getListByManageStatu({labelId:lableId});//根据标签id 查询，记录 文本搜素框搜索条件
	})

	
	//*******************E 根据标签查询************************
	
	/**
	 *@description 读取标签列表
	 *@param {int} value 需要选中的选项值
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
				 $("#J_lableListSearch").html(html);
		    })
		})
	}
	getLableList();//默认读取标签列表
	
	//--------End  标签修改 结束-------
	
	
	

    //获取草稿箱Ajax
	getDraftAjax();
    function getDraftAjax(SubData) {
            var Url = '/draftList';
            var SubData = SubData || {};
            echo.ajax.post(Url,SubData,function (res) {
                echo.ajax.callback(res,function () {
                    renderDraftHtml(res.data)
                })
            })
     };
    //草稿箱---------渲染数据
    function renderDraftHtml(data) {
		var Html = '<ul class="single sign_Draft">'
		Html += '<li class="top">';
		Html += '<span style="width:30%">合同名称</span>';
		Html += '<span style="width:30%">签署对象</span>';
		Html += '<span style="width:20%">最后一次编辑时间</span>';
		Html += '<span style="width:20%"></span>';
		Html += '</li>';
		if(data.length > 0) {
		    for(var i=0;i<data.length;i++) {
		        var this_Data = data[i];
		        Html += '<li>';
		        Html += '<span style="width:30%" data-id="'+this_Data.id+'"><a href="/signinfo?id='+this_Data.id+'">'+this_Data.contract+'</a></span>';
		        Html += '<span style="width:30%">'+this_Data.signUser+'</span>';
		        Html += '<span style="width:20%">'+this_Data.lastEditTime+'</span>';
		        Html += '<span style="width:20%"><img src="/static/img/model/del.png" data-id="'+this_Data.id+'" class="del_Ico" alt=""></span>';
		        Html += '</li>';
		    }
		}
		Html += '</ul>';
        $('#sign_Draft').html(Html);
        deleteEvt()
    }
    // 删除草稿事件
    function deleteEvt() {
        $('.del_Ico').off('click');
        $('.del_Ico').on('click',function (evt) {
            stopBubble(evt);
            var that = this;
            var id = $(this).attr('data-id');
            $('#is_Del').stop(true).fadeIn(150);
            $('.del_Ok').off('click');
            $('.del_No').off('click');
            $('.del_Ok').on('click',function (evt) {
                stopBubble(evt)
                deleteDraftAjax(id);
                $('#is_Del').stop(true).fadeOut(150);
            })
            $('.del_No').on('click',function (evt) {
                stopBubble(evt)
                $('#is_Del').stop(true).fadeOut(150);
            })
        })
    }
    // 删除草稿
    function deleteDraftAjax(id) {
        var Url = '/deleteDraft';
        var SubData = {};
        SubData.id = id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('删除成功');
                getDraftAjax();
            })
        })
    }
})
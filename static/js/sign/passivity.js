/**
 * Created by Echonessy on 2018/12/27.
 */
//获取合同信息
contractInfo();
function contractInfo() {
    var Url = '/contractInfo';
    var SubData = {};
    SubData.id = getUrl.id;
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback(res,function () {
            renderBaseInfo(res.data);
            var passiInfo = res.data;
            passiInfo.signTime = getNowTime();
            window.localStorage.setItem('passiInfo',JSON.stringify(passiInfo))
        })
    })
}
//获取当前日期
function getNowTime() {
    var myDate = new Date();
    var getFullYear = myDate.getFullYear(); //获取当前年份(2位)
    var getMonth =  myDate.getMonth()+1;
    var getDate =  myDate.getDate();;
    return getFullYear+'-'+getMonth + '-'+getDate;
}
//渲染基础数据
function renderBaseInfo(data) {
    $("#contractName").html(isExistData(data.contractName))
    $("#endTime").html(isExistData(data.endTime))
    $("#remark").html(isExistData(data.remark))
    var signatory = data.roleList;
    var Html = '';
    //签约方
    for(var i=0; i<signatory.length;i++) {
        var this_Data = signatory[i];
        Html += '<li data-this_Data="'+JSON.stringify(this_Data)+'">';
        Html += '<span title="'+this_Data.name+'">'+isExistData(this_Data.name)+'</span>';
        Html += '<span title="'+this_Data.phone+'">Tel：'+isExistData(this_Data.phone)+'</span>';
        Html += '</li>';
    }
    $("#intro_Signle").html(Html);
    var contractUrl = data.contractUrl;
    console.log(contractUrl);
    layer.msg('加载合同中....请耐心等待')
    getBase64(contractUrl).then(function(base64){
        $("#showBase64").attr('src',base64);
        layer.msg('加载完成')
    },function(err){
        console.log(err);//打印异常信息
    });
}
//传入图片路径，返回base64
function getBase64(img){
    function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    }
    var image = new Image();
    image.crossOrigin = '';
    image.src = img;
    var deferred=$.Deferred();
    if(img){
        image.onload =function (){
            deferred.resolve(getBase64Image(image));//将base64传给done上传处理
        }
        return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
    }
}
//鉴别数据是否存在
function isExistData(data) {
    return data ? data:' ';
}
// 合同状态列表
function proofList(data) {
    var Html = '';
    Html += '<li class="single top">';
    Html += '<span>合同状态</span>';
    Html += '<span>文件Hash</span>';
    Html += '</li>';
    if(data.length > 0) {
        for(var i=0;i<data.length;i++) {
            var this_Data = data[i];
            Html += '<li class="single" data-this_Data="'+JSON.stringify(this_Data)+'">';
            Html += '<span title="'+this_Data.fileHash+'">'+this_Data.fileHash+'</span>';
            Html += '<span title="'+this_Data.status+'">'+this_Data.status+'</span>';
            Html += '</li>';
        }
    }
    $("#proofList").html(Html);
}
//签约主体信息
function roleList(data) {
    var Html = '';
    Html += '<li class="single top">';
    Html += '<span>签署主体</span>';
    Html += '<span>签署方账号</span>';
    Html += '<span>签署方公钥</span>';
    Html += '</li>';
    if(data.length > 0) {
        for(var i=0;i<data.length;i++) {
            var this_Data = data[i];
            Html += '<li class="single" data-this_Data="'+JSON.stringify(this_Data)+'">';
            Html += '<span title="'+this_Data.name+'">'+isExistData(this_Data.name)+'</span>';
            Html += '<span title="'+this_Data.phone+'">'+isExistData(this_Data.phone)+'</span>';
            Html += '<span title="'+this_Data.publicKeys+'">'+isExistData(this_Data.publicKeys)+'</span>';
            Html += '</li>';
        }
    }
    $("#roleList").html(Html);
}

// 打开获取签章
stepEvt();
function stepEvt() {
    $('#change_Btn').on('click',function () {
        $('#main_Evt').css('display','block');
        $('#code_Box').css('display','none');
        $('#file_Box').css('display','none');
        $('#sign_Box').css('display','none');
        $('#add_sign').stop(true).fadeIn(150);
    })
    $('#start_Sign').on('click',function () {
        $('#iden_Box').stop(true).fadeIn(150);
    })
}
init()
//    初始化拖拽缩放
function init() {
    var LeftHtml = $('#LeftBox').html();
    $( "#MainBox .drag_Box" ).resizable({
        aspectRatio: 1 / 1,
        maxHeight: 250,
        maxWidth: 350,
        minHeight: 20,
        minWidth: 20,
        ghost: true,
    });
    //删除当前签名
    $('.sing_close').on('click',function () {
        $(this).parent('.drag_Box').remove()
    })
    //拖拽
    $(".drag_Box").draggable({
        scroll: false,
        stop: function(event, ui) {
            var thisDom = ui.helper;
            var thisDomL = ui.position.left + $('#sign_Img').offset().left - $('#MainBox').offset().left;
            var thisDomT = ui.position.top +$('#MainBox').scrollTop()+  $('#sign_Img').offset().top - $('#MainBox').offset().top;
            if($(thisDom[0]).attr('data-in') != 'true') {
                thisDom[0].style.left = thisDomL - 0 + 'px'; //1 为边框宽度
                thisDom[0].style.top = thisDomT - 0 + 'px';//1 为边框宽度
                $(thisDom[0]).attr('data-in','true');
                var close = '<i class="sing_close"></i>';
                $(thisDom[0]).append(close);
                $('#DragBox').append($(thisDom[0]));
                var dragSrc = $(thisDom[0]).find('img').attr('src');
                $('#sign_Img').html(initLeftBox(dragSrc));
            }
            init();
        }
    });
}
//    还原左侧Dom
function initLeftBox(dragSrc) {
    var Html = '';
    Html += '<div class="drag_Box" >';
    Html += '<img src="'+dragSrc+'" id="my_SignImg"  class="" alt="">'
    Html += '</div>';
    return Html;
}
//    创建canvas数据坐标系
function create(fun) {
    var arr = [];
    for(var i=0;i<$('#MainBox .drag_Box').length;i++) {
        var thisBox = $('#MainBox .drag_Box').eq(i);
        var w = thisBox.width() ? thisBox.width() : "50px";
        var h = thisBox.height() ? thisBox.height() : "50px";
        var l = thisBox.position().left ? thisBox.position().left : "0";
        var t = thisBox.position().top ? thisBox.position().top : "0";
        var thisImg = thisBox.find('img');
        var imgSrc = thisImg.attr('src');
        var obj = {};
        obj.w = w;
        obj.h = h;
        obj.l = l;
        obj.t = t;
        obj.src = imgSrc;
        arr.push(obj);
    }
    createCanvas(arr,fun)
}
//    合并canvas
function createCanvas(arr,fun) {
    var DataArr = [];
    var base64 = [];
    var Arr = [];
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var bw = $('#showBase64').width();
    var bh = $('#showBase64').height();
    canvas.width = bw;
    canvas.height = bh;
    var image=new Image();
    image.crossOrigin = '';
    image.src=$('#showBase64').attr('src');
    image.onload=function(){
        ctx.drawImage(image,0,0,bw,bh);
        console.log('加载完毕');
        $.each(arr,function (i,obj) {
            var signImg=new Image();
            signImg.crossOrigin = "";
            signImg.src = obj.src;
            signImg.onload=function(){
                ctx.drawImage(signImg,obj.l,obj.t,obj.w,obj.h);
                base64.push(canvas.toDataURL("image/jpeg",1));
                if(base64.length == arr.length) {
                    Arr.push(base64[base64.length-1]);
                    funCallBack(base64[base64.length-1],fun)
                }
            }
        })
    }
}
//    合并后回调
function funCallBack(src,fun) {
    fun(src);
}


//获取验证码
getSignCodeEvt()
function getSignCodeEvt() {
    $("#sendPhone").html(window.localStorage.getItem('c_pid'));
    //     获取验证码
    $("#getVerifyCode").on('click',function () {
        var phone = $("#sendPhone").html();
        echo.fun.countDown(this); //倒计时
        contractSigningVerifyCode(phone); // 获取登录验证码Ajax
    })
}
//获取验证码Ajax
function contractSigningVerifyCode(phone) {
    var Url = '/contractSigningVerifyCode';
    var SubData = {}
    SubData.phone = phone;
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback(res,function () {
            console.log(res.data.code);
            layer.msg('短信已发送');
        })
    })
}

// 同意或者拒绝
contractSigningEvt()
function contractSigningEvt() {
    $('#contractSigning_Ok').on('click',function () {
        $('#iden_Box').stop(true).fadeIn(150);
        $("#iden_CerBtn").attr('data-flag','Y');
    })
    $('#contractSigning_No').on('click',function () {
        $('#iden_Box').stop(true).fadeIn(150);
        $("#iden_CerBtn").attr('data-flag','N');
    })


    //同意 拒绝
    $("#iden_CerBtn").on('click',function () {
        var signFlag = $(this).attr('data-flag');
        var verifyCode = $("#verifyCode").val();
		 if(!verifyCode) {layer.msg('请输入验证码');return}
		//2019-1-31 新增
		var privateKeyPwd = $("#J_privateKeyPwd").val();
		if(!privateKeyPwd) {layer.msg('请输私钥密码');return}
        var phone = $("#sendPhone").html();
       
        //同意
        if(signFlag == 'Y') {
            layer.msg('签署中...请等待,签署完成自动跳转...')
            create(function (url) {
                base64ToUrl(url,signFlag,verifyCode,function (data,signFlag,verifyCode) {
                    contractSigning(data,signFlag,verifyCode);
                });
            })
        } else {
            var url = '';
            layer.msg('拒绝中...请等待,拒绝完成自动跳转...')
            contractSigning(url,signFlag,verifyCode);
        }
    });
}

//base64上传后获取url
function base64ToUrl(url,signFlag,verifyCode,fun) {
    var Url = '/upload4';
    var SubData = {};
    SubData.phone = $("#sendPhone").html();
    // SubData.url = 'data:image/png;base64,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';
    SubData.url = url
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback(res,function () {
            var this_Url = res.data.urls[0];
            fun(this_Url,signFlag,verifyCode);
        })
    })
}

//同意或拒绝签署
function contractSigning(contractUrl,signFlag,verifyCode) {
    // id：合同id必传
    // signFlag：Y:同意  N:拒签 必传
    // verifyCode：短信验证码 必传
    // contractUrl：合同地址 多图片地址用逗号分割 同意必传，拒签不传
    var Url = '/contractSigning';
    var SubData = {};
    SubData.id = getUrl.id;
    SubData.signFlag = signFlag;
    SubData.contractUrl = contractUrl;
    SubData.verifyCode = verifyCode;
	SubData.privateKeyPwd = $("#J_privateKeyPwd").val();//2019-1-31 新增参数
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback(res,function () {
            console.log(res.data)
            if(signFlag == 'Y') {
                window.location.href = '/agreesign?id='+getUrl.id;
            } else {
                window.location.href = '/refusesign?id='+getUrl.id;
            }
        })
    })
}




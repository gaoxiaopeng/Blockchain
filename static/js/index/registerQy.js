


/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    var loader = null;
    //事件集合
    clickEvt();
    function clickEvt() {
        //获取注册验证码
        $("#qyGetVerifyCode").on('click',function () {
            var phone = $("#qyPhone").val();
            if(!phone) {
                layer.msg('请输入手机号');
                return
            }
            if(!echo.fun.checkPhone(phone)) {
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
            echo.fun.countDown(this); //倒计时
            registeredVerifyCode(phone); // 获取登录验证码Ajax
        })
        //手机号用户名同步
        $('#qyPhone').on('input',function () {
            $("#alias").val($(this).val())
        })
        //手机号格式校验
        $("#qyPhone").on('blur',function () {
            if(!echo.fun.checkPhone($(this).val())&& $(this).val()) {
                $(this).val('');
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
        })
     
        // 注册
        $("#J_qyRegisterBtn").on('click',function () {
		
            registerBefore()
        })
    }
    //检测手机号是否存在
    function checkPhoneExist(phone,callback) {
		
        var Url = '/checkPhoneExist';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var isExist = res.data.isExist;
                //存在
                if(isExist) {
                    layer.msg('用户已存在');
                    return
                } else {
                    callback();
                    return
                }
            })
        })
    }
    //获取注册验证码Ajax
    function registeredVerifyCode(phone) {
        var Url = '/registeredVerifyCode';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
              console.log(res.data.code);
                layer.msg('短信已发送');
            })
        })
    }
  
    // 注册前检测
    function registerBefore() {
	
        var name = $('#qyName').val();//企业名称
		var creditCode = $('#qyCreditCode').val();//统一社会信用代码
		
        var phone = $('#qyPhone').val();//手机号
        var idCard = $('#qyIdCard').val();//身份证号
        var verifyCode = $('#qyVerifyCode').val();//短信验证码
        var qyBusinessLicenseImg = $('#qyBusinessLicenseImg').val();//营业执照扫描件
        var idCardFrontImg = $('#qyIdCardFrontImg').val();//法人身份证正面图片地址
        var idCardBackImg = $('#qyIdCardBackImg').val();//法人身份证反面图片地址
        var privateKeyPwd = $('#J_privateKeyPwd').val();//公钥 密码
        if(!name) {layer.msg('请输入企业名称');return;}
		if(!creditCode) {layer.msg('请输入统一社会信用码');return;}
        if(!idCard) {layer.msg('请输入法人身份证号');return;}
        if(!echo.fun.isCardNo(idCard)) {$('#qyIdCard').val('');layer.msg('法人身份证格式错误，请重新输入');return;}
        if(!phone) {layer.msg('请输入管理员手机号');return;}
        if(!echo.fun.checkPhone(phone)) {$('#qyPhone').val('');layer.msg('管理员手机号码格式错误，请重新输入');return;}
        if(!verifyCode) {layer.msg('请输入短信验证码');return;}
        if(!qyBusinessLicenseImg) {layer.msg('上传营业执照扫描件');return;}
        if(!idCardFrontImg) {layer.msg('请上传法人身份证正面图片');return;}
        if(!idCardBackImg) {layer.msg('请上传法人身份证反面图片');return;}
        if(!privateKeyPwd) {layer.msg('请输入私钥密码');return;}
        checkPhoneExist(phone,registeredAjax);
    }
    //注册
    function registeredAjax() {
		
        var Url = '/registered';
        var SubData = {}
        SubData.name = $('#qyName').val();//企业名称
        SubData.phone = $('#qyPhone').val();//管理员手机号
        SubData.idCard = $('#qyIdCard').val();//法人身份证号
        SubData.verifyCode = $('#qyVerifyCode').val();//短信验证码
        SubData.memberImg = $('#qyBusinessLicenseImg').val();//营业执照扫描件地址
        SubData.idCardFrontImg = $('#qyIdCardFrontImg').val();//身份证正面图片地址
        SubData.idCardBackImg = $('#qyIdCardBackImg').val();//身份证反面图片地址
       // SubData.privateKeysFileUrl = ' ';//公钥地址
         SubData.privateKeyPwd = $('#J_privateKeyPwd').val();//私钥密码 2019-1-30
		
		//2019-1-17 新增参数
		SubData.type = "company";//企业
		SubData.creditCode=$("#qyCreditCode").val();  //统一社会信用代码
		
		
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('注册成功',function(){
					window.location.href = '/index'
				});
            });
        })
    }
    //上传
    function uploadLocalFile(formDom,fileDom,callback) {
        var Url = "/upload2";
        uploadEvt(Url,formDom,fileDom,function (data) {
            callback(data);
        })
    }
    //自动上传
    selfUpload()
    function selfUpload() {
        $("#qyBusinessLicenseImgFile").on('change',function () {
            var formDom = '#qyBusinessLicenseImgForm';
            var fileDom = '#qyBusinessLicenseImgFile';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#qyBusinessLicenseImg").val(data.data.urls[0])
                $("#qyBusinessLicenseImgDemo").attr('src',data.data.urls[0])
            });
        })
        $("#qyIdCardFrontImgFile").on('change',function () {
            var formDom = '#qyIdCardFrontImgForm';
            var fileDom = '#qyIdCardFrontImgFile';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#qyIdCardFrontImg").val(data.data.urls[0])
                $("#qyIdCardFrontImgDemo").attr('src',data.data.urls[0])

            });
        })
        $("#qyIdCardBackImgFile").on('change',function () {
            var formDom = '#qyIdCardBackImgForm';
            var fileDom = '#qyIdCardBackImgFile';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#qyIdCardBackImg").val(data.data.urls[0])
                $("#qyIdCardBackImgDemo").attr('src',data.data.urls[0])
            });
        })
    }
})

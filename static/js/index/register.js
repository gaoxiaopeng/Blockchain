/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    var loader = null;
    //事件集合
    clickEvt();
    function clickEvt() {
        //获取注册验证码
        $("#getVerifyCode").on('click',function () {
            var phone = $("#phone").val();
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
        $('#phone').on('input',function () {
            $("#alias").val($(this).val())
        })
        //手机号格式校验
        $("#phone").on('blur',function () {
            if(!echo.fun.checkPhone($(this).val())&& $(this).val()) {
                $(this).val('');
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
        })
        //创建公钥私钥
        $('#creat_Key').on('click',function () {
            var auth = $("#auth").val();
            var alias = $("#alias").val();
            if(!auth) {
                layer.msg('请输入密码');
                return
            }
            if(!alias) {
                layer.msg('请输入手机号');
                return
            }
            loader = layer.load(1, {shade: [0.1,'#fff']});
            createKeyAuth(alias,auth)
        })
        // 注册
        $("#J_registerBtn").on('click',function () {
			
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
    //创建私钥公钥
    function createKeyAuth(alias,auth) {
        var creData = {alias: alias, auth:auth};
        createKey(creData).then(res => {
			console.log("-----------------------");
			console.log(res);
			
            writeKeyFile(alias,auth,res.data,function () {
                $("#keyData").val(res.data);
                var reqData = JSON.parse(res.data);
                var xpub = reqData.xpub;
                $("#publicKeys").html(xpub);
                layer.close(loader);
            })
        }).catch(err => {
            layer.msg(err)
        });
    }
    // 注册前检测
    function registerBefore() {
		
        var name = $('#name').val();//姓名
        var phone = $('#phone').val();//手机号
        var idCard = $('#idCard').val();//身份证号
        var verifyCode = $('#verifyCode').val();//短信验证码
        var memberImg = $('#memberImg').val();//本人照片地址
        var idCardFrontImg = $('#idCardFrontImg').val();//身份证正面图片地址
        var idCardBackImg = $('#idCardBackImg').val();//身份证反面图片地址
        var privateKeyPwd = $('#J_privateKeyPwd').val();//公钥 密码
        if(!name) {layer.msg('请输入姓名');return;}
        if(!idCard) {layer.msg('请输入身份证号');return;}
        if(!echo.fun.isCardNo(idCard)) {$('#idCard').val('');layer.msg('身份证格式错误，请重新输入');return;}
        if(!phone) {layer.msg('请输入手机号');return;}
        if(!echo.fun.checkPhone(phone)) {$('#phone').val('');layer.msg('手机号码格式错误，请重新输入');return;}
        if(!verifyCode) {layer.msg('请输入短信验证码');return;}
        if(!memberImg) {layer.msg('请上传本人照片');return;}
        if(!idCardFrontImg) {layer.msg('请上传身份证正面图片');return;}
        if(!idCardBackImg) {layer.msg('请上传身份证反面图片');return;}
        if(!privateKeyPwd) {layer.msg('请输入私钥密码');return;}
        checkPhoneExist(phone,registeredAjax);
    }
    //注册
    function registeredAjax() {
        var Url = '/registered';
        var SubData = {}
        SubData.name = $('#name').val();//姓名
        SubData.phone = $('#phone').val();//手机号
        SubData.idCard = $('#idCard').val();//身份证号
        SubData.verifyCode = $('#verifyCode').val();//短信验证码
        SubData.memberImg = $('#memberImg').val();//本人照片地址
        SubData.idCardFrontImg = $('#idCardFrontImg').val();//身份证正面图片地址
        SubData.idCardBackImg = $('#idCardBackImg').val();//身份证反面图片地址
        // SubData.privateKeysFileUrl = ' ';//公钥地址
        SubData.privateKeyPwd = $('#J_privateKeyPwd').val();//私钥密码 2019-1-30
		//2019-1-17 新增参数
		SubData.type = "personal";//个人
		
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('注册成功');
                window.location.href = '/index'
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
        $("#fileUser").on('change',function () {
            var formDom = '#fileUserForm';
            var fileDom = '#fileUser';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#memberImg").val(data.data.urls[0])
                $("#memberImgIco").attr('src',data.data.urls[0])
            });
        })
        $("#fileidCardFront").on('change',function () {
            var formDom = '#fileidCardFrontForm';
            var fileDom = '#fileidCardFront';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#idCardFrontImg").val(data.data.urls[0])
                $("#idCardFrontImgIco").attr('src',data.data.urls[0])

            });
        })
        $("#fileidCardBack").on('change',function () {
            var formDom = '#fileidCardBackForm';
            var fileDom = '#fileidCardBack';
            uploadLocalFile(formDom,fileDom,function (data) {
                $("#idCardBackImg").val(data.data.urls[0])
                $("#idCardBackImgIco").attr('src',data.data.urls[0])
            });
        })
    }
})



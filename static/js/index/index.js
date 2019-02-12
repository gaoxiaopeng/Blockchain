/**
 * Created by Echonessy on 2018/12/18.
 */
$(function () {
    // 初始化
    init()
    function init() {
        isLogin();
        clickEvt();
    }
    //校验是否登录过
    function isLogin() {
        var Url = '/isLogin';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                var isLogin = res.data.isLogin;
                if(!isLogin) {
                    $('#loginMain').css('display','block');
                } else {
                    messageUnread();
                    contractCount()
                    $('#loginMain').css('display','none');
                }
            })
        })
    }
    //事件集合
    function clickEvt() {
    //     获取登录验证码
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
            loginVerifyCode(phone); // 获取登录验证码Ajax
        })
    //    登录
        $("#login").on('click',function () {
            var phone = $("#phone").val();
            var verifyCode = $("#verifyCode").val();
            if(!phone) {
                layer.msg('请输入手机号');
                return
            }
            if(!echo.fun.checkPhone(phone)) {
                layer.msg('手机号码格式错误，请重新输入');
                return
            }
            if(!verifyCode) {
                layer.msg('请输入验证码');
                return
            }
            loginAjax(phone,verifyCode);
        });
        $("#dataList li").on('click',function () {
			var status=$(this).data("status");
            window.location.href='/manage#'+status
        })
    }
    //获取登录验证码Ajax
    function loginVerifyCode(phone) {
        var Url = '/loginVerifyCode';
        var SubData = {}
        SubData.phone = phone;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res.data.code)
              
                layer.msg('短信已发送');
            })
        })
    }
    //登录
    function loginAjax(phone,verifyCode) {
        var Url = '/login';
        var SubData = {}
        SubData.phone = phone;
        SubData.verifyCode = verifyCode;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                window.localStorage.setItem('c_pid',phone);
                layer.msg('登录成功');
                messageUnread();
                contractCount()
                $('#loginMain').stop(true).fadeOut(200);
            })
        })
    }
    // 查询未读信息列表
    function messageUnread() {
        var Url = '/messageUnread';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
                redMsg(res.data)
            })
        })
    }
    //小红点确认
    function redMsg(data) {
        if(!data) {return}
        if(!data.list) {return}
        if(data.list.length == 0) {return}
        $("#remindIco").fadeIn(150);
    }
    // 修改消息为已读
    function messageUpdateRead(id) {
        var Url = '/messageUpdateRead';
        var SubData = {}
        SubData.id = id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
            })
        })
    }
    // 首页统计
    function contractCount() {
        var Url = '/contractCount';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
                renderCount(res.data)
            })
        })
    }
    //加载首页统计
    function renderCount(data) {
        $('#dataList li').addClass('can_See');
        $.each($('#dataList li'),function (i,obj) {
            $('#dataList li').eq(i).find('img').attr('src','/static/img/layout/'+(i+1)+'1.png')
        })
        $("#waitmine").html(data.waitmine);
        $("#expire").html(data.expire);
        $("#waitother").html(data.waitother);
    }



    // 查询我发起的合同信息
    function contractInitiate(contractNo) {
        var Url = '/contractInitiate';
        var SubData = {}
        SubData.contractNo = contractNo;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
            })
        })
    }
    // 查询合同详细信息
    // contractInfo(1)
    function contractInfo(id) {
        var Url = '/contractInfo';
        var SubData = {}
        SubData.id = id;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                console.log(res)
            })
        })
    }

})
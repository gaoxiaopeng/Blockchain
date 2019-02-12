/**
 * Created by Echonessy on 2018/12/26.
 */
$(function () {
    add_Fade_Evt()
    function add_Fade_Evt() {
        $('.fade_Close,.fade_cancel').on('click',function () {
            $(this).parents('.fade_Box').stop(true).fadeOut(150);
        })
        $( "#slider" ).slider({
            value: 50
        });
        $('#code_Evt').on('click',function () {
            $('#main_Evt').css('display','none');
            $('#code_Box').stop(true).fadeIn(150);
        })
        $('#file_Evt').on('click',function () {
            $('#main_Evt').css('display','none');
            $('#file_Box').stop(true).fadeIn(150);
        })
        $('#sign_Evt').on('click',function () {
            $('#main_Evt').css('display','none');
            $('#sign_Box').stop(true).fadeIn(150);
        })
    }

    // 获取用户签章
    signatureInfo();
    function signatureInfo() {
        var Url = '/signatureInfo';
        echo.ajax.post(Url,null,function (res) {
            echo.ajax.callback(res,function () {
                var resData = res.data;
                renderInfoImg(resData);
            })
        })
    }
// 渲染签章
    function renderInfoImg(data) {
        console.log(data)
        if(!data) {return}
        if (data.length>0) {
            $("#my_SignImg").attr('src',data[data.length-1].url);
        }
        var Html = '';
        for(var i=0; i<data.length;i++) {
            var this_Data = data[i];
            Html += '<li><img data-addTime="'+this_Data.addTime+'" data-id="'+this_Data.id+'" data-mid="'+this_Data.mid+'" src="'+this_Data.url+'" alt=""></li>';
        }
        $("#user_SignList").html(Html);
        choiceSign()
    }
    //选择签章
    function choiceSign() {
        //
        $("#user_SignList li").off('click');
        $("#user_SignList li").on('click',function () {
            $(this).addClass('this_Choice');
            $(this).siblings().removeClass();
            $("#signList_Ok").attr('data-url',$(this).find('img').attr('src'));
        })
        $("#signList_Ok").off('click');
        $("#signList_Ok").on('click',function () {
            var src = $("#signList_Ok").attr('data-url');
            $("#my_SignImg").attr('src',src);
            $("#add_sign").fadeOut(150)
        })
    }

    //  图片裁剪
    corpUpImgEvt();
    function corpUpImgEvt() {
        var $image = $('.img-container > img'),
            options = {
                aspectRatio: 1 / 1,
                preview: '.img-preview',
                crop: function (data) {}
            };
        $image.on({
            'build.cropper': function (e) {
                console.log(e.type);
            },
            'built.cropper': function (e) {
                console.log(e.type);
            },
            'dragstart.cropper': function (e) {
                console.log(e.type, e.dragType);
            },
            'dragmove.cropper': function (e) {
                console.log(e.type, e.dragType);
            },
            'dragend.cropper': function (e) {
                console.log(e.type, e.dragType);
            },
            'zoomin.cropper': function (e) {
                console.log(e.type);
            },
            'zoomout.cropper': function (e) {
                console.log(e.type);
            }
        }).cropper(options);
        // Methods
        $(document.body).off('click');
        $(document.body).on('click', '[data-method]', function () {
            var data = $(this).data(),
                $target,
                result;
            if (data.method) {
                data = $.extend({}, data); // Clone a new one
                if (typeof data.target !== 'undefined') {
                    $target = $(data.target);
                    if (typeof data.option === 'undefined') {
                        try {
                            data.option = JSON.parse($target.val());
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }
                result = $image.cropper(data.method, data.option);
                if (data.method === 'getCroppedCanvas') {
                    console.log(result)
                    var url = result.toDataURL('image/png',0.5);
                    console.log(url)
                    base64ToUrl(url,function (webUrl) {
                        signatureAdd(webUrl)
                    })
                    // uploadbase64(url)
                }

            }
        });
    }
//    打开关闭
    openEvt();
    function openEvt() {
        $("#cancelLocal").on('click',function () {
            $('#add_sign').stop(true).fadeOut(150);
        })
    }
    //自动上传
    selfMotionUpload();
    function selfMotionUpload() {
        $("#fileLocal").on('change',function () {
            uploadLocalFile();
            var URL = window.URL || window.webkitURL,
                blobURL;
            var $image = $('.img-container > img')
            var files = this.files, file;
            var name = files[0].name;
            $("#file_Name").html(name)
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        URL.revokeObjectURL(blobURL); // Revoke when load complete
                    }).cropper('reset', true).cropper('replace', blobURL);
                }
            }
        });

    }
//    上传
    function uploadLocalFile() {
        var Url = "/upload2";
        var formDom = "#formLocal";
        var fileDom = "#fileLocal";
        uploadEvt(Url,formDom,fileDom,function (data) {
            $("#img-corp").attr('src',data.data.urls[0]);
            $("#formLocal").attr('data-header',data.sessionId);
            corpUpImgEvt();
        })
    }



    //base64上传后获取url
    function base64ToUrl(url,fun) {
        var Url = '/upload4';
        var SubData = {};
        SubData.phone = window.localStorage.getItem('c_pid');
        SubData.url = url
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                var this_Url = res.data.urls[0];
                fun(this_Url);
            })
        })
    }


//    添加签章
    function signatureAdd(url) {
        var Url = '/signatureAdd';
        var SubData = {}
        SubData.url = url;
        echo.ajax.post(Url,SubData,function (res) {
            echo.ajax.callback(res,function () {
                layer.msg('添加成功');
                $("#my_SignImg").attr('src',url);
                signatureInfo();
                $('#add_sign').stop(true).fadeOut(150);
            })
        })
    }

})
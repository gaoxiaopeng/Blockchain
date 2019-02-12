/**
 * Created by Echonessy on 2018/11/29.
 */
init()
//    初始化拖拽缩放
function init() {
    var LeftHtml = $('#LeftBox').html();
    $( "#MainBox .Box" ).resizable({
        aspectRatio: 1 / 1,
        maxHeight: 250,
        maxWidth: 350,
        minHeight: 20,
        minWidth: 20,
        ghost: true,
    });
    //删除当前签名
    $('.close').on('click',function () {
        $(this).parent('.Box').remove()
    })
    //拖拽
    $(".Box").draggable({
        scroll: false,
        stop: function(event, ui) {
            var thisDom = ui.helper;
            var thisDomL = ui.position.left + $('#SignBox').offset().left - $('#MainBox').offset().left;
            var thisDomT = ui.position.top + $('#SignBox').offset().top - $('#MainBox').offset().top;
            if($(thisDom[0]).attr('data-in') != 'true') {
                thisDom[0].style.left = thisDomL - 2 + 'px'; //1 为边框宽度
                thisDom[0].style.top = thisDomT - 1 + 'px';//1 为边框宽度
                $(thisDom[0]).attr('data-in','true');
                var close = '<i class="close"></i>';
                $(thisDom[0]).append(close);
                $('#DragBox').append($(thisDom[0]));
                var dragSrc = $(thisDom[0]).find('img').attr('src');
                $('#SignBox').html(initLeftBox(dragSrc));
            }
            init();
        }
    });
}
//    还原左侧Dom
function initLeftBox(dragSrc) {
    var Html = '';
    Html += '<div class="Box" >';
    Html += '<img src="'+dragSrc+'"  class="" alt="">'
    Html += '</div>';
    return Html;
}
//    创建canvas数据坐标系
function create() {
    var arr = [];
    for(var i=0;i<$('#MainBox .Box').length;i++) {
        var thisBox = $('#MainBox .Box').eq(i);
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
    createCanvas(arr)
}
//    合并canvas
function createCanvas(arr) {
    var base64 = [];
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var bw = $('#bac').width();
    var bh = $('#bac').height();
    canvas.width = bw;
    canvas.height = bh;
    var image=new Image();
    image.src=$('#bac').attr('src');
    image.onload=function(){
        ctx.drawImage(image,0,0,bw,bh);
        $.each(arr,function (i,obj) {
            var signImg=new Image();
            signImg.src = obj.src;
            signImg.onload=function(){
                ctx.drawImage(signImg,obj.l,obj.t,obj.w,obj.h);
                base64.push(canvas.toDataURL("image/jpeg",1));
                if(base64.length == arr.length) {
                    funCallBack(base64[base64.length-1])
                }
            }
        })
    }
}
//    合并后回调
function funCallBack(src) {
    var Html = '';
    Html += '<img src="'+src+'"  alt="">';
    $('#Result').html(Html);
}
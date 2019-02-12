/**
 * Created by Echonessy on 2018/12/12.
 */
var canvas,board,img;
canvas = document.getElementById('myCanvas');
img= document.getElementById('img');
var screen = $('#app_Content').width();
canvas.height = screen;
canvas.width = screen;
board = canvas.getContext('2d');
var mousePress = false;
var last = null;
function beginDraw(){
    mousePress = true;
}
function drawing(event){
    event.preventDefault();
    if(!mousePress)return;
    var xy = pos(event);
    if(last!=null){
        board.beginPath();
        board.moveTo(last.x,last.y);
        board.lineTo(xy.x,xy.y);
        board.stroke();
    }
    last = xy;

}

function endDraw(event){
    mousePress = false;
    event.preventDefault();
    last = null;
}

function pos(event){
    var x,y;
    var pot = $("#myCanvas").position().top;
    if(isTouch(event)){
        x = event.touches[0].pageX;
        y = event.touches[0].pageY - pot;
    }else{
        x = event.offsetX+event.target.offsetLeft;
        y = event.offsetY+event.target.offsetTop - pot;
    }
    return {x:x,y:y};
}
function isTouch(event){
    var type = event.type;
    if(type.indexOf('touch')>=0){
        return true;
    }else{
        return false;
    }
}

function save(){
    //base64
    var dataUrl = canvas.toDataURL();
    img.src = dataUrl;
}


function clean(){
    board.clearRect(0,0,canvas.width,canvas.height);
}

board.lineWidth = 3;
board.strokeStyle="#000";
canvas.onmousedown = beginDraw;
canvas.onmousemove = drawing;
canvas.onmouseup = endDraw;
canvas.addEventListener('touchstart',beginDraw,false);
canvas.addEventListener('touchmove',drawing,false);
canvas.addEventListener('touchend',endDraw,false);

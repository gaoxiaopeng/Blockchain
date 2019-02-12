//添加签章---手绘
	
	
	    var mousePressed = false;
	    var lastX, lastY;
	    var ctx = document.getElementById('myCanvas').getContext("2d");
	    var c = document.getElementById("myCanvas");
	    //		console.log(c)
	    //		console.log(c2)
	    var control = document.getElementsByClassName("control")[0];
	    var saveimgs = document.getElementsByClassName("saveimgs")[0];
	 
	    window.onload = function(){
	        InitThis();
	    }
	 
	    function saveImageInfo(){
	        var url = c.toDataURL("image/png");
	        base64ToUrl(url);
	    }
		
		
		 //base64上传后获取url
		function base64ToUrl(url) {
		    var Url = '/upload4';
		    var SubData = {};
		    SubData.phone = $("#sendPhone").html();
		    SubData.url = url
		    echo.ajax.post(Url,SubData,function (res) {
		        echo.ajax.callback(res,function () {
		            var this_Url = res.data.urls[0];//签名地址
		            signatureAdd(this_Url);//    添加签章
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
	                 layer.msg('添加成功',function(){
						  $("#canvasDrow").fadeOut(150);
						  signatureInfo();//刷新欠账列表
					 });
	                
	             })
	         })
	     }
	 
	    var selected1,selected2;
	    function aaa(){
	        var sel = document.getElementById('selWidth');
	        var value = sel.selectedIndex;
	        return selected1 = sel[value].value;
	    }
	    function aaa2(){
	        var sel2 = document.getElementById('selColor');
	        var value = sel2.selectedIndex;
	        return selected2 = sel2[value].value;
	    }
	 
	    function InitThis() {
	//			触摸屏
	        c.addEventListener('touchstart', function (event) {
	            console.log(1)
	            if (event.targetTouches.length == 1) {
	                event.preventDefault();// 阻止浏览器默认事件，重要
	                var touch = event.targetTouches[0];
	                mousePressed = true;
	                Draw(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, false);
	            }
	 
	        },false);
	 
	        c.addEventListener('touchmove', function (event) {
	            console.log(2)
	            if (event.targetTouches.length == 1) {
	                event.preventDefault();// 阻止浏览器默认事件，重要
	                var touch = event.targetTouches[0];
	                if (mousePressed) {
	                    Draw(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, true);
	                }
	            }
	 
	        },false);
	 
	        c.addEventListener('touchend', function (event) {
	            console.log(3)
	            if (event.targetTouches.length == 1) {
	                event.preventDefault();// 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
	//      			var touch = event.targetTouches[0];
	                mousePressed = false;
	            }
	        },false);
	        /*c.addEventListener('touchcancel', function (event) {
	            console.log(4)
	            mousePressed = false;
	        },false);*/
	 
	 
	 
	//		   鼠标
	        c.onmousedown = function (event) {
	            mousePressed = true;
	            Draw(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, false);
	        };
	 
	        c.onmousemove = function (event) {
	            if (mousePressed) {
	                Draw(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
	            }
	        };
	 
	        c.onmouseup = function (event) {
	            mousePressed = false;
	        };
	    }
	 
	    function Draw(x, y, isDown) {
	        if (isDown) {
	            ctx.beginPath();
	            ctx.strokeStyle = selected2;
	            ctx.lineWidth = selected1;
	            ctx.lineJoin = "round";
	            ctx.moveTo(lastX, lastY);
	            ctx.lineTo(x, y);
	            ctx.closePath();
	            ctx.stroke();
	        }
	        lastX = x; lastY = y;
	    }
	 
	    function clearArea() {
	        // Use the identity matrix while clearing the canvas
	        ctx.setTransform(1, 0, 0, 1, 0, 0);
	        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	 
	        // 清除签名图片
	        if(saveimgs.getElementsByTagName('span').length >= 1){
	            var clearImg = saveimgs.getElementsByTagName('span')[0];
	            saveimgs.removeChild(clearImg);
	        }
	 
	    }
	
	
/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 *  说明：后台基本效果方法集合
 */

    var ie  = $.browser.msie;
	var ie6 = $.browser.msie && $.browser.version < 7;
    
    //去除IE6滑动时候闪动的BUG
	if(ie6)  document.execCommand("BackgroundImageCache", false, true);   


(function($){
	
	/*
	 * 获取节点正下方5px位置
	 * setShow({      
			hoveNode: '#cityChange',  
			showNode: '#citys'  
		});
	 * 
	 */
    $.setDomPositon = function(params){
		opts = $.extend({
			hoveNode: params.hoveNode,
			showNode: params.showNode
		},params);
		var sd = opts.showNode;
		$(sd).css({position:'absolute'});
		var domHeight = parseInt($(opts.hoveNode).css('height').replace('px','')),  
		    offsets = $(opts.hoveNode).offset(),     
		    lookOffsetLeft = offsets.left,
		    lookOffsetTop = offsets.top + domHeight + 5;    //加上字的行高
		$(sd).css({left:lookOffsetLeft,top:lookOffsetTop}).show();
	};
	
	
	//阻止冒泡事件
	stopEvent = function(e){    
		e = e || window.event;
		if(e.stopPropagation){
			e.stopPropagation(); //HTML DOM Event 对象方法,终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。 
		}else{
			e.cancelBubble = true;  //HTML DOM Event 对象属性,如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true
		}
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;  //阻止Event返回值
		}
	};
	
	
	//数组是否包含某个字符串
	contains = function(a,b){
		if(a.length != undefined){
			for(var i = 0,k = a.length; i < k; i++){    //k放前面计算长度，js效率
				if(a[i] == b) return true;
			}
		}
		return false;
	};
	
	//数组删除元素
	delArray = function(a,b){
		var ret = [];
		if(a.length != undefined){
			for(var i = 0,k = a.length; i < k; i++){    
				if(a[i] != b){
					ret.push(a[i]);   
				}
			}
			a = [];
			a = ret;
			return a;
		}
		return [];
	};
	
	/*
	 * 获取网址URL参数值
	 * @param string
	 * 调用方法：$.urlParam("n")
	 */
	$.urlParam = function(name){
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (!results) { return 0; }
		return results[1] || 0;
	};	
	
	/*
	 * 图片渐入渐出效果
	 * 调用方法：$(".imgs img").imgOpaInOut();
	 */
	$.fn.imgOpaInOut = function(){
		return this.each(function(){
			$(this).fadeTo("fast",0.7);
			$(this).hover(function(){
				$(this).fadeTo("fast",1);
			},function(){
				$(this).fadeTo("fast",0.7);
			})
		})
	};
	
	/*
	 * 平滑滚动到页面某个锚点
	 * 锚点开始   <a href="#ss" id="mail">1</a>
	 * 定位地点  <div id="ss" name="ss">2</div>
	 * 调用方法：$("#mail").mailTo();
	 */
	$.fn.mailTo = function(){
		return this.each(function(){
			$(this).click(function(){
				$("html,body").animate({
					scrollTop: $($(this).attr("href")).offset().top + "px"
				},{
					duration: 500,    //动画时长
					easing: "swing"    //擦除效果
				});
				return false;
			})
		})
	};
	
	/*
	 * 图片预加载
	 * 调用方法：var img1 = $.preLoadImage("images/banjia-0806.jpg","images/banjia-0821.jpg")[1];
		         $("body").append(img1);
	 * 
	 */
	 $.preLoadImage = function(){
	 	var len = arguments.length,cache = [];
	 	if(len == 0) return;
	 	do{
	 		var cacheImage = document.createElement("img");
	 		cacheImage.src = arguments[--len];
	 		cache.push(cacheImage);
	 	}while(len > 0)
	 	return cache;
	 };
	 
	 
	 //右键事件
	 $.fn.extend({
	 	'rightClick':function(fn){
	 		//调用这个方法后将禁止系统的右键菜单
	 		$(document).bind('contextmenu',function(e){
	 			return false;
	 		});
	 		//为这个对象绑定鼠标按下事件
	 		$(this).mousedown(function(e){
	 			if(3 == e.which){
	 				fn();
	 			}
	 		})
	 	}
	 });
	 
		
})(jQuery)


/*
 * 对时间进行格式化,对原生时间类扩展
 * var date = new Date(); 
 * date.format("yyyy-MM-dd hh:mm:ss")
 */
Date.prototype.format = function(format)
{
    var o =
    {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}; 

//对数组删除某个元素的扩展
Array.prototype.del = function(n){
	if(n < 0)
	   return this;
	else
	   return this.slice(0,n).concat(this.slice(n+1,this.length));
};


/*
 * 数组去除重复
 */
Array.prototype.unique = function(){
	if(typeof this === "string"){   //字符串去重复
		var a = {},b = "",c;    //a为hash表
		for(var i =0,k = this.length; i < k; i++){
			c = this.charAt(i);
			if(!a[c]) a[c] = true;
		}
		for(var m in a){
			b += m;
		}
		return b;
	}
	if(this instanceof Array){    //数组去重复
		var a = {},b = [],c;
		for(var i =0,k = this.length; i < k; i++){
		    c = this[i];
		    if(!a[c]) a[c] = true;
		}
		for(var m in a){
			b.push(m);
		}
		return b.sort();   //IE和火狐排序不一致
	}
	return "";
};







 

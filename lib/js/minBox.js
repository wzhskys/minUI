/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 *  说明：遮罩层效果
 */

(function($){
	
	/*
	 * 遮罩层效果--静态弹出弹出框
	 * 提示：指定页面弹出框的调用
	 * 调用方法：$("#bb").minBox({opacity: 70,background: '#666'}); 
	 *          $(".dd").closeMinbox(); 
	 *          closepageOverlays();
	 *          $("#dialogBoxr1").minBox()   不带参数的简单的写法，直接弹出窗口
	 */
	var ie  = $.browser.msie;
	var ie6 = $.browser.msie && $.browser.version < 7;
	
	function ieSelectShow(){
		if(ie){ 
			$('embed, object, select').css({'visibility':'visible'});
			$('embed, object, select',window.parent.document).css({'visibility':'visible'});
			$(".iframes").contents().find('embed, object, select').css({'visibility':'visible'});
		}
	};
	
	function ieSelectHide(){
		if(ie){  
			$('embed').attr('wmode','opaque');
			$('embed, object, select').css({'visibility':'hidden'});   //视频IE6下BUG，遮罩层显示优先级没embed, object, select高
			$('embed',window.parent.document).attr('wmode','opaque');
			$('embed, object, select',window.parent.document).css({'visibility':'hidden'});   
		};
	};
	 
	$.fn.minBox = function(params){
		if(typeof params === 'undefined') params = [];
		opts = $.extend({
			opacity: params.opacity || 30,
			background: params.background || "#e1ebed",
			zIndex: params.zIndex || 5000,
			boxWidth: params.boxWidth,
			boxHeight: params.boxHeight,
			showOverlays: params.showOverlays || true    //是否显示遮罩层
		},params);
		
		return this.each(function(){
			var $s = $(this);
			$s.css({width:opts.boxWidth,height:opts.boxHeight});
			var footerHeight = $('#footerFrame',window.parent.document).height();
			var navsHeight = $('.tabPageHeader',window.parent.document).height();
			var headHeight = $('#topFrame',window.parent.document).height() + footerHeight + navsHeight;  //+页底高度和页头选项卡的高度
			var boxSize = function(){
			    bdWidth = $("body",window.parent.document).width();
		        winHeig = $(window,window.parent.document).height() + headHeight;   //35页头导航条的高度
			    wid = $s.width();
			    heig = $s.height();
			    leftWid = parseInt((bdWidth-wid)/2);    
			    topHeig = parseInt((winHeig-heig)/2);
			};
			boxSize();
			$s.css({position:'fixed','z-index':opts.zIndex+10,left:leftWid,top:topHeig});    //设置弹出框属性定位
			//ie6 时样式调整
			if(ie6){
				topHeig += $(document,window.parent.document).scrollTop();    //+滚动条滚动的高度
	    	    $s.css({position:'absolute',left:leftWid,top:topHeig});
	    	    //$(nodeId)[0]切换到原生js对象
		    	//$s[0].style.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
	    	}
			ieSelectHide(); 
			//遮罩层显示与否设置
			if(opts.showOverlays){
				var pageOverHtml = '<div id="pageOverlays" style="position:absolute;display:none;top:0;left:0;background-color:'+opts.background+';z-index:'+opts.zIndex+';width:'+bdWidth+'px;height:'+winHeig+'px;filter:alpha(opacity='+opts.opacity+');opacity:'+opts.opacity/100+';overflow:hidden;"></div>';
			    $('body',window.parent.document).append(pageOverHtml);  //取框架外的父节点
			    $('#pageOverlays',window.parent.document).show();
			}else{
				$('#pageOverlays',window.parent.document).remove();
			}
			$s.show();
		    $(window).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$('#pageOverlays',window.parent.document).css({width:bdWidth,height:winHeig});
				$s.css({left:leftWid,top:topHeig});
			});
			//首页上弹出框的关闭
			$s.find('.box-close').click(function(){
				$("#pageOverlays").remove();
				$s.closeMinbox();
			});
			//iframe页面里面的弹出框的关闭
			$s.find('.box-close').click(function(){
				$("#pageOverlays",window.parent.document).remove();
				$s.closeMinbox();
			});
		});
		
	};	
	
	//层上层的第二个窗口弹出方法
	$.fn.minBoxTwo = function(params){
		if(typeof params === 'undefined') params = [];
		opts = $.extend({
			opacity: params.opacity || 30,
			background: params.background || "#e1ebed",
			zIndex: params.zIndex || 5100,
			boxWidth: params.boxWidth,
			boxHeight: params.boxHeight,
			showOverlays: params.showOverlays || true    //是否显示遮罩层
		},params);
		
		return this.each(function(){
			var $s = $(this);
			$s.css({width:opts.boxWidth,height:opts.boxHeight});
			var footerHeight = $('#footerFrame',window.parent.document).height();
			var navsHeight = $('.tabPageHeader',window.parent.document).height();
			var headHeight = $('#topFrame',window.parent.document).height() + footerHeight + navsHeight;  //+页底高度和页头选项卡的高度
			var boxSize = function(){
			    bdWidth = $("body",window.parent.document).width();
		        winHeig = $(window,window.parent.document).height() + headHeight;   //35页头导航条的高度
			    wid = $s.width();
			    heig = $s.height();
			    leftWid = parseInt((bdWidth-wid)/2);    
			    topHeig = parseInt((winHeig-heig)/2);
			};
			boxSize();
			$s.css({position:'fixed','z-index':opts.zIndex+10,left:leftWid,top:topHeig});    //设置弹出框属性定位
			//ie6 时样式调整
			if(ie6){
				topHeig += $(document,window.parent.document).scrollTop();    //+滚动条滚动的高度
	    	    $s.css({position:'absolute',left:leftWid,top:topHeig});
	    	    //$(nodeId)[0]切换到原生js对象
		    	//$s[0].style.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
	    	}
			ieSelectHide(); 
			//遮罩层显示与否设置
			if(opts.showOverlays){
				var pageOverHtml = '<div id="pageOverlays2" style="position:absolute;display:none;top:0;left:0;background-color:'+opts.background+';z-index:'+opts.zIndex+';width:'+bdWidth+'px;height:'+winHeig+'px;filter:alpha(opacity='+opts.opacity+');opacity:'+opts.opacity/100+';overflow:hidden;"></div>';
			    $('body',window.parent.document).append(pageOverHtml);  //取框架外的父节点
			    $('#pageOverlays2',window.parent.document).show();
			}else{
				$('#pageOverlays2',window.parent.document).remove();
			}
			$s.show();
		    $(window).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$('#pageOverlays2',window.parent.document).css({width:bdWidth,height:winHeig});
				$s.css({left:leftWid,top:topHeig});
			});
			//首页上弹出框的关闭
			$s.find('.box-close2').click(function(){
				$("#pageOverlays2").remove();
				$s.closeMinbox2();
			});
			//iframe页面里面的弹出框的关闭
			$s.find('.box-close2').click(function(){
				$("#pageOverlays2",window.parent.document).remove();
				$s.closeMinbox2();
			});
			$s.find('.box-max,.box-min').hide();    //层上层的时候，需要隐藏最上层的BOX的缩小和放大效果，以免切换到最小点击底栏框的弹出的框没有遮罩层，2个窗口可以同时操作
		});
		
	};
	
	//等待弹出框
	waitingBox = function(ts){
	    var waitBox = '<div id="waitBox" class="waitBox"><img style="padding-left:10px;padding-top:8px;float:left" src="resources/images/progressing.gif"><font style="float:left;padding-left:10px;padding-top:5px;">正在加载中，请稍候...</font><div class="cb"></div></div>';
	    $('body',window.parent.document).append(waitBox);
	    $('#waitBox',window.parent.document).minBox({});
	    if(ts) setTimeout(waitingClose,ts);
	};
	
	//等待弹出框 - 关闭
	waitingClose = function(){
		$('#waitBox',window.parent.document).remove();
		$("#pageOverlays",window.parent.document).remove();
		ieSelectShow();
	}
	
	$.fn.closeMinbox = function(){    //关闭遮罩层和弹出窗口
		ieSelectShow();
		$("#pageOverlays",window.parent.document).remove();
		return this.each(function(){
			$(this).hide();
		});
	};
	//层上层的关闭方法
	$.fn.closeMinbox2 = function(){    //关闭遮罩层和弹出窗口
		ieSelectShow();
		$("#pageOverlays2",window.parent.document).remove();
		return this.each(function(){
			$(this).hide();
		});
	};
	
	closepageOverlays = function(){    //关闭遮罩层
		ieSelectShow();
		$("#pageOverlays",window.parent.document).remove();
	};
	
	
	/*
	 * 遮罩层效果 --动态信息提示弹出框
	 * 提示：通用弹出框的传参调用
	 * 调用方法：
	 * mixBox({
			opacity: 70,   //可缺省
			background: '#666',    //可缺省
			boxStyle: 'confirm',   // confirm:boxConfirmId和boxConfirmAction不能为空，"感叹号"提醒图片，有确定和取消按钮;  默认是sucess,可缺省
			                          msg: "感叹号"提醒图片，只有确定按钮
			                          error: "叉"提醒图片，只有确定按钮
			                          sucess:  "勾"提醒图片，只有确定按钮
			boxConfirmId: '#actionsub',    //提交表单 id,可缺省
			boxConfirmAction: 'http://127.0.0.1:8020/jqueryWorks/minBox/demo.html#',    //提交表单 action,可缺省
			msgHead: '提示信息',    //可缺省
			msgInfo: '确定删除确？',    //可缺省
			msgConts: '您确定要删除订单号吗，删除后将不能恢复！'    //可缺省
		});
	 */
	mixBox = function(params){
		
		opts = $.extend({
			opacity: params.opacity || 30,
			background: params.background || "#e1ebed",
			zIndex: params.zIndex || 5000,
			showOverlays: params.showOverlays || true,    //是否显示遮罩层
			boxStyle: params.boxStyle || 'defaults',      //弹出框类型
			boxConfirmId: params.boxConfirmId,            //提交表单 id 可缺省
			boxConfirmAction: params.boxConfirmAction,    //提交表单action 可缺省
			boxWidth: params.boxWidth,                    //设置弹出框的宽度
			boxHeight: params.boxHeight,                  //设置弹出框的高度
			func: params.func,                            //调用本页的方法名称 可缺省
			msgHead: params.msgHead || '提示信息',
			msgInfo: params.msgInfo || '操作成功',
			msgConts: params.msgConts || '恭喜您，操作成功！',
			msgClass: 'remind'
		},params);
		    
		    var rnValue = 0;
		    if(opts.boxStyle == 'confirm' || opts.boxStyle == 'msg') {opts.msgClass = 'remind';rnValue = 1}
		    if(opts.boxStyle == 'error') opts.msgClass = 'fail';
		    if(opts.boxStyle == 'sucess' || opts.boxStyle == 'defaults' ) opts.msgClass = 'ok';
		    var appendHtml = 
		    '<div class=\"dialogBox box-pop boxMix\" rel=\"99\"  id=\"box-pop\" style=\"display:none;\">'+
			' 	<div class=\"dialogBoxHeader dialogBoxHeader80\">'+
			'  		<a class=\"box-title\"><s></s><font class=\"box-ft\">'+opts.msgHead+'</font></a>'+
			'  		<span class=\"box-pos\">'+
			'  			<a class=\"box-close\" onclick=\"closeDialog(this)\">close</a>'+
			//'   		<a class=\"box-max\">max</a>'+
			//'   		<a class=\"box-min\">min</a>'+
			'  		</span>'+
			'  	</div>'+
			'  	<div class=\"dialogBoxCont\"><div class=\"box-pop-infos\"><table style=\"text-align:center;margin:0 auto;\"><tr><td><span class='+opts.msgClass+'></span></td><td class=\"box-pop-infosize\">'+opts.msgConts+'</td></tr></table></div></div>'+
			'   <div class=\"box-pop-but\"><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"cancel cancelOnly\" onclick=\"closeDialog(this)\">取消</a><s></s></div><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"queding\" onclick=\"closemixBox1('+opts.boxConfirmId+','+opts.boxConfirmAction+',this)\">确定</a><a class=\"queding quedingnow\" onclick=\"'+opts.func+'(this);\">确定</a><a class=\"queding quedingOnly\" onclick=\"closeDialog(this)\">确定</a><s></s></div></div>'+
			'  	<div class=\"dialogBoxFooter\"></div>'+
			'  	<div class=\"dialogBoxHeader_l\"></div>'+
			'  	<div class=\"dialogBoxHeader_r\"></div>'+
			'  	<div class=\"dialogBoxHeader_b\"></div>'+
			'  	<div class=\"dialogBoxHeader_t\"></div>'+
			' 	<div class=\"dialogbottom undb\"></div>'+
			'</div>';
		    //$('body',window.parent.document).append('<div class="box-pop" id="box-pop" style="display:none"><ul id="box-pop-ul" class="box-pop-ul"><li class="fl">'+opts.msgHead+'</li><li class="fr"><a class="closeBox" onclick="closemixBox()"> </a></li></ul><div class="c2"><table style="margin:0 auto;text-align:center"><tr><td><span class='+opts.msgClass+'> </span></td><td>'+opts.msgInfo+'</td></tr></table></div><p>'+opts.msgConts+'</p><div class="box-pop-but"> <a class="queding" onclick="closemixBox1('+rnValue+')"> </a><a class="cancel" onclick="closemixBox()"> </a>  </div></div>')
			if(!$('#box-pop')[0]){
				$('body').append(appendHtml);
			}else{
				$('#box-pop').remove();
				$('body').append(appendHtml);
			}
			if(opts.boxStyle == 'error' || opts.boxStyle == 'sucess' || opts.boxStyle == 'defaults' || opts.boxStyle == 'msg') $('.cancelOnly',window.parent.document).parent().remove();
			$('#box-pop').find('.box-pop-infos').css({'margin-top':(opts.boxHeight-60-10)/2});
			if(opts.func){    //调用本页的方法
				$(".boxMix").find(".queding").hide();
				$(".quedingnow").show();
				//把子iframe里面的JS加入到首页的head里面
				//var scriptName = document.createElement('script');
				//scriptName.type='text/javascript';
				//scriptName.src='../../minUI/lib/minUI/'+opts.jsName;
				//$('head',window.parent.document)[0].appendChild(scriptName);
				
			}else if(opts.boxConfirmAction){    //调用网络路径的方法
				$(".quedingnow").hide();
			}else{    //不调用方，默认的点击关闭方法
				$(".boxMix").find(".queding").hide();
				$(".quedingOnly").show();
			}
			//调用遮罩层
			//$('#box-pop').minBox({
				//showOverlays: opts.showOverlays,
				//boxWidth: opts.boxWidth,
				//boxHeight: opts.boxHeight
			//});
			if(!$('#box-pop')[0]) $('body').append(appendHtml);
			var $s = $('#box-pop');
			//$s.css({width:opts.boxWidth,height:opts.boxHeight});
			var boxHeadHeight = $('#box-pop').find('.dialogBoxHeader').height();
			var boxSize = function(){
			    bdWidth = $('body').width();  
			    docHeig = $(document,window.parent.document).height(),
		        winHeig = $(window).height();   //减去头尾的高度
			    wid = $s.width();
			    heig = $s.height();
			    leftWid = parseInt((bdWidth-opts.boxWidth)/2) - 83;  //减去左侧菜单的宽度    
			    topHeig = parseInt((winHeig-opts.boxHeight)/2);  
			};
			boxSize();
			$s.css({position:'fixed','z-index':opts.zIndex+10,left:leftWid,top:topHeig,width:opts.boxWidth,height:opts.boxHeight + boxHeadHeight});    //设置弹出框属性定位
			$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight-boxHeadHeight-3});
			//ie6 时样式调整
			if(ie6){
		    	topHeig += $(document,window.parent.document).scrollTop();    //+滚动条滚动的高度
		    	$s.css({position:'absolute',left:leftWid,top:topHeig});
	    	}
		    ieSelectHide();
			//遮罩层设置
			var pageOverHtml = '<div id="pageOverlays" style="position:absolute;display:none;top:0;left:0;background-color:'+opts.background+';z-index:'+opts.zIndex+';width:'+bdWidth+'px;height:'+winHeig+'px;filter:alpha(opacity='+opts.opacity+');opacity:'+opts.opacity/100+';overflow:hidden;"></div>';
		    $('body').append(pageOverHtml);    //隐藏，添加后显示
		    $('#pageOverlays').show();
			$('#box-pop').show();
		    $(window,window.parent.document).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$('#pageOverlays').css({width:bdWidth,height:winHeig});
				$s.css({left:leftWid,top:topHeig});
			});
			
	};
	
	//对话窗口右上角关闭
    closeDialog = function(s){
  	   $(s).parent().parent().parent().hide();
  	   if($('.windowOver')) $('.windowOver').remove();    //判断拖动层的背景存在的时候，关闭时候隐藏
       if($('#pageOverlays')) $('#pageOverlays').remove();    //判断拖动层的背景存在的时候，关闭时候隐藏
       var terlt = $(s).parent().parent().parent().attr('rel');
	   $('.toMinMoreUl li').each(function(){
     	  var rels = $(this).attr('rel');
     	  if(rels == terlt) $(this).remove();
       });
       ieSelectShow();
	   bomRemoveFun();
	   retLi = delArray(retLi,$(s).parent().parent().parent().attr('rel'));
    };
	
	closemixBox = function(){
		ieSelectShow();
		$("#pageOverlays",window.parent.document).remove();
		$("#box-pop",window.parent.document).remove();
	};
	
	//关闭子iframe 里面的弹出窗口和背景层
	closemixBoxChild = function(){
		ieSelectShow();
		$("#pageOverlays").remove();
		$("#box-pop").remove();
	};
	
	closemixBox1 = function(a,b,c){  
		ieSelectShow();
		$("#pageOverlays",window.parent.document).remove();
		$("#box-pop",window.parent.document).remove();
		if(a && b){
			if(opts.boxConfirmId && opts.boxConfirmAction){
				$(opts.boxConfirmId).attr('action',opts.boxConfirmAction);
				$(opts.boxConfirmId).submit();
			};
		};
		closeDialog(c);    //关闭页底的标签
	};
	
	
	/*
	 * 遮罩层效果 --动态插入指定的弹出框 -- 弹出本地方法
	 * v1.0
	 * 
	 * 提示：通用弹出框的传参调用
	 * 调用方法：$mixBox({
	 * 	            msgId: '#peop-load',
	 *              msgHead: '提示信息',    //可缺省
					opacity: 70,   //可缺省
					background: '#666'    //可缺省
					
				});
	 */
	var _rel = 100;
	mixBoxr = function(params){
		opts = $.extend({
			msgId: params.msgId,                         //要插入的HTML的父节点
			msgHead: params.msgHead || '提示信息',        //头部的提示信息
			boxConfirmId: params.boxConfirmId,           //提交表单 id
			boxConfirmAction: params.boxConfirmAction,   //提交表单action
			opacity: params.opacity || 30,               //遮罩层的透明度
			background: params.background || "#e1ebed",  //遮罩层的背景颜色
			zIndex: params.zIndex || 5000,               //层级指数
			boxWidth: params.boxWidth,                   //设置弹出框的宽度
			boxHeight: params.boxHeight,                 //设置弹出框的高度
			btnShow: params.btnShow || true,             //判断弹出框底部是否显示"确定"和"取消"按钮
			resizeShow: params.resizeShow || true,       //缩小和放大按钮是否显示
			func: params.func,
			showOverlays: params.showOverlays || true    //是否显示遮罩层
		},params);
		    opts.boxWidth = opts.boxWidth || msgWidth ;       //没传参，默认设置成要插入的弹出框的宽度
			opts.boxHeight =  opts.boxHeight || msgHeight;    //没传参，默认设置成要插入的弹出框的高度
		    var footerHeight = $('#footerFrame',window.parent.document).height();
			var navsHeight = $('.tabPageHeader',window.parent.document).height();
			var headHeight = $('#topFrame',window.parent.document).height() + footerHeight + navsHeight;  //+页底高度和页头选项卡的高度
		    var msgConts = $('#'+ opts.msgId).clone(true).html();
			var msgWidth = $('#'+ opts.msgId).width();
			var msgHeight = $('#'+ opts.msgId).height();
			var rnValue = 0;
		    //$(opts.msgId).remove();
		    _rel++;
		    //删除掉页面上的原来的需要弹出的节点
		    $('#'+ opts.msgId).remove();
		    var appendHtml = 
		    '<div class=\"dialogBox\" rel='+_rel+'  id=\"box-pop2\" style=\"display:none;\">'+
			' 	<div class=\"dialogBoxHeader boxHeader\">'+
			'  		<a class=\"box-title\"><s></s><font class=\"box-ft\">'+opts.msgHead+'</font></a>'+
			'  		<span class=\"box-pos\">'+
			'  			<a class=\"box-close\"  onclick=\"closeDialog(this)\">close</a>'+
			'  		</span>'+
			'  	</div>'+
			'  	<div class=\"dialogBoxCont\">'+msgConts+'</div>'+
			'   <div class=\"box-pop-but\"><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"cancel\" onclick=\"closeDialog(this)\">取消</a><s></s></div><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"queding\" onclick=\"'+opts.func+'(this)\">确定</a><s></s></div></div>'+
			'  	<div class=\"dialogBoxFooter\"></div>'+
			'  	<div class=\"dialogBoxHeader_l\"></div>'+
			'  	<div class=\"dialogBoxHeader_r\"></div>'+
			'  	<div class=\"dialogBoxHeader_b\"></div>'+
			'  	<div class=\"dialogBoxHeader_t\"></div>'+
			' 	<div class=\"dialogbottom undb\"></div>'+
			'</div>';
		    //$('body',window.parent.document).append('<div class="box-pop2" id="box-pop2" style="display:none"><div id="box-pop2-ul" class="box-pop2-ul"><span class="box-pop2-span1" style="padding-left:10px;line-height:25px;">'+opts.msgHead+'</span><span class="box-pop2-span2"><a class="closeBox" style="cursor:pointer" onclick="closemixBox2()"> </a></span></div><div class="box-pop-allCont" id="box-pop-allCont">'+msgConts+'</div></div>')
			if(!$('#box-pop2')[0]) $('body').append(appendHtml);
			var $s = $('#box-pop2');
			//$s.css({width:opts.boxWidth,height:opts.boxHeight});
			var boxHeadHeight = $('#box-pop2').find('.dialogBoxHeader').height();
			var boxSize = function(){
			    bdWidth = $('body').width();  
			    docHeig = $(document,window.parent.document).height(),
		        winHeig = $(window).height();   //减去头尾的高度
			    wid = $s.width();
			    heig = $s.height();
			    leftWid = parseInt((bdWidth-opts.boxWidth)/2) - 83;  //减去左侧菜单的宽度    
			    topHeig = parseInt((winHeig-opts.boxHeight)/2);  
			};
			boxSize();
			$s.css({position:'fixed','z-index':opts.zIndex+10,left:leftWid,top:topHeig,width:opts.boxWidth,height:opts.boxHeight + boxHeadHeight});    //设置弹出框属性定位
			$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight-boxHeadHeight-3});
			//判断是否带下面的按钮
			if(!opts.btnShow){
				$s.find('.box-pop-but').hide();
				$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight});
			};
			//是否带缩小和放大
			//if(!opts.resizeShow){
				//$s.find('.box-max,.box-min,.dialogbottom').hide();
			//}else{
				//$("#box-pop2").dialogDragParent();     //带放大或缩小功能的时候要加上这个拖动效果 
			//}
			//ie6 时样式调整
			if(ie6){
		    	topHeig += $(document,window.parent.document).scrollTop();    //+滚动条滚动的高度
		    	$s.css({position:'absolute',left:leftWid,top:topHeig});
		    	//$(nodeId)[0]切换到原生js对象
		    	//$('#box-pop2',window.parent.document)[0].style.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
	    	}
		    ieSelectHide();
			//遮罩层设置
			var pageOverHtml = '<div id="pageOverlays" style="position:absolute;display:none;top:0;left:0;background-color:'+opts.background+';z-index:'+opts.zIndex+';width:'+bdWidth+'px;height:'+winHeig+'px;filter:alpha(opacity='+opts.opacity+');opacity:'+opts.opacity/100+';overflow:hidden;"></div>';
		    $('body').append(pageOverHtml);    //隐藏，添加后显示
		    $('#pageOverlays').show();
			$('#box-pop2').show();
		    $(window,window.parent.document).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$('#pageOverlays').css({width:bdWidth,height:winHeig});
				$s.css({left:leftWid,top:topHeig});
			});
	}; 
	
	
	mixBoxrTwo = function(params){
		opts = $.extend({
			msgId: params.msgId,                         //要插入的HTML的父节点
			msgHead: params.msgHead || '提示信息',        //头部的提示信息
			boxConfirmId: params.boxConfirmId,           //提交表单 id
			boxConfirmAction: params.boxConfirmAction,   //提交表单action
			opacity: params.opacity || 30,               //遮罩层的透明度
			background: params.background || "#e1ebed",  //遮罩层的背景颜色
			zIndex: params.zIndex || 5100,               //层级指数
			boxWidth: params.boxWidth,                   //设置弹出框的宽度
			boxHeight: params.boxHeight,                 //设置弹出框的高度
			btnShow: params.btnShow || true,             //判断弹出框底部是否显示"确定"和"取消"按钮
			resizeShow: params.resizeShow || true,               //缩小和放大按钮是否显示
			showOverlays: params.showOverlays || true    //是否显示遮罩层
		},params);
		
		    opts.boxWidth = opts.boxWidth || msgWidth ;       //没传参，默认设置成要插入的弹出框的宽度
			opts.boxHeight =  opts.boxHeight || msgHeight;    //没传参，默认设置成要插入的弹出框的高度
		    var footerHeight = $('#footerFrame',window.parent.document).height();
			var navsHeight = $('.tabPageHeader',window.parent.document).height();
			var headHeight = $('#topFrame',window.parent.document).height() + footerHeight + navsHeight;  //+页底高度和页头选项卡的高度
		    var msgConts = $('#'+ opts.msgId).clone(true).html();
			var msgWidth = $('#'+ opts.msgId).width();
			var msgHeight = $('#'+ opts.msgId).height();
			var rnValue = 0;
		    //$(opts.msgId).remove();
		    _rel++;
		    var appendHtml = 
		    '<div class=\"dialogBox\" rel='+_rel+'  id=\"box-pop22\" style=\"display:none;\">'+
			' 	<div class=\"dialogBoxHeader boxHeader\">'+
			'  		<a class=\"box-title\"><s></s><font class=\"box-ft\">'+opts.msgHead+'</font></a>'+
			'  		<span class=\"box-pos\">'+
			'  			<a class=\"box-close2\" onclick=\"closemixBox22()\">close</a>'+
			'  		</span>'+
			'  	</div>'+
			'  	<div class=\"dialogBoxCont\">'+msgConts+'</div>'+
			'   <div class=\"box-pop-but\"><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"cancel\" onclick=\"closeDialog(this)\">取消</a><s></s></div><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"queding\" onclick=\"closemixBox2('+opts.boxConfirmId+','+opts.boxConfirmAction+',this)\">确定</a><s></s></div></div>'+
			'  	<div class=\"dialogBoxFooter\"></div>'+
			'  	<div class=\"dialogBoxHeader_l\"></div>'+
			'  	<div class=\"dialogBoxHeader_r\"></div>'+
			'  	<div class=\"dialogBoxHeader_b\"></div>'+
			'  	<div class=\"dialogBoxHeader_t\"></div>'+
			' 	<div class=\"dialogbottom undb\"></div>'+
			'</div>';
		    //$('body',window.parent.document).append('<div class="box-pop2" id="box-pop2" style="display:none"><div id="box-pop2-ul" class="box-pop2-ul"><span class="box-pop2-span1" style="padding-left:10px;line-height:25px;">'+opts.msgHead+'</span><span class="box-pop2-span2"><a class="closeBox" style="cursor:pointer" onclick="closemixBox2()"> </a></span></div><div class="box-pop-allCont" id="box-pop-allCont">'+msgConts+'</div></div>')
			if(!$('#box-pop22')[0]) $('body').append(appendHtml);
			var $s = $('#box-pop22');
			//$s.css({width:opts.boxWidth,height:opts.boxHeight});
			var boxHeadHeight = $('#box-pop22').find('.dialogBoxHeader').height();
			var boxSize = function(){
			    bdWidth = $('body').width();  
			    docHeig = $(document,window.parent.document).height(),
		        winHeig = $(window).height() - 70;   //减去头尾的高度
			    wid = $s.width();
			    heig = $s.height();
			    leftWid = parseInt((bdWidth-opts.boxWidth)/2) - 83;  //减去左侧菜单的宽度    
			    topHeig = parseInt((winHeig-opts.boxHeight)/2);  
			};
			boxSize();
			$s.css({position:'fixed','z-index':opts.zIndex+10,left:leftWid,top:topHeig,width:opts.boxWidth,height:opts.boxHeight + boxHeadHeight});    //设置弹出框属性定位
			$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight-boxHeadHeight-3});
			//判断是否带下面的按钮
			if(!opts.btnShow){
				$s.find('.box-pop-but').hide();
				$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight});
			};
			//是否带缩小和放大
			//if(!opts.resizeShow){
				//$s.find('.box-max,.box-min,.dialogbottom').hide();
			//}else{
				//$("#box-pop22").dialogDragParent();     //带放大或缩小功能的时候要加上这个拖动效果 
			//}
			//ie6 时样式调整
			if(ie6){
		    	topHeig += $(document,window.parent.document).scrollTop();    //+滚动条滚动的高度
		    	$s.css({position:'absolute',left:leftWid,top:topHeig});
		    	//$(nodeId)[0]切换到原生js对象
		    	//$('#box-pop2',window.parent.document)[0].style.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
	    	}
		    ieSelectHide();
			//遮罩层设置
			var pageOverHtml = '<div id="pageOverlays2" style="position:absolute;display:none;top:0;left:0;background-color:'+opts.background+';z-index:'+opts.zIndex+';width:'+bdWidth+'px;height:'+winHeig+'px;filter:alpha(opacity='+opts.opacity+');opacity:'+opts.opacity/100+';overflow:hidden;"></div>';
		    $('body').append(pageOverHtml);    //隐藏，添加后显示
		    $('#pageOverlays2').show();
			$('#box-pop22').show();
		    $(window,window.parent.document).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$('#pageOverlays2').css({width:bdWidth,height:winHeig});
				$s.css({left:leftWid,top:topHeig});
			});
	}; 
	
	//closemixBox1 = function(){
		//ieSelectShow();
		//$("#pageOverlays",window.parent.document).remove();
		//$("#box-pop2",window.parent.document).remove();
	//};	
	//弹出框包含页面
	mixCloud = function(params){
		opts = $.extend({
			msgHead: params.msgHead || '提示信息',        //头部的提示信息
			boxConfirmId: params.boxConfirmId,           //提交表单 id
			boxConfirmAction: params.boxConfirmAction,   //提交表单action
			opacity: params.opacity || 30,               //遮罩层的透明度
			background: params.background || "#fff",     //遮罩层的背景颜色
			zIndex: params.zIndex || 5000,               //层级指数
			boxWidth: params.boxWidth,                   //设置弹出框的宽度
			boxHeight: params.boxHeight,                 //设置弹出框的高度
			btnShow: params.btnShow || true,             //判断弹出框底部是否显示"确定"和"取消"按钮
			resizeShow: params.resizeShow || true,       //缩小和放大按钮是否显示
			func: params.func,                           //方法名称
			pageUrl: params.pageUrl,                     //页面的路径地址
			showOverlays: params.showOverlays || true    //是否显示遮罩层
		},params);
		    opts.boxWidth = opts.boxWidth || msgWidth ;       //没传参，默认设置成要插入的弹出框的宽度
			opts.boxHeight =  opts.boxHeight || msgHeight;    //没传参，默认设置成要插入的弹出框的高度
		    var footerHeight = $('#footerFrame',window.parent.document).height();
			var navsHeight = $('.tabPageHeader',window.parent.document).height();
			var headHeight = $('#topFrame',window.parent.document).height() + footerHeight + navsHeight;  //+页底高度和页头选项卡的高度
		    //var msgConts = $('#'+ opts.msgId).clone(true).html();
			var msgWidth = $('#'+ opts.msgId).width();
			var msgHeight = $('#'+ opts.msgId).height();
			var rnValue = 0;
		    //$(opts.msgId).remove();
		    _rel++;
		    var appendHtml = 
		    '<div class=\"dialogBox\" rel='+_rel+'  id=\"box-pop2\" style=\"display:none;\">'+
			' 	<div class=\"dialogBoxHeader boxHeader\">'+
			'  		<a class=\"box-title\"><s></s><font class=\"box-ft\">'+opts.msgHead+'</font></a>'+
			'  		<span class=\"box-pos\">'+
			'  			<a class=\"box-close\"  onclick=\"closeDialog(this)\">close</a>'+
			'  		</span>'+
			'  	</div>'+
			'  	<div class=\"dialogBoxCont cloudCont\"></div>'+
			'   <div class=\"box-pop-but\"><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"cancel\" onclick=\"closeDialog(this)\">取消</a><s></s></div><div class=\"box-pop-but-qx\" onmouseover=\"bttonHover(this)\" onmouseout=\"bttonLever(this)\"><a class=\"queding\" onclick=\"'+opts.func+'(this)\">确定</a><s></s></div></div>'+
			'  	<div class=\"dialogBoxFooter\"></div>'+
			'  	<div class=\"dialogBoxHeader_l\"></div>'+
			'  	<div class=\"dialogBoxHeader_r\"></div>'+
			'  	<div class=\"dialogBoxHeader_b\"></div>'+
			'  	<div class=\"dialogBoxHeader_t\"></div>'+
			' 	<div class=\"dialogbottom undb\"></div>'+
			'</div>';
		    //$('body',window.parent.document).append('<div class="box-pop2" id="box-pop2" style="display:none"><div id="box-pop2-ul" class="box-pop2-ul"><span class="box-pop2-span1" style="padding-left:10px;line-height:25px;">'+opts.msgHead+'</span><span class="box-pop2-span2"><a class="closeBox" style="cursor:pointer" onclick="closemixBox2()"> </a></span></div><div class="box-pop-allCont" id="box-pop-allCont">'+msgConts+'</div></div>')
			if(!$('#box-pop2')[0]) $('body').append(appendHtml);
			$('.cloudCont').empty().append('<div class="navContItem"><iframe src='+opts.pageUrl+'  scrolling="no" class="boxIframes" target="_self" frameborder="0" bordercolor="none"  marginheight="0" marginwidth="0"> </iframe></div>')
			$('.boxIframes').css({width:opts.boxWidth,height:opts.boxHeight-32})
			var $s = $('#box-pop2');
			//$s.css({width:opts.boxWidth,height:opts.boxHeight});
			var boxHeadHeight = $('#box-pop2').find('.dialogBoxHeader').height();
			var boxSize = function(){
			    bdWidth = $('body').width();  
			    docHeig = $(document,window.parent.document).height(),
		        winHeig = $(window).height();   //减去头尾的高度
			    wid = $s.width();
			    heig = $s.height();
			    leftWid = parseInt((bdWidth-opts.boxWidth)/2) - 83;  //减去左侧菜单的宽度    
			    topHeig = parseInt((winHeig-opts.boxHeight)/2);  
			};
			boxSize();
			$s.css({position:'fixed','z-index':opts.zIndex+10,left:leftWid,top:topHeig,width:opts.boxWidth,height:parseInt(opts.boxHeight) + parseInt(boxHeadHeight)});    //设置弹出框属性定位
			$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight-boxHeadHeight-3});
			//判断是否带下面的按钮
			if(!opts.btnShow){
				$s.find('.box-pop-but').hide();
				$s.find('.'+ opts.msgId).css({width:'100%',height:opts.boxHeight});
			};
			//是否带缩小和放大
			//if(!opts.resizeShow){
				//$s.find('.box-max,.box-min,.dialogbottom').hide();
			//}else{
				//$("#box-pop2").dialogDragParent();     //带放大或缩小功能的时候要加上这个拖动效果 
			//}
			//ie6 时样式调整
			if(ie6){
		    	topHeig += $(document,window.parent.document).scrollTop();    //+滚动条滚动的高度
		    	$s.css({position:'absolute',left:leftWid,top:topHeig});
		    	//$(nodeId)[0]切换到原生js对象
		    	//$('#box-pop2',window.parent.document)[0].style.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
	    	}
		    ieSelectHide();
			//遮罩层设置
			var pageOverHtml = '<div id="pageOverlays" style="position:absolute;display:none;top:0;left:0;background-color:'+opts.background+';z-index:'+opts.zIndex+';width:'+bdWidth+'px;height:'+winHeig+'px;filter:alpha(opacity='+opts.opacity+');opacity:'+opts.opacity/100+';overflow:hidden;"></div>';
		    $('body').append(pageOverHtml);    //隐藏，添加后显示
		    $('#pageOverlays').show();
			$('#box-pop2').show();
		    $(window,window.parent.document).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$('#pageOverlays').css({width:bdWidth,height:winHeig});
				$s.css({left:leftWid,top:topHeig});
			});
	}; 
	
	closemixBox2 = function(a,b,c){  
		ieSelectShow();
		$("#pageOverlays").remove();
		$("#box-pop2").remove();
		if(a && b){
			$(opts.boxConfirmId).attr('action',opts.boxConfirmAction);
			$(opts.boxConfirmId).submit();
		};
		closeDialog(c);    //关闭页底的标签
		//关闭弹出窗口后刷新主体iframe里面的页面
		// $('#leftFrame .tree-node',window.parent.document).each(function(){
			// var _color = $(this).css('background-color');
			// if(_color == 'rgb(232, 237, 243)'){
				// $(this).click();
			// };
		// });
	};
	
	closemixBox22 = function(a,b,c){  
		ieSelectShow();
		$("#pageOverlays2").remove();
		$("#box-pop22").remove();
		if(a && b){
			$(opts.boxConfirmId).attr('action',opts.boxConfirmAction);
			$(opts.boxConfirmId).submit();
		};
		//关闭弹出窗口后刷新主体iframe里面的页面
		// $('#leftFrame .tree-node',window.parent.document).each(function(){
			// var _color = $(this).css('background-color');
			// if(_color == 'rgb(232, 237, 243)'){
				// $(this).click();
			// };
		// });
	};
	
	
	
	/*
	 * 下拉提示效果 --动态插入弹出框下拉提示
	 * 提示：通用弹出框的传参调用
	 * 调用方法：boxSlide({
					boxStyle: 'tasks',     //scuess：成功  
					                       //error：错误
					                       //tells：警告
					                       //tasks：任务
					msgHead: '错误',
					msgConts: '提交失败'
				});
	 */
	boxSlide = function(params){
		
		opts = $.extend({
			boxStyle: params.boxStyle || 'defaults',     //弹出框类型
			msgHead: params.msgHead || '提示信息',
			borderStyle: 'message-info-bor',
			msgStyle: params.msgStyle || 'message-scuess',
			msgConts: params.msgConts || '恭喜您，操作成功！'
		},params);
		    //console.log(opts);
		    switch(opts.boxStyle){
		    	case 'error':
		    	    opts.msgStyle = 'message-error';
		    	    opts.borderStyle = 'message-info-bor1';
		    	    break;
		    	case 'tells':
		    	    opts.msgStyle = 'message-tells';
		    	    opts.borderStyle = 'message-info-bor2';
		    	    break;
		    	case 'tasks':
		    	    opts.msgStyle = 'message-tasks';
		    	    break;
		    	case 'defaults':
		    	    opts.msgStyle = 'message-scuess';
		    	    break;
		    }
		    $('body',window.parent.document).append('<div class="message-info undb" id="message-info"><div class='+opts.borderStyle+'><p class="message-info-bora"><span class='+opts.msgStyle+'></span><span class="fl pl5">'+opts.msgHead+'</span></p><div class="cb"></div><p class="message-info-borb">'+opts.msgConts+'</p></div><a class="message-submit" onclick="closeboxSlide()"></a></div>')
			var $s = $('#message-info',window.parent.document);
			var boxSize = function(){
			    bdWidth = $('body',window.parent.document).width();
			    wid = $s.width();
			    leftWid = parseInt((bdWidth-wid)/2-6);    //6(滚动条宽度的一半)
			};
			boxSize();
			$s.css({position:'absolute','z-index':6000,left:leftWid,top:0});    //设置弹出框属性定位
			$('#message-info',window.parent.document).slideDown(200);
		    $(window).resize(function(){    //页面大小变化时弹框位置和背景大小改变
		    	boxSize();
				$s.css({left:leftWid,top:0});
			});
			
			var settime = setTimeout(closeboxSlide,1000);    //移除下拉提示框
			$("#message-info",window.parent.document).hover(function() {
				clearTimeout(settime);
			}, function() {
				settime = setTimeout(closeboxSlide,1000);
			});
	};
	
	closeboxSlide = function(){
		$("#message-info",window.parent.document).slideUp(300,function(){
			$("#message-info",window.parent.document).remove();
		});
	};
	
})(jQuery)

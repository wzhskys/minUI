/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 * 说明：后台框架基本设置
 */

$(document).ready(function(){
	
	//给弹出的对话框加上rel
    $('.dialogBox').each(function(i){
  	    $(this).attr('rel',1000+i);
    });
			
	$(".close").click(function(){
		$("#boxCenter").closeMinbox();
	});
	
    //底部窗口多标签显示，右上角关闭
    bottomClose = function(s,t){
       $(s).parent().remove();
       stopEvent();    //防止事件冒泡 
       var _rel = t;
       retLi = delArray(retLi,_rel);
	   //console.log('sss='+$('.toMinMore li').length);
	   //关闭底部标签的时候，关闭对应的弹出框
	   $('.dialogBox',window.parent.document).each(function(){
     	  var rels = $(this).attr('rel');
     	  if(rels == _rel) {
     	  	$(this).hide();
     	  }
       });
       //retLi = delArray(retLi,_rel);
       bomRemoveFun();
    };
  
    //点击页底下面的标签对应弹出显示对应的对话框
    openParentDialog = function(s){
        $('.dialogBox').each(function(){
      	   var t = $(this).attr('rel');
      	   //虚线窗口移动
      	   if(t == s && $(this).css('display') == 'none'){
      	   	   $(this).show();
      	   }else if(t == s && $(this).css('display') == 'block'){
      	   	   $(this).hide();
      	   }; 
        });
    };
    
    //页底指向的时候改变左侧小块的背景色 -- 兼容IE6
    hoverFuc = function(s){
  	   $(s).find('s').css('background-position','0 -150px');
  	   $(s).css('background-position','-90px -200px');
    };
  
    //页底指向的时候还原左侧小块的背景色 -- 兼容IE6
    outFun = function(s){
  	   $(s).find('s').css('background-position','0 -50px');
  	   $(s).css('background-position','-90px -100px');
    };
    
	//多标签菜单右键下拉弹出框滑动 - 兼容IE6
	$('.showBox li').hover(function(){
		$(this).css('background-color','#b9bad8');
	},function(){
		$(this).css('background-color','#fff');
	});
	
	//页底版权信息点击事件
	$('.bomCopy',window.parent.document).click(function(){
		$("#dialogBoxr5",window.parent.document).minBox();  
		//拖动事件
		$("#dialogBoxr5",window.parent.document).dialogDragParent(); 	});
	
	//左侧菜单效果
	$('.leftFrameHeader').each(function () {    //左侧菜单树默认第一个菜单可见
        $('.leftFrameHeader a').removeClass('leftFrameHeaderDisc').addClass('leftFrameHeaderAdd');
        $('.leftFrameHeader a:first').removeClass('leftFrameHeaderAdd').addClass('leftFrameHeaderDisc');
        $(".accordionContent").find(".tree").hide().eq(0).show();
    });
	
	$('.leftFrameHeader').click(function(){
		$('.leftFrameHeader a').removeClass('leftFrameHeaderDisc').addClass('leftFrameHeaderAdd')
		$(this).find('a').removeClass('leftFrameHeaderAdd').addClass('leftFrameHeaderDisc');
		$(".accordionContent").find(".tree").hide();
		$(this).next().find("ul").eq(0).show();
	});
	$(".tree-parent").click(function(){
		$(this).next().toggle();
	});
	$(".tree-node").click(function(){
		$(".tree-node").css({"background-color":""});
		$(this).css({"background-color":"#E8EDF3"});
	});
	
	//给左侧菜单li加rel属性
	$('.tree li').find('.tree-node').each(function(i){
		var c = 10000 + i;
		$(this).find('a').attr('tabid',c);
		c++;
	});
	
});



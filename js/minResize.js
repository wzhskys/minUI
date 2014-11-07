/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 *  说明：窗口自适应效果
 */

    //页面大小改变左侧菜单和右侧自适应
	$.fn.bindAndExec = function(eventNames, handler){
        this.bind(eventNames, handler).each(handler);
	};
	
    var initial= function(){
		bodyWidth = $(document).width();
		windowWidth = $(window).width();
		windowHeight = $(window).height();
		leftFrameWidth = $('#leftFrame').width();     //左侧菜单栏宽度
		allWidth = windowWidth - leftFrameWidth;    //MAIN主体匡杜
		tabNavHeight = $('.tabPageHeaderNav').height();    //多标签栏高度
		topFrameHeight = $('#topFrame').height();     //页头的高度
		footerHeight = $('.footer').height();    //页底高度
		slideWidth = $('#leftNavSide').width();    //左侧菜单栏缩小后的MIN宽度
		nodeHeight = $('#leftFrame .leftFrameHeader').height();    //左侧菜单栏横条高度
		nodeNum = $('#leftFrame .leftFrameHeader').length + 1;    //左侧菜单栏横条数
		myHeight = windowHeight - nodeNum * nodeHeight - topFrameHeight - footerHeight;    //左侧菜单栏横条下大区域显示块高度
		bodyHeight = windowHeight - topFrameHeight - footerHeight;  //出去页头的高度
	};
	
	function setTimerResize(){
		//初始化函数调用
		initial();
		$("#leftFrame").contents().find(".tree").css({height:myHeight + nodeNum + 1});
		$("#main").contents().find("#rightFrame").css({height:bodyHeight-topFrameHeight - 3 - tabNavHeight});
		$("#leftFrame,#leftNavSide").css({height:bodyHeight});
		$("#leftNavBar").css({height:bodyHeight});
		if($("#leftNavSide").css('display') == 'block'){
			$("#main").css({width:allWidth - slideWidth + leftFrameWidth - 19,height:bodyHeight});
			$('#navPageFrame .iframes').css({width:allWidth - slideWidth + leftFrameWidth - 19,height:bodyHeight - tabNavHeight});
		}else{
			$("#main").css({width:allWidth - 19,height:bodyHeight});
			$('#navPageFrame .iframes').css({width:allWidth - 19,height:bodyHeight - tabNavHeight});
		};
	};
	
	$(window).bindAndExec('resize',setTimerResize);

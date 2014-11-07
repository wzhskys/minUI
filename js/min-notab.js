/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 * 说明：后台框架基本设置  -- 非多标签切换
 */

var ie  = $.browser.msie;
var ie6 = $.browser.msie && $.browser.version < 7;
var retLi = [];    //页底存放标签rel

$(function(){
	
	var widSize = [];    //存放window宽度
	var widSize1 = [];
	var oversize1 = 0;
	var overWid = 0;
	var bodyWidth5 = $(document).width();
	widSize.push(bodyWidth5);
	//框架模块初始值设置
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
	
	initial();    //初始化函数调用
	
	$('#leftFrame,#leftNavSide').css({height:windowHeight - topFrameHeight - footerHeight});    //左侧模块高度设置
	$('.tree').css({height: myHeight + nodeNum + 1});    //左侧树的高度设置
	$('#rightFrame').css({height:windowHeight});    //计算main框架的高度  
	$('#main').css({width:bodyWidth - leftFrameWidth - 19,height:bodyHeight});    //main框架的宽，高度 设置
	$("#main").contents().find("#rightFrame").css({height: windowHeight - footerHeight - tabNavHeight});    //main框架里子页高度设置
	
	//table2列表左侧的线去掉
	$('.reslutTab2 th:first').css({'border-left':'none'});
	$('.reslutTab2 th:last').css({'border-right':'none'});
	$('.reslutTab2 tr').children().css({'border-left':'none'});
	$('.reslutTab2').find('.last').css({'border-right':'none'});
	
	//发布页面高度设置
	rightAllSize= function(){
		if($(".rightAll")[0]){
			var rightNetHeight = windowHeight;    //减去rightAll的padding值高度
			$(".rightAll").css({height:rightNetHeight});
		};
	};
	rightAllSize();
	
	rightAllSize1= function(){
		if($(".rightAll2")[0]){
			var netBottomHeight = $('.netBottom').height();
			var rightNetHeight = windowHeight - netBottomHeight;
			$(".rightAll2").css({height:rightNetHeight});
		};
	};
	rightAllSize1();
	
	//列表滑动点击效果
	$(".reslutTab tr").click(function(){
		$(".reslutTab tr").css({"background-color":""});
		$(this).css({"background-color":"#78C7E5"});
	});
	
	//计算有分页newTable的高度和宽度
	listPageSize = function(){
		if($("#newTable")[0]){
			var netBottomHeight = $('.orderBoxBottom').height();
			var newTableH = $("#newTable").offset().top;
			var bodyHeihtNewtable = windowHeight - newTableH - netBottomHeight -5;  
			$("#newTable").css({height:bodyHeihtNewtable,width:windowWidth});
		    $("#newTable .reslutTab1").css({width:windowWidth - 18});
			$("#page").css({width:windowWidth});  //计算分页的宽度
		};
	};
	listPageSize();
	
	//计算无分页newTable1的高度和宽度  没有分页
	listPageSize1 = function(){
		if($("#newTable1")[0]){
			var newTableH2 = $("#newTable1").offset().top;
			var bodyHeihtNewtable2 = windowHeight - newTableH2 - 2; 
			$("#newTable1").css({height:bodyHeihtNewtable2,width:windowWidth});
			$("#newTable1 .reslutTab1").css({width:windowWidth - 18});
		};
	};
	listPageSize1();
	
	//页面大小改变左侧菜单和右侧自适应
	$.fn.bindAndExec = function(eventNames, handler){
        this.bind(eventNames, handler).each(handler);
	};
	
	var nubTimes = 0; //窗口变化大小的次数
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
		//列表页宽度和高度设置
		listPageSize();
		listPageSize1();
		//发布页宽度和高度设置
		rightAllSize();
		rightAllSize1();
		
	};
	
	$(window).bindAndExec('resize',setTimerResize);
	
	
	//左侧菜单效果
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
	
	//切换城市打开效果
	$('#citysChange').click(function(){
		$.setDomPositon({      
			hoveNode: '#cityChange',  
			showNode: '#citys'  
		});
		$('#citys').css({left:$('#citys').offset().left-$('#citys').width()-10});
	});
	
	//切换城市关闭效果
	$(document).bind('click',function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.id != 'citysChange' && target.id != 'citys'){
			$('#citys',window.parent.document).hide();
		};
	});
	
	var cktrue = false,    //判断左侧菜场收缩后是否点击小图标向右伸展  true:是，点击向右伸展
	    cltrue = false,
	    resizenub = 0,
	    oversize = 0,
	    navnub = 0,
	    lfc = 0;
	//左侧菜单点击滑动,隐藏
	$('.leftFrameHeaderBotton').click(function(){
	    $('#leftFrame').animate({'marginLeft':-leftFrameWidth+'px'}, 0,function(){    //时间设置成0，快速显示右侧的页面块
	    	$('#leftFrame').hide();
	    	$('#leftNavSide').show().css({'marginLeft':-slideWidth+'px'});
	    	//leftSlideShow();
	    	ie6 ? $('#leftNavSide').css({'marginLeft':3+'px'}) : $('#leftNavSide').css({'marginLeft':5+'px'}) ;
		    $('#main').css({width:bodyWidth - slideWidth - 19,height:bodyHeight}); //计算main框架的宽，高度  
	    	setTimerResize();
	    });
	    resizenub = 1;    //1:左侧菜单为收缩状态; 0:左侧菜单为伸展状态
	});
	
	//左侧菜单点击伸展
	$('.leftNavSideDot').click(function(){
		$('#leftNavSide').hide();
		ie6 ? $('#leftFrame').show().css({'marginLeft':3+'px'}) : $('#leftFrame').show().css({'marginLeft':5+'px'}) ;
		setTimerResize();
		resizenub = 0;
		//allWidth = allWidth - (leftFrameWidth - slideWidth);
	})
	
	//页头选项卡右侧点击下拉显示更多页面
	$('.tabPageHeaderMore').click(function(){
		$('.tabPageHeaderMores').show();
	});
	
	//关闭更多页面
	$(document).bind('click',function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.id != 'tabPageHeaderMore'){
			$('.tabPageHeaderMores',window.parent.document).hide();
		}
		$('.showBox',window.parent.document).hide();
	});
	
	//更多页面滑动样式效果
	$('.tabPageHeaderMores li').hover(function() {
		if($(this).attr('class') != 'pageSelectd'){
			$(this).css('background-color','#f0f6f7');
		};
	}, function() {
		if($(this).attr('class') != 'pageSelectd'){
			$(this).css('background-color','#ffffff');
		};
	});
	
	//给左侧菜单li加rel属性
	$('.tree li').find('.tree-node').each(function(i){
		var c = 10000 + i;
		$(this).find('a').attr('tabid',c);
		c++;
	});
	
	//页头选项卡菜单
	$('.tabPageHeaderNavUl li:first').click(function(){
		if($(this).attr('class') != 'selectd'){
			tabClick(0);
		};
	});
	
	var tabidRet = [];    //存放左侧菜单tabid
	
	//左侧树点击动态添加选项卡和页面
	$('#leftFrame .tree-node').click(function(){
		var tabid = $(this).children().attr('tabid');
		$('.tabPageHeaderNavUl li').each(function(){    //获取多标签的tabid数组,没有的增加到数组
			var s = $(this).attr('tabid');
			if(!contains(tabidRet,tabid) && s) 
			    tabidRet.push(s);
		})
		var newRet = [],totalWidth,navFirstWidth,navSecondWidth;
		newRet = tabidRet.unique();    //数组去除重复
		tabidRet = [];
		tabidRet = newRet;
		var tabRel = $('.tabPageHeaderNavUl li').attr('tabid');
		var indexs = $('.tabPageHeaderNavUl li').length;
		var rel = $(this).children().attr('rel');
		var navName = $(this).children().html();    //获取左侧菜单名称
		//判断多标签没有该tabid就增加
		//if(!contains(tabidRet,tabid)){
		    //页面主体增加
		    $('.navPageShow').empty().append('<div class="navContItem" tabid='+tabid+'><iframe src='+rel+' id='+tabid+'  scrolling="no" name='+tabid+' class="iframes" target="_self" frameborder="0" bordercolor="none"  marginheight="0" marginwidth="0"> </iframe></div>')
		    //多标签增加
            $('.tabPageHeaderNavUl').empty().append('<li class="selectd"  tabid='+tabid+' rel='+indexs+'><a><span>'+navName+'</span></a><div class="tabPageHeaderNav-left dotLeftSelectd"></div><div class="tabPageHeaderNav-right dotRightSelectd"></div></li>');
		    $('.navContItem').eq(indexs).show();    //增加后初始主体页面显示
		    setTimerResize();
		    
		//}else{
			//tabidChange(tabid);
		//};
	});
	
	//回首页
	toIndex = function(){
		 $('.navPageShow').empty().append('<div class="navContItem" tabid="10000"><iframe src="right.html" id="10000"  scrolling="no" name="10000" class="iframes" target="_self" frameborder="0" bordercolor="none"  marginheight="0" marginwidth="0"> </iframe></div>')
		 //多标签增加
         $('.tabPageHeaderNavUl').empty().append('<li class="selectd"  tabid="10000"><a class="home"><span><i></i>我的主页</span></a><div class="tabPageHeaderNav-left dotLeftSelectd"></div><div class="tabPageHeaderNav-right dotRightSelectd"></div></li>');
	     setTimerResize();
	};
	
	$('.box-min').hover(function(){
		$(this).css({'background-position':'0 -350px'});
	},function(){
		$(this).css({'background-position':'0 -300px'});
	});
	
	$('.box-max').hover(function(){
		$(this).css({'background-position':'0 -150px'});
	},function(){
		$(this).css({'background-position':'0 -100px'});
	});
	
	//按钮滑动左侧的小点增加背景色
	bttonHover = function(s){
		$(s).find('s').css({'background-position':'0 -101px'});
		$(s).find('a').css({'background-position':'-455px -151px'});
		//$(s).find('.cancel').css({'background-position':'-455px -151px'});
	};
	
	//按钮滑动左侧的小点减少背景色
	bttonLever = function(s){
		$(s).find('s').css({'background-position':'0 -1px'});
		$(s).find('a').css({'background-position':'-455px -51px'});
		//$(s).find('.cancel').css({'background-position':'-455px -51px'});
	};
	
	//ie6左侧菜单滑动BUG修改
	if(ie6){
		$('.tree-node').hover(function(){
			if($(this).css('background-color') != '#e8edf3'){
				 $(this).css({'background-color':'#F5F5F5'});
			};
		},function(){
			if($(this).css('background-color') != '#e8edf3'){
				 $(this).css({'background-color':'#fff'});
			};
		});
	};
	
	//增加删除按钮操作滑动
	$('.rightControlGool li').hover(function(){
		$(this).find('s').show();
		if(ie6)  $(this).css({'background':'url("../resources/images/grid/grid.png")  no-repeat transparent','background-position':'100% -150px'});
	},function(){
		if(ie6)  $(this).css({'background':''});
		$(this).find('s').hide();
	});
	
	if($('.rightTabsMore')[0]){
		$('.rightTabsMore li').click(function(){
		    var _idnex = $(this).index();
		    $('.rightTabsMore li').removeClass().addClass('rightContentTab2');
		    $(this).removeClass().addClass('rightContentTab1');
		    $('.orderShow').hide().eq(_idnex).show();
		});
	};
	
});

    //底部标签全部移除后页底黑色条关闭
    function bomRemoveFun(){
    	if($('.toMinMore li').length == 0){
	   	  $('.toMinMore',window.parent.document).animate({'bottom':'-29px'},200,function(){
		     $('.toMinMore',window.parent.document).hide();
	      });
	      retLi = [];    //清空装载底部标签含rel的数组
	   };
    };


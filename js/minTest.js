/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 *  说明：遮罩层效果
 */

    //测试方法
	function test(){
		
		alert(777);
	};
	
	//调用函数后返回的时候去掉弹出框，并且刷新主体iframe里面的页面  -- 不要删除该方法
	function callbackFunc(){
		//移除弹出框
		$closemixBox();
		
		//关闭弹出窗口后刷新主体iframe里面的页面
		$('#leftFrame .tree-node').each(function(){
			var _color = $(this).css('background-color');
			if(_color == 'rgb(232, 237, 243)'){
				$(this).click();
			};
		});
		
		//移除主页里面新加入的JS
		
	};

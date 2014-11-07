/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 * 说明：后台框架基本设置
 */
/*
	 * 节点滑过下拉显示效果  
	 * 调用方法：$(".hovers").slideShow({      //滑动的节点ID或CLASS
					showNode: '#shows',    //显示的节点ID或CLASS，默认用ID
					showPosition: params.showPosition || 'bottom'    //显示的方向
				});
	 * 注意：父容器的position是默认值，也就是static,子容器的position为默认值，也是static,这个时候，offset和position值相同
	 *      父容器的position是相对定位或绝对定位，也就是ralative或absolute,子容器的position为默认值，也是static,这个时候，offset和position值不同
	 *      $.fn.slideShow在应用多个jquery版本的页面里出错，找不到方法
	 */ 
(function($){
	
	$.fn.slideShow = function(params){
		opts = $.extend({
			showNode: params.showNode,    //要显示的节点
			showPosition: params.showPosition || 'b'    //显示的方向
		},params);
		$(opts.showNode).css({position:'absolute'}).hide();
		return this.each(function(){
			$(this).hover(function(){
				var domHeight = $(this).height(),    
				    offsets = $(this).offset(),     //取得滑动节点的位置
				    lookOffsetLeft = offsets.left,
				    lookOffsetTop = offsets.top,
				    windowHeights = $(window).height(),
				    windowWidths = $(window).width(),
				    showNodeHeight = $(opts.showNode).height(),
				    showNodeWidth = $(opts.showNode).width(),
				    showOffsetTop,
				    s = windowHeights - lookOffsetTop - domHeight - 6,
				    t = windowWidths - lookOffsetLeft - $(this).width() - 10;
				
				//s < showNodeHeight  距离页底最小距离    showOffsetTop = lookOffsetTop - showNodeHeight - 5;
				//lookOffsetTop - 5 < showNodeHeight  距离页头最小距离    showOffsetTop = lookOffsetTop + domHeight + 5;
				//t < showNodeWidth   距离右侧最小距离    lookOffsetLeft = lookOffsetLeft - showNodeWidth - 5; showOffsetTop = lookOffsetTop;
				//lookOffsetLeft -5  < showNodeWidth  距离左侧最小距离     lookOffsetLeft = lookOffsetLeft + $(this).width() + 5; showOffsetTop = lookOffsetTop;
				
				if(opts.showPosition == 'l'){
					if(lookOffsetLeft -5  < showNodeWidth){
						lookOffsetLeft = lookOffsetLeft + $(this).width() + 5;
					    showOffsetTop = lookOffsetTop;
					}else if(s < showNodeHeight){
						 showOffsetTop = lookOffsetTop - showNodeHeight - 5;
					}else{
						lookOffsetLeft = lookOffsetLeft - showNodeWidth - 5;
					    showOffsetTop = lookOffsetTop;
					}
					if(s < showNodeHeight && t < showNodeWidth){
						lookOffsetLeft = lookOffsetLeft - showNodeWidth - 5; 
					    showOffsetTop = lookOffsetTop - showNodeHeight;
					}
				}
				
				if(opts.showPosition == 'r'){
					if(t < showNodeWidth){
						 lookOffsetLeft = lookOffsetLeft - showNodeWidth - 5; 
						 showOffsetTop = lookOffsetTop;
					}else if(s < showNodeHeight){
						 showOffsetTop = lookOffsetTop - showNodeHeight - 5;
					}else{
						lookOffsetLeft = lookOffsetLeft + $(this).width() + 5;
					    showOffsetTop = lookOffsetTop;
					}
					if(t < showNodeWidth && s < showNodeHeight ){
						lookOffsetLeft = lookOffsetLeft  - 5; 
					    showOffsetTop = lookOffsetTop - showNodeHeight;
					}
				}
				
				if(opts.showPosition == 't'){
					if(lookOffsetTop - 5 < showNodeHeight){
						showOffsetTop = lookOffsetTop + domHeight + 5;
					}else if(t < showNodeWidth){
						lookOffsetLeft = lookOffsetLeft - showNodeWidth - 5;
					    showOffsetTop = lookOffsetTop;
					}
					else{
						showOffsetTop = lookOffsetTop - showNodeHeight - 5;
					}
					if(t < showNodeWidth && s < showNodeHeight){
						lookOffsetLeft = lookOffsetLeft  - 5; 
					    showOffsetTop = lookOffsetTop - showNodeHeight;
					}
				}
				
				if(opts.showPosition == 'b'){
					if(s < showNodeHeight){   //向上显示
						showOffsetTop = lookOffsetTop - showNodeHeight - 5;
					}else if(t < showNodeWidth){    //左方显示
						lookOffsetLeft = lookOffsetLeft + $(this).width() + 5;
					    showOffsetTop = lookOffsetTop;
					}else{
						showOffsetTop = lookOffsetTop + domHeight + 5;    //下方显示
					}
					if(t < showNodeWidth && s < showNodeHeight){    //左上角显示
						lookOffsetLeft = lookOffsetLeft  - 5; 
					    showOffsetTop = lookOffsetTop - showNodeHeight;
					}
				}
				
				/*   
				switch(opts.showPosition){
					case 'top': 
					    showOffsetTop = lookOffsetTop - showNodeHeight - 5;
					    break;
					case 'left': 
					    lookOffsetLeft = lookOffsetLeft - showNodeWidth - 5;
					    showOffsetTop = lookOffsetTop;
					    break;
					case 'right': 
					    lookOffsetLeft = lookOffsetLeft + $(this).width() + 5;
					    showOffsetTop = lookOffsetTop;
					    break;
					case 'bottom':
					    showOffsetTop = lookOffsetTop + domHeight + 5;
					    break;
					default: ;
				}
				*/
				
				$(opts.showNode).css({left:lookOffsetLeft,top:showOffsetTop}).show();
			},function(){
				$(opts.showNode).hide();
			});
		})
	}

})(jQuery)
 
 
 

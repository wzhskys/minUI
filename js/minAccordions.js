/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 * 说明：后台框架基本设置
 */
(function($){
	
	/*
	 * 选项卡效果
     *  <ul class="tab" id="tab">
			<li class="choose1">1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
		</ul>
		<div class="tab_1" id="tab_1">
			<div>11</div>
			<div><a>22</a></div>
			<div><font>33</font></div>
			<div><a>44</a></div>
		</div>
		css: .choose1{color:red;}
		调用方法：tabChange({
					parentId:'.tab',
					childId:'.tab_1',
					chooseClass:'choose1',
					index:3
				  });
	 */
	 
	tabChange = function(params){
		
		var opts = $.extend({
			parentId: params.parentId,    //选项卡parent id
			childId: params.childId,      //内容展示chikd id
			chooseClass: params.chooseClass || 'choose',     //选项卡被选中参数
			index: params.index || 1    //默认显示第几个
		},params);
		
		if(opts.parentId==''){
			alert('parentId不能为空');
			return;
		};
		
		if(opts.childId==''){
			alert('childId不能为空');
			return;
		}; 
		
		var len = $(opts.parentId).children().siblings().length;
		if(opts.index>len){
			alert('index数值过大');
			return;
		};
		
		$(opts.parentId).children().siblings().click(function(){
			var num = $(this).index();   //取得点击节点的下标数
			$(opts.parentId).children().siblings().removeClass().eq(num).addClass(opts.chooseClass);
			$(opts.childId).children().siblings().hide().eq(num).show();
		});
		
		$(opts.parentId).children().siblings().eq(opts.index-1).trigger('click');
	}
	
})(jQuery)


 
 
 

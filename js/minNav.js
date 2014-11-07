/*
 *  Copyright 2012-2014, Jensen ，v1.1
 *  Date: 2014-05-24 18:00 
 *  说明：多标签菜单切换效果
 */

var ie  = $.browser.msie,
    ie6 = $.browser.msie && $.browser.version < 7,
    tabNavAll,       //菜单对外公有对象
    _indexs = 0;
    
$(function($){
	var tabidRet = [],    //存放左侧菜单tabid
	    nabLen=[],        //多标签长度超出范围后保存数组
		nabOverLen,       //标签超出的数量
		nabOverLenr,      //标签超出的数量
		nq = 0;           //标签的tabid
	
	var tabNav = {
		_treeNode: null,      //左侧菜单节点
		_leftMinDot: null,    //多标签向左点击按钮
		_rightMinDot: null,   //多标签向右点击按钮
		_navShowBoxLi: null,  //菜单选项卡标签页下拉子节点
		//_tabMoreLi: null,   //多标签右侧下拉更多弹出框切换子节点    -- 全部套用有问题
		firstNavWid: 0,       //第一个标签的宽度
		navWid: 0,            //其他正常标签的宽度
		navAllWid: 0,         //所有标签的整体宽度
		
		init: function(options){
			var $this = this;
			this._treeNode     = $('#leftFrame .tree-node');
			this._leftMinDot   = $('.tabPageHeaderScrollL');
			this._rightMinDot  = $('.tabPageHeaderScrollR');
			this._navShowBoxLi = $('.showBox li');
			//this._tabMoreLi    = $('.tabPageHeaderMores li');
			this.firstNavWid   = $('.tabPageHeaderNavUl li:first').outerWidth() + 2;
			
			this._treeNode.click(function(){    //左侧菜单点击
				var tabid = $(this).children().attr('tabid');
				var link  = $(this).children().attr('rel');
				var name  = $(this).children().html();
				$this.newTab(tabid,link,name);    //新打开一个标签 id 链接 名称
			});    
			this._leftMinDot.click(function(event){$this._scrollPrev()});    //点击左移动按钮
			this._rightMinDot.click(function(event){$this._scrollNext()});    //点击右移动按钮
			
			this._init();
		},
		
		_init: function(){
			var $this = this;
			$('.tabPageHeaderNavUl li:first').click(function(){    //页头选项卡菜单
				if($(this).attr('class') != 'selectd'){
					$this.tabClick(0);
				};
			});
			
			this._navShowBoxLi.click(function(){    //菜单选项卡标签页下拉点击附上选中样式
				$this._navShowBoxLi.removeClass('select');
				$(this).addClass('select');
				$('.showBox').hide();
			});
			
			$('.showBox li:first').click(function(){    //刷新该标签页
				if(typeof nq == 'object') return false;
				//根据左侧树选中的背景刷新
			    //$('#leftFrame .tree-node').each(function(){
					//var _color = $(this).css('background-color');
					//if(_color == 'rgb(232, 237, 243)'){
						//_tabId = $(this).children().attr('tabid');
					//};
				//});
		        //刷新子iframe页面
		        if(nq != 1000){
		        	var myiframe = document.getElementById(nq);
				    myiframe.src = myiframe.src; 
		        }else{    //判断首页的标签的点击情况
		        	var myiframe = document.getElementById('homes');
				    myiframe.src = myiframe.src; 
		        }
				
			});
			
			this._navShowBoxLi.eq(1).click(function(){    //关闭某个选中的标签
				if(typeof nq == 'object') return false;
			    $this.navClose(nq);
			});
			
			this._navShowBoxLi.eq(2).click(function(){    //关闭除了选中标签的其他标签
				if(typeof nq == 'object') return false;
				$('.tabPageHeaderNavUl li').each(function(){
					var _rels = $(this).attr('tabid');
					if(nq != _rels){
						if(_rels != undefined){
							$this.navClose(_rels);
						};
					}; 
				});
				tabidRet = [];
				tabidRet.push(nq);    //清除掉数组的其他rel,目前显示的标签的rel存储进去
			});
			
			this._navShowBoxLi.eq(3).click(function(){    //关闭全部多标签选项卡
				//菜单标签除第一个外，全部去除
				$('.tabPageHeaderNavUl li').each(function(){
					var _rels = $(this).attr('tabid');
					if(_rels != undefined){
						$this.navClose(_rels);
					};
				});
				tabidRet = [];    //把左侧点击菜单存储数组清空
			});
			
			$('.leftFrameHeaderBotton').click(function(){    //左侧菜单点击缩回
			    //$this.navTabsSize(_indexs);
			    //console.log($('.tabPageHeaderNav').width());
			    //this._unseeNavNum();
			    $this._unseeNavNum();
			});
			
			$('.leftNavSideDot').click(function(){    //左侧菜单点击缩回
			    //$this.navTabsSize(_indexs);
			    //console.log($('.tabPageHeaderNav').width());
			     $this._unseeNavNum();
			});
			
			$('.tabPageHeaderNavUl').mousedown(function(s,e){    //标签右键点击
				e = e || window.event;
				if(3 == e.which || undefined == e.which){
					nq = s;
					$('.tabNavChange').bind('contextmenu',function(e){
						$('.tabPageHeaderNavUl li').css('cursor','default');
				 		$this._navShowBoxLi.removeClass('select');
				 		if(resizenub == 0){    //左侧菜单神展开
				 			var x_left = e.pageX - 200-1; //200 左侧菜单的宽度和空隙
				 		}else{
				 			var x_left = e.pageX - 33;
				 		}
				 		var y_top = e.pageY - 45 -1;
						$('.showBox').css({'left':x_left,'top':y_top}).show();
			 			return false;
			 		});
				};
				if(typeof nq == 'object'){    //鼠标右键未点击到菜单标签，最后一个可以点击，颜色加深
					$this._navShowBoxLi.css('color','#666');
					$('.showBox li:last').css('color','#000');
				};
				stopEvent();    //防止事件冒泡 
			});
			
			$(window).resize(function(){   //窗口大小变化后改变nabOverLenr值
				$this._unseeNavNum();
				//nabOverLenr > 0 ? $this._rightMinDot.removeClass('untabPageHeaderScrollR') : $this._rightMinDot.addClass('untabPageHeaderScrollR');
			});
			
		},
		navClose: function(j){  //多标签菜单关闭 
			//var len = $('.tabPageHeaderNavUl li').length;
			var $this = this;
			var newRet = [],nub;
			newRet = delArray(tabidRet,j);    //数组删除元素
			tabidRet = [];
			tabidRet = newRet;
		    $('.tabPageHeaderNavUl li').each(function(i){
		    	if($(this).attr('tabid') == j){
		    		nub = i;    //取得点击的第几个关闭按钮
		    		//兼容火狐向下冒泡
					if($.browser.mozilla){
						$(this).attr('onclick','');
					};
		    		if($(this).hasClass('selectd')){    //判断该标签是否为选中
		    			//$(this).next().trigger('click');
		    			$this.tabClick(i+1);    //兼容IE
		    		};
		    		if(!$(this).next().attr('tabid')){    //判断该多标签后面是否有菜单
		    			//$(this).prev().trigger('click');
		    			$this.tabClick(i-1);    //兼容IE
		    		};
		    		$(this).remove();    //标签关闭
		    		$('.navContItem').eq(nub).remove();    //标签对应页关闭
		    	};
		    });
		    
		    //当前LI去掉后，之后的每个LI的changeNavs的参数减去1
		    $('.tabPageHeaderNavUl li').eq(nub-1).nextAll().each(function(){     
		    	var c = $(this).attr('rel');
		    	$(this).attr('rel',c-1);
		    	$(this).attr('onclick','');
		    	$(this).bind('click',function(){    //给多标签绑定新的方法，因为删掉了一个LI,参数减1
		    		$this.changeNavs(c-1);
		    	});
		    	$(this).find('.dotClose').bind('click',function(){    //给关闭绑定新的方法，因为删掉了一个LI,参数减1
		    		$this.navClose(c-1);
		    	});
		    }); 
		    
		    //多标签下拉更多去掉链接
		    var selectTrue = $('.tabPageHeaderMores li').eq(nub).nextAll().hasClass('pageSelectd');
		    if(!selectTrue){
		    	$('.tabPageHeaderMores li').attr('style','').removeClass('pageSelectd').eq(nub-1).addClass('pageSelectd');
		    };
		    //对应链接后的每个LI的切换函数参数减去1
		    $('.tabPageHeaderMores li').eq(nub).nextAll().each(function(index) {
			    var r = $(this).attr('rel');
			    $(this).attr('onclick','');
			    $(this).attr('rel',r-1);
		    	$(this).bind('click',function(){    //给标签下拉更多链接绑定新的方法，因为删掉了一个LI,参数减1
		    		$this.changeNavsLink(r-1);
		    	});
			});
		    $('.tabPageHeaderMores li').eq(nub).remove();    //去掉多标签对应的链接
		    
		    //调用多标签控制函数
		    var liLength = $('.tabPageHeaderNavUl li').length - 1;
			this.navTabsSize(liLength);
		    stopEvent();    //防止事件冒泡  
		},
		tabidChange: function(n){    //根据tabid切换标签 
			//多标签切换
			var $this = this;
			$('.tabPageHeaderNavUl li').each(function(i){
		    	if($(this).attr('tabid') == n){
		    		$this.tabClick(i);
		    	};
		    });
		},
		closeSelect:function(){    //关闭选中的标签样式
			$('.tabPageHeaderNav-left').removeClass('dotLeftSelectd');
		    $('.tabPageHeaderNav-right').removeClass('dotRightSelectd');    //我的主页选项卡去掉左右菜单样式
			$('.tabPageHeaderNavUl li').removeClass('selectd');
			$('.navContItem').hide();    //主体页面全部隐藏
			$('.tabPageHeaderMores li').removeClass('pageSelectd');   //更多链接全部清空选中样式
		},
		tabClick: function(j){    //菜单和主体页控制显示和隐藏 
			this.closeSelect();   //调用关闭选中
			$('.tabPageHeaderNavUl li').eq(j).addClass('selectd');
		    $('.tabPageHeaderNavUl li').eq(j).find('.tabPageHeaderNav-left').addClass('dotLeftSelectd');
		    $('.tabPageHeaderNavUl li').eq(j).find('.tabPageHeaderNav-right').addClass('dotRightSelectd');
		    //便签对应页切换
		    $('.navContItem').eq(j).show();
		    //下拉更多链接切换
		    $('.tabPageHeaderMores li').attr('style','').removeClass('pageSelectd').eq(j).addClass('pageSelectd');
		},
		changeNavs: function(n){    //多标签动态选项卡切换
			if($('.tabPageHeaderNavUl li').eq(n).attr('class') != 'selectd'){
			    this.tabClick(n);
			};
		},
		changeNavsLink: function(n){    //多标签下拉更多链接切换 
			if($('.tabPageHeaderNavUl li').eq(n).attr('class') != 'selectd'){    //判断标签是否被选中
			    this.tabClick(n);
			};
			$('.tabPageHeaderMores li').removeClass('pageSelectd').attr('style','').eq(n).addClass('pageSelectd');
		},
		navTabsSize: function(s){ 
			navFirstWidth = $('.tabPageHeaderNavUl li').eq(0).width();    //我的主页的宽度，比其他的宽度小
			navSecondWidth = $('.tabPageHeaderNavUl li').eq(1).width();
			totalWidth = navFirstWidth + navSecondWidth * s + (s +1) * 2;    //2为margin-left的值
			var tols = ie6 ? totalWidth > allWidth -17 * 3 - 44 : totalWidth > allWidth -17 * 3 - 35 ;    //ie6点击超出值的修复
			if(tols){    //多标签长度超出范围后
				nabLen.push(s);
				$('.tabPageHeaderNavUl li').eq(0).css({'margin-left':'19px'});    //向左滚动图标占用17PX的宽度大小
				this._leftMinDot.show();
				this._rightMinDot.show().removeClass('untabPageHeaderScrollR');    //向右滚动图标显示变亮
				
				var scrollLookWidth = allWidth -18 - 17 - 17 * 2,scrollMin,scrollMax;    //17链接下拉更多，左右滚动图标宽度
				scrollMin = Math.abs(totalWidth - scrollLookWidth) + 3;
				if(ie6)  scrollMin = Math.abs(totalWidth - scrollLookWidth) + 3 + 19;
				nabOverLen = nabOverLenr = $('.tabPageHeaderNavUl li').length - nabLen[0];
				
				$('.tabPageHeaderNavUl').animate({'marginLeft':-scrollMin+'px'},100);
				this._leftMinDot.removeClass('untabPageHeaderScrollL');
				this._rightMinDot.addClass('untabPageHeaderScrollR');
			}else{
				$('.tabPageHeaderNavUl li').eq(0).css({'margin-left':'2px'});
				this._leftMinDot.hide();
				this._rightMinDot.hide().addClass('untabPageHeaderScrollR');
				ie6 ? $('.tabPageHeaderNavUl').animate({'marginLeft':'-2px'},100) : $('.tabPageHeaderNavUl').animate({'marginLeft':0},100) ;    //多标签菜单刚超过长度1的时候，关闭其中一个的时候菜单左移到最左
				nabLen = [];
			};
		},
		newTab: function(id,link,name){     //新建一个标签
			var tabid = id;
			var rel = link;
			var navName = name;    //获取左侧菜单名称
			$('.tabPageHeaderNavUl li').each(function(){    //获取多标签的tabid数组,没有的增加到数组
				var s = $(this).attr('tabid');
				if(!contains(tabidRet,tabid) && s) 
				    tabidRet.push(s);
			});
			var newRet = [],totalWidth,navFirstWidth,navSecondWidth;
			newRet = tabidRet.unique();    //数组去除重复
			tabidRet = [];
			tabidRet = newRet;
			var tabRel = $('.tabPageHeaderNavUl li').attr('tabid');
			var indexs = $('.tabPageHeaderNavUl li').length;
			_indexs = indexs;
			//判断多标签没有该tabid就增加
			if(!contains(tabidRet,tabid)){
				this.closeSelect();    //调用关闭标签
			    //页面主体增加
			    $('.navPageShow').append('<div class="navContItem" tabid='+tabid+'><iframe src='+rel+' id='+tabid+'  scrolling="no" name='+tabid+' class="iframes" target="_self" frameborder="0" bordercolor="none"  marginheight="0" marginwidth="0"> </iframe></div>')
			    //多标签增加
	            //$('.tabPageHeaderNavUl').append('<li class="selectd" onclick="tabNavAll.changeNavs('+indexs+')"  tabid='+tabid+' rel='+indexs+'><a><span>'+navName+'</span></a><div class="tabPageHeaderNav-left dotLeftSelectd"></div><div class="tabPageHeaderNav-right dotRightSelectd"></div><div class="dotClose" onclick="tabNavAll.navClose('+tabid+')"></div></li>');
	            $('.tabPageHeaderNavUl').append('<li class="selectd" onclick="tabNavAll.changeNavs('+indexs+')" onmousedown="tabNavAll.rightClick('+tabid+',event)" tabid='+tabid+' rel='+indexs+'><a><span>'+navName+'</span></a><div class="tabPageHeaderNav-left dotLeftSelectd"></div><div class="tabPageHeaderNav-right dotRightSelectd"></div><div class="dotClose" onclick="tabNavAll.navClose('+tabid+')"></div></li>');
			    $('.navContItem').eq(indexs).show();    //增加后初始主体页面显示
			    setTimerResize();    //页面宽高设置自适应
			    //多标签下拉更多链接增加
			    $('.tabPageHeaderMores').append('<li class="pageSelectd" onclick="tabNavAll.changeNavsLink('+indexs+')" rel='+indexs+' tabid='+tabid+'>'+navName+'</li>');
			    //调用多标签控制函数
			    this.navTabsSize(indexs);
			}else{
				this.tabidChange(tabid);
				var myiframe = document.getElementById(tabid);
				myiframe.src = myiframe.src; 
			};
		},
		_unseeNavNum: function(){    //重新计算多标签除了可视区域外的标签个数
			nabOverLenr = Math.ceil((this._navScrollWidth() -this._navVisibleWidth())/this.navWid);
			return nabOverLenr;
		},
		_navVisibleWidth:function(){    //可见的中间的固定的宽度
			return $('.tabPageHeaderNav').width() - this._leftMinDot.width() * 2;
		},
		_navScrollWidth:function(){    //所有标签的宽度和
			var navLen = $('.tabPageHeaderNavUl li').length - 1;
			return this.firstNavWid + this.navWid * navLen;
		},
		_rightScrollWid:function(num){    //向右移动的最小距离
			var navLen = $('.tabPageHeaderNavUl li').length - 1;
			return this._navVisibleWidth() - (this.firstNavWid + this.navWid * (navLen - nabOverLenr));
		},
		_scrollPrev: function(){    //向左点击移动
			this.navWid = $('.tabPageHeaderNavUl li:first').siblings().outerWidth()+2;
			if(--nabOverLen >0){    //向左移动的次数判断
				var lScrollWid = -this.firstNavWid - this.navWid * (nabOverLen-1);
			    $('.tabPageHeaderNavUl').animate({'marginLeft': lScrollWid+ 'px'},100); 
			    this._rightMinDot.removeClass('untabPageHeaderScrollR');    //向右移动按钮颜色变深
			}else{
				$('.tabPageHeaderNavUl').animate({'marginLeft': 0 + 'px'},100); 
				this._leftMinDot.addClass('untabPageHeaderScrollL');    //向左移动按钮变灰 
				nabOverLen=0;
			};
			
		},
		_scrollNext: function(){    //向右点击移动
			this.navWid = $('.tabPageHeaderNavUl li:first').siblings().outerWidth()+2;
			var rScrollWid = this.navWid - this._rightScrollWid();    //获取向右移动的最小的距离
			//var nub = 0;
			//if(nub++ < nabOverLenr){    //向左移动的次数判断
				//var ulLeft = -this.firstNavWid - this.navWid * (nabOverLenr-2);
			    //$('.tabPageHeaderNavUl').animate({'marginLeft': ulLeft+ 'px'},100); 
			//};
			this._leftMinDot.removeClass('untabPageHeaderScrollL');
			if(nabOverLen < nabOverLenr){    //向右移动的次数判断
			    $('.tabPageHeaderNavUl').animate({'marginLeft': -rScrollWid - (nabOverLen++)*this.navWid+ 'px'},100);
			    if(nabOverLen == nabOverLenr)  this._rightMinDot.addClass('untabPageHeaderScrollR');
			};
		},
		rightClick: function(s,e){    //标签右键点击事件
			e = e || window.event;
			var $this = this;
			if(3 == e.which || undefined == e.which){
				nq = s;
				if(nq == 1000){    //判断是首页的标签
					this._navShowBoxLi.eq(1).css('color','#666');
				}else{
					this._navShowBoxLi.css('color','#000');
				};
				$('.tabNavChange').bind('contextmenu',function(e){
					$('.tabPageHeaderNavUl li').css('cursor','default');
			 		$this._navShowBoxLi.removeClass('select');
			 		if(resizenub == 0){    //左侧菜单神展开
			 			var x_left = e.pageX - 200 - 1;
			 		}else{
			 			var x_left = e.pageX - 33;
			 		}
			 		var y_top = e.pageY - 45 -1;
			 		$('.showBox').css({'left':x_left,'top':y_top}).show();
		 			return false;    //禁止IE右键弹出的工具栏
		 		});
			};
			stopEvent();    //防止事件冒泡 
		}
	};
	
	tabNavAll  = tabNav;

    tabNav.init();
})	
	

minUI
=====

弹出框的JS如果没效果
1, 可以架设在有端口的环境里访问,可以在aptana里面访问,例如：http://127.0.0.1:8020/minUI-new/index.html
2, 可以用firefox打开或部署到apache下。

版本V1.2   2014.06.30
1, [Bug]修复了minNav.js多标签右键的错误
2，准备优化：头部高度增加时候，多标签下拉显示的位置，改自适应
3，准备修复：minResize.js的值的错误

版本V1.1   2014.03.04 - 2014.04.15
1, 优化了min.js结构统一处理各个页面共用的效果，把多标签的切换代码单独提取出来由minNav.js来处理
2, 修改了基本操作-改变大小的JS的引用错误
3, 更新下弹出框和拖动框的简写方式$('').minBox() 不需要在圆刮号里面加花刮号
4, min-notab.js改名称min.js替换现有的就是非多标签切换版本
5, 增加了刷新标签页 -- IE下有问题在解决
6, 增加了minResize.js，作为窗口改变大小时，页面里面组件大小的重置
7, 增加了min-notab.js，引用这个JS的时候，可以不用引用min.js和minNav.js，就是没有多标签菜单的切换，始终只有一个tab标签变化
8, 改变了js的引用路径，js全部放在一个js目录下
9, minBox.js里面增加了层上层的方法和弹出层里面包含页面的方法,规范了方法名称的命名

----------------------------------------------------------------------------

版本V1.0  2012.12.14  - 2013.10.10
1, 封装了选项卡，拖动窗口，弹出框等效果
2, 实现了多标签切换左右移动效果
3, 实现了4种常用的场景页面
4, JS效果针对谷歌、火狐和IE做了兼容，IE6也做了部分兼容
5, 图片素材部分来自dwz-ria，部分功能效果也模仿其实现
6, 基于HTML5开发，打造最先进的前端
7, 基本功能完成，其他功能陆续上传中，希望大家多提提意见







/* 设置引入的文件的路径 */
require.config({
	paths:{
		"jquery" : "jquery.min",
		"jquery-cookie" : "jQuery.cookie",
		"common" : "common",
		"nav" : "nav",
		"slide" : "slide",
		"scroll" : "scroll",
		"goods" : "goods"
	},
	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	}
});

require(["common","nav","slide","scroll","goods"],function(common,nav,slide,scroll,goods){
	/* 公共的html */
	common.getCommon();
	common.login();
	
	/* 轮播  加侧边导航栏 */
	nav.rotationDowload();
	nav.rotation();
	nav.slideTab();
	
	/* 中间轮播 */
	slide.slideDowload();
	slide.rotationDowload();
	
	/* 侧边栏滚动 */
	scroll.slideScroll();
	scroll.backTop();
	scroll.slideContent();
	
	/* 显示商品 */
	goods.showPhone();
})
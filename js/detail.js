/* 设置引入的文件的路径 */
require.config({
	paths:{
		"jquery" : "jquery.min",
		"jquery-cookie" : "jQuery.cookie",
		"common" : "common",
		"goodsDetail" : "goodsDetail"
	},
	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	}
});

require(["common","goodsDetail"],function(common,goodsDetail){
	/* 公共的html */
	common.getCommon();
	
	/* 获取id */
	goodsDetail.getId();
	goodsDetail.addCart();
})
/* 设置引入的文件的路径 */
require.config({
	paths:{
		"jquery" : "jquery.min",
		"jquery-cookie" : "jQuery.cookie",
		"registerUser" : "registerUser"
	},
	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	}
});

require(["registerUser"],function(registerUser){
	registerUser.register();
})
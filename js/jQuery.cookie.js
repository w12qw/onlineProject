//console.log("ok")
//在原型下的插件
;;;(function($){
	//cookie插件开发
	$.extend($,{
		setCookie : function(key,value,date,path){
			if(!!date && !(date instanceof Date)){
				path = date;
				date = undefined;
			}
			document.cookie = key + "=" + value + ";expires=" + date + ";path=" + path;
		},
		getCookie : function(key){
			var cookies = document.cookie;
			if(!cookies) return "";
			var cookiesArr = cookies.split("; ");
			for (var i = 0; i < cookiesArr.length; i++) {
				if(cookiesArr[i].split("=")[0] === key){
					return cookiesArr[i].split("=")[1];
				}
			}
			return "";
		},
		removeCookie : function(key,path){
			document.cookie = key + "=;expires=" + new Date(0) + ";path=" + path;
		}
	});
	
})(jQuery);

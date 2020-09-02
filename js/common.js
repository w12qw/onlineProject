define(["jquery"],function($){
	function getCommon(){
		$("#common").load("common.html");
		searchTab();
	}
	
	/* 搜索框事件 */
	function searchTab(){
		$("#common").on("focus","#search",function(){
			console.log(11);
			$(".search-key").hide();
			$(".search-hot").show();
		}).on("blur","#search",function(){
			if($("#search").val() == ""){
				$(".search-key").show();
			}else{
				$(".search-key").hide();
			}
			setTimeout(function(){
				$(".search-hot").hide();
			},100);
		}).on("click","#hot-historys li",function(){
			$("#search").val($(this).find("a").html());
			
			if($("#search").val() == ""){
				$(".search-key").show();
			}else{
				$(".search-key").hide();
			}
			return false;
		})
	}
	
	/* 登录 */
	function login(){
		$("#common").on("click","#login",function(){
			$("#loginBox").show();
		})

		$("#btnLogin").click(function(){
			$(".message").show();
			var msg = "";
			$.ajax({
				type : "post",
				url : "php/login.php",
				data : {
					phone : $(".user-input").eq(0).find("input").val(),
					pass : $(".user-input").eq(1).find("input").val()
				},
				success : function(res){
					if(res == 2){
						//没有该用户
						console.log(222);
						msg = "没有该用户";
						$(".message .message-span").html(msg);
					}else if(res == 1){
						//密码输入错误
						console.log(111);
						msg = "密码输入错误";
						$(".message .message-span").html(msg);
					}else{
						//登录成功
						console.log(000);
						location.href = "index.html";
					}
				},
				error : function(msg){
					console.log(msg);
				}
			})
		})
	}
	
	return {
		getCommon : getCommon,
		login : login
	}
})
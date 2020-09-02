define(["jquery"],function($){
	function register(){
		var NameFlag = false;
		var phoneFlag = false;
		var passFlag = false;
		var repassFlag = false;
		var nameReg = /^\w{2,6}$/;
		var phoneReg = /^1\d{10}$/;
		var passReg = /^\w{3,6}$/;
		$(".user-box").eq(0).find(".user-input input").focus(function(){
			var node = $(this).closest(".user-input").siblings("span");
			node.html("请输入用户名");
			node.show();
		}).blur(function(){
			var node = $(this).closest(".user-input").siblings("span");
			
			if($(this).val() == ""){
				node.hide();
				NameFlag = false;
			}else{
				if(checkName()){
					node.html("用户名输入正确");
					node.show();
					NameFlag = true;
				}else{
					node.html("请输入2-6位用户名");
					node.show();
					NameFlag = false;
				}
			}
			
		})
		
		//校验用户名输入是否合法
		function checkName(){
			if(nameReg.test($(".user-box").eq(0).find(".user-input input").val())){
				return true;
			}
			return false;
		}
		
		/* 校验手机号 */
		$(".user-box").eq(1).find(".user-input input").focus(function(){
			var node = $(this).closest(".user-input").siblings("span");
			node.html("请输入手机号");
			node.show();
		}).blur(function(){
			var node = $(this).closest(".user-input").siblings("span");
			
			if($(this).val() == ""){
				node.hide();
				phoneFlag = false;
			}else{
				if(checkPhone()){
					node.html("手机号输入正确");
					node.show();
					phoneFlag = true;
				}else{
					node.html("请输入正确的手机号");
					node.show();
					phoneFlag = false;
				}
			}
			
		})
		
		//校验手机号输入是否合法
		function checkPhone(){
			if(phoneReg.test($(".user-box").eq(1).find(".user-input input").val())){
				return true;
			}
			return false;
		}
		
		
		/* 校验密码 */
		$(".user-box").eq(2).find(".user-input input").focus(function(){
			var node = $(this).closest(".user-input").siblings("span");
			node.html("请输入密码");
			node.show();
		}).blur(function(){
			var node = $(this).closest(".user-input").siblings("span");
			if($(this).val() == ""){
				node.hide();
				passFlag = false;
			}else{
				if(checkPass()){
					node.html("密码输入正确");
					node.show();
					passFlag = true;
				}else{
					node.html("请输入3-6位密码");
					node.show();
					passFlag = false;
				}
			}
		})
		
		//校验密码输入是否合法
		function checkPass(){
			if(passReg.test($(".user-box").eq(2).find(".user-input input").val())){
				return true;
			}
			return false;
		}
		
		
		/* 密码比对 */
		$(".user-box").eq(3).find(".user-input input").focus(function(){
			var node = $(this).closest(".user-input").siblings("span");
			node.html("再次输入密码");
			node.show();
		}).blur(function(){
			var node = $(this).closest(".user-input").siblings("span");
			if($(this).val() == ""){
				node.hide();
				repassFlag = false;
			}else{
				if(repeatPassValidate()){
					node.html("密码输入正确");
					node.show();
					repassFlag = true;
				}else{
					node.html("两次密码不一致");
					node.show();
					repassFlag = false;
				}
			}
		})
		
		//校验重复密码
		function repeatPassValidate(){
			if($(".user-box").eq(3).find(".user-input input").val() != "" && $(".user-box").eq(3).find(".user-input input").val() == $(".user-box").eq(2).find(".user-input input").val()){
				return true;
			}
			return false;
		}
		
		$("#btn-submit").click(function(){
			
			if(!(NameFlag == true && phoneFlag == true && passFlag == true && repassFlag == true)){
				console.log(111);
				return false;
			}
			
			$.ajax({
				type : "post",
				url : "php/register.php",
				data : {
					username : $(".user-box").eq(0).find(".user-input input").val(),
					phone : $(".user-box").eq(1).find(".user-input input").val(),
					password : $(".user-box").eq(2).find(".user-input input").val(),
					repassword : $(".user-box").eq(3).find(".user-input input").val()
				},
				success : function(res){
					console.log(res);
					if(res == 1){
						console.log(111);
						location.href = "index.html";
					}
				},
				error : function(error){
					console.log(error);
				}
			})
		})
	}
	
	
	return {
		register : register,
	}
})
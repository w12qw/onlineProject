define(["jquery"],function($){
	/* 公告栏 */
	function slideScroll(){
		setInterval(function(){
			$("#notice").find("ul").animate({
				marginTop: "-43px"
			},1000,function(){
				$(this).css({marginTop : "0px"});
				var li = $("#notice").find("ul").children().first().clone();
				$("#notice ul li:last").after(li);
				$("#notice ul li:first").remove();
			})
		},2000);
		
	}
	
	/* 返回顶部 */
	function backTop(){
		var top = null; 
		$(window).scroll(function(){
			top = $(window).scrollTop();
			/* console.log($("html").scrollTop()); */
			if(top > 600){
				$("#hover-top").show();
			}else{
				$("#hover-top").hide();
			}
		});
		
		$("#hover-top").click(function(){
			$("html,body").animate({
				scrollTop : 0
			},1000);
			
			return false;
		});
		
	}
	
	
	/* 侧边栏内容 */
	function slideContent(){
		var top = null;
		var i = 1;
		var flag = false;
		
		function scrollSlide(){
			top = $(window).scrollTop();
			var topArr = [2500,3150,3800,4450,5100,5750,6400,7150,7800,8400];
			if(top >= 1950 && top < 8378){
				/* $(".show-right").fadeIn("slow"); */
				//$(".show-right").show();
				$(".show-right").show().removeClass("showBox").addClass("tofixed");
				for (var i = 0; i < topArr.length; i++) {
					if(top <= topArr[i]){
						$(".show-right").find("ul").find("li").eq(i).addClass("hover").siblings().removeClass("hover");
						break;
					}
				}
				
			}else{
				/* $(".show-right").fadeOut("slow"); */
				/* $(".show-right").addClass("tofixed");
				$(".show-right").hide(); */
				$(".show-right").removeClass("tofixed").addClass("showBox");
			}
		}
		
		$(window).scroll(scrollSlide);
		
		$(".show-right").find("ul").on("click","li",function(){
			
			$(window).unbind("scroll");
			
			var index = $(this).index();
			$("html,body").animate({
				scrollTop : index * 688 + 2068.2,
			},500)
			
			$(this).siblings().removeClass("hover");
			$(this).addClass("hover");
			
			
			$(window).scroll(scrollSlide);
			
			return false;
		})
		
	}
	return {
		slideScroll : slideScroll,
		backTop : backTop,
		slideContent : slideContent
	}
})

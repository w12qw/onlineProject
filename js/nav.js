/* 处理首页的导航的图片 */
define(["jquery"],function($){
	/* 轮播的数据加载 */
	function rotationDowload(){
		$.ajax({
			type : "get",
			url : "./data/nav.json",
			success : function(res){
				var bannerArr = res.banner;
				for (var i = 0; i < bannerArr.length; i++) {
					/* 创建banner节点 */
					$(`<li style="background: url('./img/indexImg/${bannerArr[i].img}.jpg') no-repeat scroll 50% 0;">
					</li>`).appendTo($("#nav-banner ul"));
					/* 创建小圈圈节点 */
					
					var span = $(`<span></span>`);
					if(i == 0){
						span.addClass("current");
					}
					span.appendTo($("#banner-nav"));
					
				}
			},
			error : function(msg){
				console.log(msg);
			}
		});
		
		slideDowload();
	}
	
	/* 实现轮播 */
	function rotation(){
		var index = 0;//下标
		var oImg = null;//图片
		var oSpan = null;//小圆圈
		
		/* 设置定时器 */
		var timer = setInterval(function(){
			index++;
			tab();
		},2500);
		
		/* 切换 */
		function tab(){
			if(!oImg){
				oImg = $("#nav-banner ul").find("li");
			}
			if(!oSpan){
				oSpan = $("#banner-nav").find("span");
			}
			
			if(index == oImg.length){
				index = 0;
			}
			
			//图片切换
			oImg.hide().css("opacity",0.3).eq(index).show().animate({opacity:1},500);
			
			//小圆圈切换
			oSpan.removeClass("current").eq(index).addClass("current");
		}
	
		/* 鼠标移入移出 */
		
		$("#hot").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(function(){
				index++;
				tab();
			},2500);
		});
		
		/* 点击小圆圈 进行切换 */
		$("#banner-nav").on("mouseover","span",function(){
			index = $(this).index();
			tab();
		})
		
		/* 点击左右切换 */
		$(".button-next,.button-prev").click(function(){
			if(this.className == "button-prev"){
				index--;
				if(index == -1){
					index = $("#nav-banner ul").find("li").length - 1;
				}
			}else{
				index++;
			}
			tab();
			return false;
		})
	}
	
	/* 侧边栏的数据加载 */
	function slideDowload(){
		$.ajax({
			type:"get",
			url:"./data/nav.json",
			success:function(res){
				var slideArr = res.slide;
				/* console.log(slideArr); */
				for (var i = 0; i < slideArr.length; i++) {
					var childArr = slideArr[i].child;
					var col = Math.ceil(childArr.length / 5);
					/* 父节点 */
					var node = $( `<li class="category-item">
							<div class="categoroy-info">
								<a href="">
									${slideArr[i].title}
								</a>
							</div>
							
							<div class="category-panels" style="width:${col * 242}px">
							</div>
						</li>`);
					node.appendTo("#slide-nav");
					
					/* 子节点 */
					for (var j = 0; j < childArr.length; j++) {
						if(j % 5 == 0){
							var newUl = $(`<ul id="panels-id" class="panels-list clear-fix">
								</ul>`);
							
							newUl.appendTo(node.find("div.category-panels"));
						}
						$(`<li class="panels-item">
										<a href="#">
											<img src="${childArr[j].img}" >
											<p>
												<span>${childArr[j].name}</span>
											</p>
										</a>
									</li>`).appendTo(newUl);
					}
					
				}
			},
			error:function(msg){
				console.log(msg);
			}
		});
	}
	
	/* 给侧边导航栏添加移入移出效果 */
	function slideTab(){
		$("#slide-nav").on("mouseenter",".category-item",function(){
			$(this).find(".category-panels").show();
			$(this).css("background","rgba(240,240,240,1)");
		}).on("mouseleave",".category-item",function(){
			$(this).find(".category-panels").hide();
			$(this).css("background","none");
			
		});
		
		$("#slide-nav").on("mouseenter",".panels-item",function(){
			$(this).css("background","rgba(240,240,240,1)");
		}).on("mouseleave",".panels-item",function(){
			$(this).css("background","none");
		});
	}
	
	
	return {
		rotationDowload : rotationDowload,
		rotation : rotation,
		slideTab : slideTab,
	}
})
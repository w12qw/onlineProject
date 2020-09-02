define(["jquery"],function($){
	//滑动的数据加载
	function slideDowload(){
		$.ajax({
			type : "get",
			url : "./data/slide.json",
			success : function(res){
				var slideArr = res.list;
				/* console.log(slideArr); */
				for (var i = 0; i < slideArr.length; i++) {
					var node = null;
					if(slideArr[i].news == ""){
						node =$(`<li class="grid-items">
										<a href="" class="items-info">
											<div class="grid-info">
												<p class="grid-img">
													<img src="${slideArr[i].img}" >
												</p>
												<p class="grid-desc">${slideArr[i].desc}</p>
											</div>
											<div class="grid-title">
												${slideArr[i].title}
											</div>
											<p class="grid-price">${slideArr[i].price}</p>
										</a>
									</li>`); 
					}else{
						node = $(`<li class="grid-items">
										<a href="" class="items-info">
											<div class="grid-info">
												<p class="grid-img">
													<img src="${slideArr[i].img}" >
												</p>
												<p class="grid-desc">${slideArr[i].desc}</p>
											</div>
											<div class="grid-title">
												${slideArr[i].title}
											</div>
											<p class="grid-price">${slideArr[i].price}</p>
											<p class="grid-tips">
												<em class="grid-em">
													<span class="grid-new">${slideArr[i].news}</span>
												</em>
											</p>
										</a>
									</li>`);
					}
					node.appendTo("#quality-items");
				}
				slideRoll(slideArr.length);
			},
			error : function(msg){
				console.log(msg);
			}
		});
		
	}
	
	/* 滚动 */
	function slideRoll(sum){
		/* var oBtn = $("[name='grid-btn']"); */
		var oBtn = $(".grid-btn");
		var index = 0;
		var ans = Math.ceil(sum / 5) - 1;
		var timer = setInterval(function(){
			index++;
			if(index > ans){
				clearInterval(timer);
				return;
			}
			rotationRoll();
			
		},5000);
		
		/* 自动移动 */
		function rotationRoll(){
			index == 0 ? oBtn.eq(0).addClass("btn-disable") : oBtn.eq(0).removeClass("btn-disable");
			index == ans ? oBtn.eq(1).addClass("btn-disable") : oBtn.eq(1).removeClass("btn-disable");
			var left = index == ans ? -index * 1210 + 242 * (5 - sum % 5) : -index * 1210;
			$("#quality-items").css({
				transform:`translate3d(${left}px,0,0)`,
				
				transitionDuration:"1000ms"
			});
		}
		
		/* 左箭头 右箭头 */
		oBtn.click(function(){
			console.log($(this).index());
			if($(this).index()-1 == 0){
				index--;
				if(index <= 0)
					index = 0;
			}else{
				index++;
				if(index >= ans)
					index = ans;
			}
			
			rotationRoll();
		})
		
		/* 鼠标移入移出 */
		$("#quality-box").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(function(){
				index++;
				if(index > ans){
					clearInterval(timer);
					return;
				}
				rotationRoll();
			},5000);
		})
	}
	
	/* 中间内容轮播图 */
	/* 动态获取json数据 */
	function rotationDowload(){
		$.ajax({
			type : "get",
			url : "./data/slide.json",
			success : function(res){
				var dataArr = res.banner;
				/* console.log(dataArr); */
				for (var i = 0; i < dataArr.length; i++) {
					$(`<li class="slider-item">
								<div class="slider-item-img">
									<a href="#">
										<img src="${dataArr[i].img}" >
									</a>
								</div>
							</li>`).appendTo("#slider-list-banner");
							
					var span = $(`<span></span>`);
					if(i == 0){
						span.addClass("current");
					}
					span.appendTo("#slider-nav-span");
					
				}
			},
			error : function(msg){
				console.log(msg);
			}
		})
		rotation();
	}
	
	/* 轮播 */
	function rotation(){
		var index = 0;
		var oImg = null;
		var oSpan = null;
		
		var timer = setInterval(function(){
			index++;
			bannerTab();
		},2500);
		
		/* 轮播方法 */
		function bannerTab(){
			if(!oImg){
				oImg = $("#slider-list-banner").find("li");
			}
			if(!oSpan){
				oSpan = $("#slider-nav-span").find("span");
			}
			/* 判断是否到最后一张 */
			if(index == oImg.length){
				index = 0;
			}
			
			/* 图片 */
			oImg.hide().css("opacity",0.3).eq(index).show().animate({opacity:1},500);
			
			/* 小圆圈 */
			oSpan.removeClass("current").eq(index).addClass("current");
		}
		
		/* 鼠标移入移出轮播停止 */
		$("#m-banner-rotation").mouseenter(function(){
			clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(function(){
				index++;
				bannerTab();
			},2500);
		})
		
		/* 小圆圈的移入移出 */
		$("#slider-nav-span").on("mouseover","span",function(){
			index = $(this).index();
			bannerTab();
		})
		
	}
	
	return {
		slideDowload:slideDowload,
		rotationDowload:rotationDowload
	}
})

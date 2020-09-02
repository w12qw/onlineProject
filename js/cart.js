define(["jquery"],function($){
	function shoppingCart(){
		/* 先加载数据 */
		$.ajax({
			type : "get",
			url : "data/goods.json",
			success : function(res){
				var goodsArr = JSON.parse(localStorage.getItem("goods"));
				var uId = 1;
				var newArr = [];
				if(goodsArr == null){
					$("#total").hide();
					$(".cart-list").hide();
					$(".cart-empty").show();
				}else{
					$("#total").show();
					$(".cart-list").show();
					$(".cart-empty").hide();
					for (var i = 0; i < goodsArr.length; i++) {
						if(goodsArr[i].uId == uId){
							for (var j = 0; j < res.length; j++) {
								if(goodsArr[i].gId == res[j].goodsId){
									newArr.push({
										goodsId : goodsArr[i].gId,
										goodsImage : res[j].goodsImage,
										goodsName : res[j].goodsName,
										goodsPrice : res[j].goodsPrice,
										number : goodsArr[i].num
									});
								}
							}
						}
					}
					/* newArr 存储了购物车的id  image  等信息 */
					if(newArr == ""){
						$("#total").hide();
						$(".cart-list").hide();
						$(".cart-empty").show();
					}else{
						$("#total").show();
						$(".cart-list").show();
						$(".cart-empty").hide();
						for (var i = 0; i < newArr.length; i++) {
							$(`<div class="goods-item clearfix" id="${newArr[i].goodsId}">
									<label class="checkbox">
										<input class="vam" readonly="readonly">
									</label>
									<div class="goods-area">
										<div class="goods-main clear-fix">
											<a class="p-img" href="detail.html?goodsId=${newArr[i].goodsId}">
												<img src="${newArr[i].goodsImage}" >
											</a>
											<ul>
												<li>
													<a class="p-name" href="">
														${newArr[i].goodsName}
													</a>
												</li>
												<li>
													<div class="p-price">
														<span>${newArr[i].goodsPrice}</span>
													</div>
												</li>
												<li>
													<div class="p-stock">
														<div class="p-stock-area">
															<input type="text" class="p-stock-text" value="${newArr[i].number}">
															<p class="stock-btn">
																<a class="btn-left">-</a>
																<a class="btn-right">+</a>
															</p>
														</div>
													</div>
												</li>
												<li class="p-price-total">
													${parseInt(newArr[i].number) * newArr[i].goodsPrice.split("¥")[1]}
												</li>
												<li>
													<a href="#" class="p-del">
														删除
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>`).appendTo(".goods-list");
						}
						isAllCheck();
					}
					
				}
				
				
			},
			error : function(msg){
				console.log(msg);
			}
		})
	}
	
	/* 实现全选和单选按钮的点击效果 */
	function check(){
		/* 全选 */
		$(".cart-title .checkbox input").click(function(){
			/* 获取每个节点 */
			var node = $(".goods-list").find(".goods-item label").find("input");
			if($(this).hasClass("checked")){
				$(this).add(node).add($(".total-tool .total-control input")).removeClass("checked");
			}else{
				$(this).add(node).add($(".total-tool .total-control input")).addClass("checked");
			}
			isAllCheck();
		})
		
		/* 单个点击 */
		
		$(".goods-list").on("click",".goods-item label input",function(){
			if($(this).hasClass("checked")){
				$(this).removeClass("checked");
			}else{
				$(this).addClass("checked");
			}
			isAllCheck();
		})
		
		/* 结算的时候的全选 */
		$(".total-tool .total-control input").click(function(){
			var node = $(".goods-list").find(".goods-item label").find("input");
			if($(this).hasClass("checked")){
				$(this).add(node).add($(".cart-title .checkbox input")).removeClass("checked");
			}else{
				$(this).add(node).add($(".cart-title .checkbox input")).addClass("checked");
			}
			isAllCheck();
		})
	}
	
	
	/* 计算有多少个按钮被选中 */
	function isAllCheck(){
		var total = 0;//计算选了多少个商品的总价
		var isCheckedAll = true;
		var allCheck = $(".goods-list").find(".goods-item");
		var count = 0;//计算被选中商品的数量
		allCheck.each(function(index,item){
			if(!$(item).find("label input").hasClass("checked")){
				isCheckedAll = false;
			}else{
				total += parseFloat($(item).find(".goods-area .goods-main ul .p-price-total").html().trim());
				count += parseInt($(item).find(".goods-area .goods-main ul .p-stock .p-stock-area input").val());
			}
			
		})
		
		$("#total .total-tool .total-price p span em").html(total);
		$("#total .total-tool .total-price .total-choice em").html(count);
		
		//判断是否全选
		if(isCheckedAll){
			$(".cart-title .checkbox input").add($(".total-tool .total-control input")).addClass("checked");
		}else{
			$(".cart-title .checkbox input").add($(".total-tool .total-control input")).removeClass("checked");
		}
	}
	
	/* 删除和对商品的加减操作 */
	function changeGoods(){
		/* 删除操作 */
		$(".goods-list").on("click",".goods-item .goods-area .goods-main ul .p-del",function(){
			var id = $(this).closest(".goods-item").attr("id");
			$(this).closest(".goods-item").remove();
			var uId = 1;
			var goodsInfo = JSON.parse(localStorage.getItem("goods"));
			for (var i = 0; i < goodsInfo.length; i++) {
				if(goodsInfo[i].uId == uId){
					if(goodsInfo[i].gId == id){
						goodsInfo.splice(i,1);
						break;
					}
				}
			}
			
			goodsInfo.length == 0 ? localStorage.clear() : localStorage.setItem("goods",JSON.stringify(goodsInfo));
			shoppingCart();
			return false;
		})
		
		/* 加减操作 */
		$(".goods-list").on("click",".btn-left,.btn-right",function(){
			var id = $(this).closest(".goods-item").attr("id");
			var uId = 1;
			var goodsInfo = JSON.parse(localStorage.getItem("goods"));
			for (var i = 0; i < goodsInfo.length; i++) {
				if(goodsInfo[i].uId == uId){
					if(goodsInfo[i].gId == id){
						if(this.className == "btn-left"){
							if(goodsInfo[i].num <= 1){
								goodsInfo[i].num = 1;
							}else{
								goodsInfo[i].num--;
							}
						}else{
							goodsInfo[i].num++;
						}
						
						$(this).closest(".stock-btn").siblings("input").val(goodsInfo[i].num);
						var price = parseInt($(this).closest("ul").find(".p-price span").html().split("¥")[1]);
						var sum = price * goodsInfo[i].num;
						$(this).closest("ul").find(".p-price-total").html(sum);
						break;
					}
				}
			}
			localStorage.setItem("goods",JSON.stringify(goodsInfo));
			isAllCheck();
			return false;
		})
	}
	
	return {
		shoppingCart : shoppingCart,
		check : check,
		changeGoods : changeGoods
	}
})
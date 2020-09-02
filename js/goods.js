define(["jquery"],function($){
	/* 动态显示手机部分商品 */
	function showPhone(){
		$.ajax({
			type : "get",
			url : "data/goods.json",
			success : function(res){
				var goodsArr = res;
				/* console.log(goodsArr); */
				for (var i = 0; i < goodsArr.length; i++) {
					if(i == 0){
						$(`<li class="grid-items first-li">
								<a href="detail.html?goodsId=${goodsArr[i].goodsId}" class="grid-hot">
									<img src="${goodsArr[i].goodsImage}" >
								</a>
							</li>`).appendTo("#phoneList")
					}else{
						$(`<li class="grid-items">
								<a href="detail.html?goodsId=${goodsArr[i].goodsId}" class="grid-hot">
									<p class="grid-img">
										<img src="${goodsArr[i].goodsImage}" >
									</p>
									<div class="grid-title">
										${goodsArr[i].goodsTitle}
									</div>
									<p class="grid-desc">${goodsArr[i].goodsDesc}</p>
									<p class="grid-price">${goodsArr[i].goodsPrice}</p>
								</a>
							</li>`).appendTo("#phoneList")
					}
				}
			},
			error : function(msg){
				console.log(msg);
			}
		})
	}
	
	
	
	return {
		showPhone : showPhone
	}
})
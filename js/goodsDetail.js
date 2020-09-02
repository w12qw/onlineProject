define(["jquery"],function(){
	//获取商品的id
	function getId(){
		var id = valueByName(location.search,"goodsId");
		$.ajax({
			type : "get",
			url : "data/goodsDetail.json",
			success : function(res){
				/* 获取相应的值 */
				var goodsInfo = res.find(item => item.goodsId == id);
				$(`<div class="left">
				<div class="product-catalogry">
					<a href="#" class="product-a">
						<img src="${goodsInfo.goodsImage}" >
					</a>
				</div>
			</div>
			<div class="right">
				<div class="product-info clear-fix">
					<!-- 名字 -->
					<div class="product-info-name clear-fix">
						<div class="product-name clear-fix">
							<span>
								${goodsInfo.goodsName}
							</span>
						</div>
					</div>
					<!-- 优惠 -->
					<div class="product-info-name clear-fix">
						<label>优        惠</label>
						<div class="product-name clear-fix">
							<span class="discount">
								${goodsInfo.goodsDesc}
							</span>
							<a class="discount-receive" href="#">
								立即领取>
							</a>
						</div>
					</div>
					<!-- 价格 -->
					<div class="product-info-name clear-fix">
						<label>价        格</label>
						<div class="product-name clear-fix">
							<span class="product-price">
								<em>¥</em>
								${goodsInfo.goodsPrice}
							</span>
						</div>
					</div>
				</div>
			
				<div class="product-operation">
					<div class="pro-quantity-area">
						<input class="num-text" type="text" name="" id="inputContent" value="1" placeholder="1" />
						<p class="p-btn">
							<a href="#" id="btn-top">+</a>
							<a class="disabled" href="#" id="btn-bottom">-</a>
						</p>
					</div>
					
					<div class="product-buttonmain">
						<div class="product-button">
							<a href="cart.html" class="product-button1">
								<span>加入购物车</span>
							</a>
							
							<a href="#" class="product-button2">
								<span>立即下单</span>
							</a>
						</div>
					</div>
				</div>
			</div>`).appendTo("#productInfo");
				
			/* 计算总共的数值 */
			var total = calculation();
			
			$("#common").find("#shopping-cart-total").html(total);	
			
			},
			error : function(msg){
				console.log(msg);
			}
		})
	}
	/* 点击购物车将商品添加到本地
		点击+-对商品数量进行运算 
		计算出本地一共存储了多少件商品
	 */
	
	function addCart(){
		/* 先获取id值 */
		var gId = valueByName(location.search,"goodsId");
		var uId = 1;
		/* 点击加入购物车 */
		$("#productInfo").on("click",".product-button1",function(){
			var num = parseInt($("#productInfo").find(".num-text").val());
			console.log(num);
			/* 设置localStorage的数据格式 */
			var saveData = [{
				uId : uId,
				gId : gId,
				num : num
			}]
			
			var goodsMesg = localStorage.getItem("goods");
			if(!!goodsMesg){
				/* localStorage里面存在商品信息 */
				var goodsArr = JSON.parse(goodsMesg);
				var hasGId = false;
				for (var i = 0; i < goodsArr.length; i++) {
					if(goodsArr[i].uId == uId && goodsArr[i].gId == gId){
						//证明是这个用户登陆的并且已经买过这本书了
						goodsArr[i].num += num;
						hasGId = true;
						break;
					}
				}
				//循环没有找到的话就代表买的新的商品
				if(!hasGId){
					goodsArr.push({
						uId : uId,
						gId : gId,
						num : num
					});
				}
				
				//最后将信息保存
				localStorage.setItem("goods",JSON.stringify(goodsArr));
					
			}else{
				localStorage.setItem("goods",JSON.stringify(saveData));
			}
			/* 计算总共的数值 */
			var total = calculation();
			
			$("#common").find("#shopping-cart-total").html(total);	
		})
		
		$("#productInfo").on("click","#btn-top",function(){
			var num = $("#productInfo").find(".num-text").attr("value");
			num++;
			if(num > 1){
				$(this).siblings().removeClass("disabled");
			}
			$("#productInfo").find(".num-text").val(num);
		}).on("click","#btn-bottom",function(){
			var num = $("#productInfo").find(".num-text").attr("value");
			if(num == 2){
				num--;
				$(this).addClass("disabled");
			}else if(num <= 1){
				$(this).addClass("disabled");
			}else{
				num--;
			}
			$("#productInfo").find(".num-text").val(num);
		})
		
	}
	
	function calculation(){
		var goodsMesg = localStorage.getItem("goods");
		var uId = 1;
		var num = 0;
		if(!!goodsMesg){
			var arr = JSON.parse(goodsMesg);
			
			for (var i = 0; i < arr.length; i++){
				if(arr[i].uId == uId){
					num += arr[i].num;
				}
			}
			
			
		}
		return num;
	}
	
	//获取当前url地址上？后面的数据
	function valueByName(search,param){
		var start = search.indexOf(name + "=");
		if(start == -1){
			return null;
		}else{
			var end = search.indexOf("&",start);
			if(end == -1){
				end = search.length;
			}
			var str = search.substring(start,end);
			var arr = str.split("=");
			return arr[1];
		}
	}
	
	return {
		getId : getId,
		addCart : addCart
	}
})
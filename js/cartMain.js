require.config({
	paths:{
		"jquery" : "jquery.min",
		"jquery-cookie" : "jQuery.cookie",
		"cart" : "cart"
	},
	shim:{
		//设置依赖关系
		"jquery-cookie":["jquery"]
	}
});

require(["cart"],function(cart){
	cart.shoppingCart();
	cart.check();
	cart.changeGoods();
})
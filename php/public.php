<?php
	header("Content-type:text/html;charset=uft-8");
	
	function getConnector($sql){
		$conn = mysqli_connect("localhost","root","123456","huawei");
		mysqli_query($conn,"set names utf8");
		$result = mysqli_query($conn,$sql);
		return $result;
	}
?>
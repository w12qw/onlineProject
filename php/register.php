<?php
	include("public.php");
	$username = $_POST["username"];
	$phone = $_POST["phone"];
	$password = $_POST["password"];
	
	$sql = "insert into user(username,phone,pass) values('$username','$phone','$password')";
	$result = getConnector($sql);

	if($result){
		echo "1";
	}else{
		echo "0";
	}
?>
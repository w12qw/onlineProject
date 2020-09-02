<?php
    include("public.php");
    $phone = $_POST["phone"];
    $pass = $_POST["pass"];

    $sql = "select * from user where phone = '$phone'";
    $result = getConnector($sql);
    $arr = mysqli_fetch_assoc($result);
    $msg = "";
    if($arr){
        if($arr["pass"] == $pass){
            echo 0;
        }else{
            echo 1;
        }
    }else{
        echo 2;
    }
?>
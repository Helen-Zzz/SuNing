<?php
    $conn = new mysqli('localhost','root','','suning');
    if($conn->connect_error){
        echo "连接失败";
        return;
    } 
    $conn->query("set names utf8");

?>
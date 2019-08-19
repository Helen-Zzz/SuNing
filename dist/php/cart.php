<?php
    header('content-type:application/json');
    if(!empty($_COOKIE['userid'])){
        $userid = $_COOKIE['userid'];
    } else {
        echo 'null';
        return;
    }

    $conn = new mysqli('localhost','root','','suning');
    if($conn->connect_error){
        echo "连接失败";
        return;
    } 
    $conn->query("set names utf8");
    
    $sql = "
        select `goodsname`,`img`,`describe`,`price`,`count`,`id` from `userid_cart`
        where `userid`=$userid
    ";
    $result = $conn->query($sql);
    $resp = array();
    if($result && $result->num_rows>0){
        $row = $result->fetch_assoc();
        while($row !== null){
            $resp[] = $row;
            $row = $result->fetch_assoc();
        }
        echo json_encode($resp);
    } else {
        echo 'null';
    }
?>
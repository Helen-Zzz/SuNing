<?php
    include './common.php';
    // header('content-type:application/json');

    $goodsid=$_POST['goodsid'];
    $sql ="
        delete from `userid_cart`
        where `id`='$goodsid'
    ";
    $result=$conn->query($sql);
    if($result){
        echo 'true';
    } else {
        echo 'false';
    };

    $conn->close()
?>
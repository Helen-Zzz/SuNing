<?php
    header('content-type:application/json');
    $conn = new mysqli('localhost','root','','suning');
    if($conn->connect_error){
        echo '数据库连接失败';
        return;
    }
    // $conn->query('set names utf8');

    $phone = $_POST['phone'];
    $pw = $_POST['pw'];
    $sql = "
        select `id` from `name_pw`
        where `phone`='$phone' and `password`='$pw'
    ";
    $result = $conn->query($sql);
    if($result && $result->num_rows>0){
        $user = $result->fetch_assoc();
        $userid = $user['id'];
        header("set-cookie:userid=$userid;path=/");
        echo '{"result":true}';
    }else{
        echo'{"result":false}';
    }


    $conn->close()
?>
<?php
header('content-type:application/json');
$conn = new mysqli('localhost','root','','suning');
if($conn->connect_error){
    echo '数据库连接失败';
    return;
}
// $conn->query('set names utf8');

// $name = $_POST['name'];
$phone = $_POST['phone'];
$pw=$_POST['pw'];

$sql = "
    select `id` from `name_pw`
    where `phone`='$phone'
";
$result = $conn->query($sql);
if($result->num_rows>0){
    echo '{"result":"chong"}';
    return;
}

$sql2 = "
    insert into `name_pw`
    (`id`,`phone`,`password`)
    values
    (null,'$phone','$pw')
";
$result2 = $conn->query($sql2);
if( $result2){
    echo '{"result":true}';
} else {
    echo '{"result":false}';
}

$conn -> close()


?>
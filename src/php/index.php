<?php
header('content-type:application/json');
$conn = new mysqli('localhost','root','','suning');
if($conn->connect_error){
    echo '数据库连接失败';
    return;
}
$conn->query('set names utf8');
$id = $_POST['id'];
$sql = "
    select `phone` from `name_pw`
    where `id`='$id'
";
$result=$conn->query($sql);
if($result && $result->num_rows>0){
    $user = $result->fetch_assoc();
    $name = $user['phone'];
    echo $name;
} else {
    echo "null";
}

?>
<?php
header('content-type:application/json');
$conn=new mysqli('localhost','root','','suning');
if($conn->connect_error){
    echo '数据库连接失败';
    return;
}
$conn -> query('set names utf8');

$goodsname=$_POST['goodsname'];
$describe=$_POST['describe'];
$price=$_POST['price'];
$count=$_POST['count'];
$userid=$_POST['userid'];

$sql="
    insert into `userid_cart`
    (`id`,`userid`,`goodsname`,`count`,`price`,`describe`)
    values
    (null,'$userid','$goodsname','$count','$price','$describe')
";
$result = $conn->query($sql);
if($result){
    echo '{"result":true}';
} else {
    echo '{"result":false}';
}


?>
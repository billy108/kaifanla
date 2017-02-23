<?php
    //读取客户端提交的数据:start - 想要从哪条记录开始获取
    $start = $_REQUEST['start'];
    $size = 1;//一次可以返回给客户端的最大记录数

    $conn = mysqli_connect("127.0.0.1","root","","kaifanla");

    mysqli_query($conn, "SET NAMES UTF8");
    $sql = "SELECT id, name, img, material FROM dish LIMIT $start,$size";
    $result = mysqli_query($conn, $sql);
    $outputArr = [];//用于保存查询到的所有记录
    while($row = mysqli_fetch_array($result, MYSQL_ASSOC)){
        $outputArr[] = $row;//把查得的一行记录保存到输出的数组
    }
    sleep(1);
    //php数组格式化一个字符串
    echo json_encode($outputArr);

?>
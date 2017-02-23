<?php
    $dno = $_REQUEST["dno"];
    $conn = mysqli_connect("127.0.0.1","root","","kaifanla");
    mysqli_query($conn, "SET NAMES UTF8");
    $sql = "SELECT name, img_l, material, detail FROM dish WHERE id='$dno'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result, MYSQL_ASSOC);
    sleep(1);
    echo json_encode($row);
?>
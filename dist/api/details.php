<?php
    include 'conn.php';

    $gid = isset($_GET['gid']) ? $_GET['gid'] : '';

    $sel = "SELECT * FROM glist WHERE gid=$gid";
    $res = $conn -> query($sel);
    $arr = $res -> fetch_all(MYSQLI_ASSOC);
    echo json_encode($arr)
?>
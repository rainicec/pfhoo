<?php
    include 'conn.php';

    $sel1 = "SELECT * FROM goods WHERE name LIKE '%戒指%' LIMIT 0,8";
    $sel2 = "SELECT * FROM goods WHERE name LIKE '%项链%' LIMIT 0,8";
    $sel3 = "SELECT * FROM goods WHERE name LIKE '%耳%' LIMIT 0,8";
    $sel4 = "SELECT * FROM goods WHERE name LIKE '%手镯%' LIMIT 0,8";
    $sel5 = "SELECT * FROM goods WHERE name LIKE '%手链%' LIMIT 0,8";
    $sel6 = "SELECT * FROM goods WHERE name LIKE '%脚链%' LIMIT 0,8";

    $res1 = $conn -> query($sel1);
    $cont1 = $res1 -> fetch_all(MYSQLI_ASSOC);
    $res2 = $conn -> query($sel2);
    $cont2 = $res2 -> fetch_all(MYSQLI_ASSOC);
    $res3 = $conn -> query($sel3);
    $cont3 = $res3 -> fetch_all(MYSQLI_ASSOC);
    $res4 = $conn -> query($sel4);
    $cont4 = $res4 -> fetch_all(MYSQLI_ASSOC);
    $res5 = $conn -> query($sel5);
    $cont5 = $res5 -> fetch_all(MYSQLI_ASSOC);
    $res6 = $conn -> query($sel6);
    $cont6 = $res6 -> fetch_all(MYSQLI_ASSOC);

    $goodslist = array(
        'ring' => $cont1,
        'necklace' => $cont2,
        'earrings' => $cont3,
        'bangle' => $cont4,
        'bracelet' => $cont5,
        'anklet' => $cont6
    );

    echo json_encode($goodslist)
?>
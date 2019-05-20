<?php
    include 'conn.php';
    $num = isset($_GET['num']) ? $_GET['num'] : 60;
    $ipage = isset($_GET['ipage']) ? $_GET['ipage'] : 1;
    $isud = isset($_GET['isud']) ? $_GET['isud'] : 'up';
    

    $index = ($ipage - 1) * $num;
    if($isud == 'up'){
        $sel = "SELECT * FROM glist LIMIT $index,$num";
    }else{
        $sel = "SELECT * FROM glist  ORDER BY price DESC LIMIT $index,$num";
    };
    
    $res = $conn -> query($sel);
    $arr = $res -> fetch_all(MYSQLI_ASSOC);
   
    $sel2 = 'SELECT * FROM glist';
    $res2 = $conn -> query($sel2);

    $ecarr = array(
        'np' => $arr, 
        'nr' => $res2->num_rows,
        'num' => $num,
        'ipage' => $ipage,
        'isud' => $isud
    );

    echo json_encode($ecarr)
?>
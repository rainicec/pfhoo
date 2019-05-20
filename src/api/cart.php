<?php
    include 'conn.php';

    $user = isset($_GET['user']) ? $_GET['user'] : '';

    $selcek = "SELECT * FROM cart WHERE user=$user";
    $res = $conn -> query($selcek);
    $arr = $res -> fetch_all(MYSQLI_ASSOC);

    
    
    if($res->num_rows > 0){
        $responsearr = array();
        for($j=0;$j<count($arr);$j++){
            $gid = $arr[$j]['gid'];
            $sel = "SELECT * FROM glist WHERE gid=$gid";
            $grow = $conn -> query($sel);
            $garr = $grow -> fetch_all(MYSQLI_ASSOC);
            $garr['num'] = $arr[$j]['num'];
            $garr['id'] = $arr[$j]['gid'];
            $responsearr[$gid] = $garr;
        };

        echo json_encode($responsearr);
    }else{
        echo 'nothing';
    }
?>
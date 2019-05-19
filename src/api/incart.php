<?php
    include 'conn.php';

    $gid = isset($_GET['gid']) ? $_GET['gid'] : '';
    $user = isset($_GET['user']) ? $_GET['user'] : '';
    $num = isset($_GET['num']) ? $_GET['num'] : '';

    $selcek = "SELECT * FROM cart WHERE gid=$gid AND user=$user";
    $res = $conn -> query($selcek);
    $selplus = "INSERT INTO cart(gid,user,num) VALUES($gid,$user,$num)";
    $selchange = "UPDATE cart SET num=$num WHERE user=$user AND gid=$gid";


    if($res->num_rows > 0){
        $reschange = $conn -> query($selchange);
       if($reschange){
           echo 'ok';
       }
    }else{
        $resplus = $conn -> query($selplus);
        if($resplus){
            echo 'ok';
        }
    }
    
?>
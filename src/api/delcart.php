<?php
    include 'conn.php';

    $id = isset($_GET['id']) ? $_GET['id'] : '';
    $user = isset($_GET['user']) ? $_GET['user'] : '';

    $sel = "DELETE FROM cart WHERE gid=$id AND user=$user";
    $row = $conn -> query($sel);

    if($row){
        echo 'yes';
    }else{
        echo 'no';
    }

?>
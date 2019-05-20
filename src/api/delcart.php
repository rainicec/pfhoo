<?php
    include 'conn.php';

    $id = isset($_GET['id']) ? $_GET['id'] : '';

    $sel = "DELETE FROM cart WHERE gid=$id";
    $row = $conn -> query($sel);

    if($row){
        echo 'yes';
    }else{
        echo 'no';
    }

?>
<?php
    include 'conn.php';

    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    if($phone){
        $sel1 = "SELECT * FROM userinf WHERE username=$phone";
        $res1 = $conn -> query($sel1);
        $arr = $res1 -> fetch_all(MYSQLI_ASSOC);

        if($res1->num_rows > 0){
            echo json_encode($arr);
        }else{
            echo 'no';
        }
        
    }
?>
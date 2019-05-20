<?php
    include 'conn.php';

    $phone = isset($_GET['phone']) ? $_GET['phone'] : '';
    $phonenow = isset($_POST['phonenow']) ? $_POST['phonenow'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';

    if($phone){
        $sel1 = "SELECT * FROM userinf WHERE username='$phone'";
        $abc = $conn -> query($sel1);
        if($abc->num_rows > 0){
            echo 'no';
        }else{
            echo 'yes';
        }; 
    };
    if($phonenow){
        $sel2 = "INSERT INTO userinf(username,password) VALUES($phonenow,$psw)";
        $res = $conn -> query($sel2);
        echo $res;
    }
    
?>
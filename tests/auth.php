<?php
$data = file_get_contents('php://input');
$data = json_decode($data, true);
if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($data['email']) && isset($data['pwd'])   ){
    $email = $data['email'];
    $pwd = $data['pwd'];
    if ($email == "boteistem@gmail.com" && $pwd == "123"){
        echo json_encode([
            "status" => "sucesss",
            "msg" => "Auth sucess"
        ]);
    }else{
        echo json_encode([
            "status" => "fail",
            "msg" => "User or Password is not correct"
        ]);
    }
}
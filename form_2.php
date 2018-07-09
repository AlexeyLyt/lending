<?php 

    if( !empty($_REQUEST['name']) && !empty($_REQUEST['email']) && !empty($_REQUEST['wishes']) ){
        //echo "{$_REQUEST['name']} {$_REQUEST['email']}";

        /*
        1. Создать БД с названием june20
        2. В ней табличку clients (с полями id, name, email)
        3. Пользователь admin1 admin1

        */
        $DB_HOST = 'localhost';
        $DB_USER = 'support';
        $DB_PASS = 'support';

        $link = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, 'fast_start');
        mysqli_set_charset($link , "utf8");
        $qr = "INSERT INTO `clients` (`id`, `name`, `email`, `services`) VALUES (NULL, '{$_REQUEST['name']}', '{$_REQUEST['email']}', '{$_REQUEST['wishes']}')";
        $result = mysqli_query($link, $qr);
        
        if($result){
            echo 'ok';
        }else{
            echo 'error';
        }     

    }else{
        echo 'error';
    }

?>
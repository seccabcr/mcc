<?php

require_once 'wsConexion.php';


$conexion = Conexion::getInstance()->getConnection();

$num_prop = $_POST['num_prop'];
$conse_foto = $_POST['conse_foto'];
$uploader_dir = $_POST['uploader_dir'];

$nuevo = false;

if ($conse_foto == 0) {

    $sql = "SELECT conse_fotos FROM propiedades WHERE num_prop=$num_prop";

    $resultado = $conexion->query($sql);
    $registro = $resultado->fetch_assoc();

    $conse_foto = $registro['conse_fotos'] + 1;

    $nuevo=true;
}

//$carpeta = "../../../mcc/fotos/prop" . str_pad($num_prop, 8, '0', STR_PAD_LEFT) . "/";
$carpeta = "../../../mcc/fotos/";

/*if (!is_dir($carpeta)) {

    mkdir($carpeta, 700);
}*/

$tmp_name = $_FILES["archivo"]["tmp_name"];
$name = $carpeta ."prop" . str_pad($num_prop, 6, '0', STR_PAD_LEFT) . "-" . $_FILES["archivo"]["name"];

$url_img = $uploader_dir . "fotos/prop" . str_pad($num_prop, 6, '0', STR_PAD_LEFT) . "-" . $_FILES["archivo"]["name"];


$response = array(
    "status" => "error",
    "msg" => "No se guardo la imagen"
);

if (move_uploaded_file($tmp_name, $name)) {

    $sql = "SELECT * FROM fotos WHERE num_prop=$num_prop AND conse_foto=$conse_foto";

    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {  //Actualiza foto

        $update = "UPDATE fotos SET url_foto='$url_img' WHERE num_prop=$num_prop AND conse_foto=$conse_foto";
        $conexion->query($update);
    } else { // Nueva foto

        $insert = "INSERT INTO fotos (num_prop, conse_foto, url_foto) VALUES($num_prop, $conse_foto, '$url_img')";
        $conexion->query($insert);
    }

    if($nuevo){
        $update = "UPDATE propiedades SET conse_fotos=$conse_foto WHERE num_prop=$num_prop";
        $conexion->query($update);        
    }
  

    $response = array(
        "status" => "success",
        "msg" => "Imagen Guardada",
        "archivo" => $url_img
    );
}


echo json_encode($response);

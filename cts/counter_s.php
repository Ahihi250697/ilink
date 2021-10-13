<?php


session_start();

//GET��pos�𐮐��ɕϊ�
$pos = intval($_GET['pos']);


//�t�@�C����
$fileName = "count.php";

//�t�@�C���ǂݍ���
$file = fopen($fileName, "r+") or die("n");
flock($file, LOCK_EX);
$fileVal = fgets($file, 10000);

//�J�E���g�𑝂₷
$countVal = explode("=", $fileVal);
$num = intval($countVal[1]);

if($pos == "0" && $_SESSION['first'] != "on"){
	$num++;
}else if($pos == "1" && $_SESSION['first'] != "on"){
	$_SESSION['first'] = "on";
}

$writeVal = "count=" . $num . ";";


//�t�@�C����������
if($pos == "0" && $_SESSION['first'] != "on"){
	rewind($file);
	fwrite($file, $writeVal);
}
flock($file, LOCK_UN);
fclose($file);


if($pos != 0){
 
	if(strlen($num) < $pos){
		$imgNum = 0;
	}else{
		$imgNum = substr($num, -$pos, 1);
	}

	//�摜�\��
	//$fileName = "./img/2.gif";
    $imgNum = 2;
	$fileName = "./img/" . $imgNum . ".gif";

	header("Content-Type: image/gif");
    readfile($fileName);
}
?>
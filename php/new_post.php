<?php

// save images

$image = $_FILES['photo']['name'];  

$image_extension = strtolower(pathinfo($image,PATHINFO_EXTENSION));
$random_image_name = strtolower(substr(md5(rand()), 0, 20));
$new_image_name = strtolower($random_image_name.".".$image_extension);
$folder_images = "../img/";

if(!file_exists($folder_images.$new_image_name))
{
	// upload image 
	if(move_uploaded_file($_FILES['photo']['tmp_name'], $folder_images.$new_image_name))
	{
		echo "se guardo la foto";
	}	
}

include_once("config_db.php");

session_start();

$sql = "INSERT INTO calendar (user, photo, description) 
		VALUES (".$_SESSION['calendar'].", '".$new_image_name."', '".$_POST['description']."');";

$mysqli->query($sql);

$mysqli->close();

?>
<?php

include_once("config_db.php");

session_start();

$array = array();

if(isset($_SESSION['calendar']))
{
	$sql = "SELECT id, name, lastname, user, photo, birthday FROM users WHERE id = '".$_SESSION['calendar']."';";
	
	$results = $mysqli->query($sql);
	
	while($row = $results->fetch_assoc())
	{
		$array[] = $row;
	}
}

echo json_encode($array);

$mysqli->close();

?>
<?php
include_once("config_db.php");

$sql = "SELECT id, name, lastname, user, photo, birthday FROM users ";

switch($_GET['type']) 
{
	case 'login':
		$sql .= "WHERE user = '".$_POST['user']."' AND password = '".$_POST['password']."'  LIMIT 1;";
	break;

	case 'view':
		$sql .= "WHERE user = '".$_GET['user']."' LIMIT 1;";
	break;
}

$results = $mysqli->query($sql);

$array = array();

while($row = $results->fetch_assoc())
{
	$array[] = $row;
}

if($_GET['type'] == "login" && $results->num_rows > 0)
{
	session_start();

	$_SESSION['calendar'] = $array[0]['id'];
}

echo json_encode($array);

$mysqli->close();
?>
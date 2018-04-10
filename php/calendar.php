<?php

include_once("config_db.php");

$sql = "SELECT calendar.id, calendar.user, calendar.photo, calendar.description, calendar.date, users.user AS username
		FROM calendar 
		INNER JOIN users
		ON calendar.user = users.id ";

switch($_GET['type']) 
{
	case 'list':
		$sql .= "WHERE users.user = '".$_GET['user']."' AND calendar.date BETWEEN '".$_GET['finish_calendar']."' AND '".$_GET['end_calendar']."';";
	break;

	case 'view':
		$sql .= "WHERE calendar.id = '".$_GET['id_post']."' LIMIT 1;";
	break;
}

if($results = $mysqli->query($sql))
{
	$array = array();

	while($row = $results->fetch_assoc())
	{
		$array[] = $row;
	}

	echo json_encode($array);
}
else
{
	echo "Error: ".$mysqli->error;
}

$mysqli->close();

?>
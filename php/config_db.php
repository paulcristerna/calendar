<?php
// configure database
$username = "root"; //mysql username
$password = ""; //mysql password
$hostname = "localhost"; //hostname
$databasename = 'calendar'; //databasename

//connect to database
$mysqli = new mysqli($hostname, $username, $password, $databasename);
?>
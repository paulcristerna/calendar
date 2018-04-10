<?php
session_start();

$_SESSION = array();

if(session_destroy())
{
	echo "exito";
}
else
{
	echo "falla";
}
?>
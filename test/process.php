<?php

if (! empty($_POST))
{
	//form validation vars
	$formok = true;
	$errors = array();
	
	//sumbission data
	$ipaddress = $_SERVER['REMOTE_ADDR'];
	$date = date('d/m/Y');
	$time = date('H:i:s');
	
	//form data
	$name = strip_tags($_REQUEST['name']);
	$email = $_REQUEST['email'];
	$message = strip_tags($_REQUEST['message']);

	//validate name is not empty
	if(empty($name)){
		$formok = false;
		$errors['name'] = "You have not entered a name";
	}
	
	//validate email address is not empty
	if(empty($email)){
		$formok = false;
		$errors['email'] = "You have not entered an email address";
	//validate email address is valid
	}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$formok = false;
		$errors['email'] = "You have not entered a valid email address";
	}
	
	//validate message is not empty
	if(empty($message)){
		$formok = false;
		$errors['message'] = "You have not entered a message";
	}
	//validate message is greater than 20 charcters
	elseif(strlen($message) < 20){
		$formok = false;
		$errors['message'] = "Your message must be greater than 20 characters";
	}
	
	header('Content-Type: application/json');
	echo json_encode(array('success' => $formok, 'errors' => $errors));
}
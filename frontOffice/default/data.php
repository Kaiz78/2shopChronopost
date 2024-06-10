<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "../../Controller/ChronopostPickupPointRelayController.php";

$pickup_points = new ChronopostPickupPointRelayController();


$code_country = [
"FRANCE"=>"FR",
"ANGLETERRE"=> "GB",
"ESPAGNE"=> "ES",
];
 


//
if(isset($_POST) && !empty($_POST) ){
  // Par défaut
  $_POST['type'] = 'P';
  $_POST['productCode'] = '5X';
  $_POST['service'] = 'T';
  $_POST['weight'] = '1';
  $_POST['shippingDate'] = date('d/m/Y');
  $_POST['maxPointChronopost'] = '10';
  $_POST['maxDistanceSearch'] = '10';
  $_POST['holidayTolerant'] = '1';
  $_POST['language'] = 'fr';
  $_POST['version'] = '2.0';
  $_POST['city'] = '.';
  $_POST['address'] = '.';
  $data = [
    "adress" => $_POST['address'],
    "zipCode" => $_POST['zipcode'],
    "city" => $_POST['city'],
    "countryCode" => $code_country[$_POST['country']],
    "type" => $_POST['type'],
    "productCode" => $_POST['productCode'],
    "service" => $_POST['service'],
    "weight" => $_POST['weight'],
    "shippingDate" => $_POST['shippingDate'],
    "maxPointChronopost" => $_POST['maxPointChronopost'],
    "maxDistanceSearch" => $_POST['maxDistanceSearch'],
    "holidayTolerant" => $_POST['holidayTolerant'],
    "language" => $_POST['language'],
    "version" => $_POST['version'],
  ];



  $pickup_points = $pickup_points->findByAddress($data);
  
  header("Content-type: application/json"); 
  echo json_encode($pickup_points);
  exit();
}else{
  header("Content-type: application/json"); 
  echo json_encode(array());
  exit();
}

?>
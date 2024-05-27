<?php

include "../../Controller/ChronopostPickupPointRelayController.php";

$chrono = new ChronopostPickupPointRelayController();


// date tomorrow
$datetime = new \DateTime('tomorrow');
$tomorrow = $datetime->format('d/m/Y');



if(isset($_POST) && !empty($_POST)){
  // $data object
  $data = [
    "adress" => $_POST['adress'],
    "zipCode" => $_POST['zipCode'],
    "city" => $_POST['city'],
    "countryCode" => "FR",
    "type" => "T",
    "productCode" => "58",
    "service" => "T",
    "weight" => "1",
    "shippingDate" => $tomorrow,
    "maxPointChronopost" => "10",
    "maxDistanceSearch" => "10",
    "holidayTolerant" => 1,
    "language" => "FR",
    "version" => "2.0",
  ];

  $chrono->findByAddress($data);
  echo "<pre>";
  var_dump($chrono->findByAddress($data));die;
}

?>

<div>

<form action="" method="POST">
<label for="">
  Adresse
  <input type="text" name="adress">
</label>
<label for="">
  Code postal
  <input type="text" name="zipCode">
</label>
<label for="">
  Ville
  <input type="text" name="city">
</label>

<input type="submit" value="envoyer">

</form>
</div>
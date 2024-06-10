<?php


require_once(dirname(__FILE__) . '/meta.php');

include "../../Controller/ChronopostPickupPointRelayController.php";

$chrono = new ChronopostPickupPointRelayController();


// date tomorrow
$datetime = new \DateTime('tomorrow');
$tomorrow = $datetime->format('d/m/Y');



// if(isset($_POST) && !empty($_POST)){
//   // $data object
//   $data = [
//     "adress" => $_POST['adress'],
//     "zipCode" => $_POST['zipCode'],
//     "city" => $_POST['city'],
//     "countryCode" => "FR",
//     "type" => "T",
//     "productCode" => "58",
//     "service" => "T",
//     "weight" => "1",
//     "shippingDate" => $tomorrow,
//     "maxPointChronopost" => "10",
//     "maxDistanceSearch" => "10",
//     "holidayTolerant" => 1,
//     "language" => "FR",
//     "version" => "2.0",
//   ];

//   $chrono->findByAddress($data);
//   echo "<pre>";
//   var_dump($chrono->findByAddress($data));die;
// }

?>

<style>
  #map {
    height: 600px;
    width: 100%;
  }


  .d-flex-custom {
    display: flex;
  }

  @media screen and (max-width: 600px) {
    .d-flex-custom {
      display: flex;
      flex-direction: column;

      flex-direction: column-reverse;
    }

  }
</style>




<div class="mt-3 container">
  <div class="search">
    <ul class="d-flex justify-content-center gap-1 remove-dots">
      <li>
        <span>&nbsp;</span>
        <select class="custom-select form-control-lg" id="address_country" name="address_country" required data-required-message="Veuillez renseigner ce champ." style="max-width: 385px;">
          <option value="FRANCE">FRANCE</option>
          <option value="ANGLETERRE">ANGLETERRE</option>
          <option value="ESPAGNE">ESPAGNE</option>
        </select>
      </li>
      <li>
        <span>&nbsp;</span>
        <input type="text" name="zipcode-city" id="zipcode-city" class="required form-control" maxlength="38" placeholder="Code postal /Ville">
      </li>

      <li class="d-flex flex-column" style="display:flex;flex-wrap: wrap;align-content: flex-start;justify-content: flex-end;align-items: center;">
        <span>&nbsp;</span>
        <button class="btn btn-second search_relais" style="max-height: 38px;/* text-align: center; */align-items: center;display: flex;">
          Rechercher
        </button>
      </li>
    </ul>
  </div>


  <div class="container w-75" id="map"></div>

  <div class=" d-flex justify-content-center">
    <div class="result-code">
      <p class="title_relai"></p>
      <div id="relais_id"></div>
    </div>

  </div>

</div>









<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>



<script>
  async function reverseGeocode(lat, lng) {
    var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }





  // Ajax
  $(document).ready(function() {
    let formDelivery = $('.formDelivery');

    // Initialisation de la carte et configuration de sa vue initiale
    var map = L.map('map', {
      center: [48.8566, 2.3522],
      zoom: 13,
      minZoom: 8,

    });

    // Geolocalisation
    navigator.geolocation.getCurrentPosition(function(position) {
      let localisation = reverseGeocode(position.coords.latitude, position.coords.longitude)

      localisation.then(data => {

        $.ajax({
          type: 'POST',
          url: 'data.php',
          data: {
            address: data.address.road,
            zipcode: data.address.postcode,
            city: data.address.town,
          },
          success: function(data) {
            // map data
            map.setView(new L.LatLng(data[0].coordGeolocalisationLatitude, data[0].coordGeolocalisationLongitude), 13);

            $.each(data, function(key, val) {
              // add li 
              $('.result-response').append('<li>' + val.adresse1 + '</li>');
            });

            // customize icons
            var customIcon = L.icon({
              iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            });

            $('.title_relai').append(`Points relais les plus proches :`);

            data.forEach(location => {
              L.marker([location.coordGeolocalisationLatitude, location.coordGeolocalisationLongitude], {
                  icon: customIcon
                }).addTo(map)
                .bindPopup(location.nom).on('click', function(e) {
                  location.nom = location.nom.replace(/\s/g, '');
                  $('#relais_' + location.nom).prop('checked', true);
                })


              // Insert les valeur dans relais_id
              let name_id = location.nom.replace(/\s/g, '');
              $('#relais_id').append(`
                <div class="checkbox">
                  <label class="" for="relais_${name_id}">
                    <input type="radio" id="relais_${name_id}" name="relais_item" class="" value="${location.adresse1}|${location.codePostal}|${location.localite}|${location.codePays}|${location.identifiant}">
                    ${location.nom +' - '+location.adresse1 +' '+location.codePostal +' '+location.localite   }
                  </label>
                </div>
              `);
            });



          }
        });

      });



    });





    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
    }).addTo(map);


    // btn search_relais put submit false
    $('.search_relais').click(function() {
      let zipcode = $('#zipcode-city').val();
      let address_country = $('#address_country').val();


      // submit false 
      event.preventDefault();


      $.ajax({
        type: 'POST',
        url: 'data.php',
        data: {
          country: address_country,
          zipcode: zipcode,
        },
        success: function(data) {

          // delete les point de la carte
          map.eachLayer(function (layer) {
            if(layer instanceof L.Marker){
              map.removeLayer(layer);
            }
          });


          // map data
          map.setView(new L.LatLng(data[0].coordGeolocalisationLatitude, data[0].coordGeolocalisationLongitude), 13);

          $.each(data, function(key, val) {
            // add li 
            $('.result-response').append('<li>' + val.adresse1 + '</li>');
          });

          // customize icons
          var customIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });



          $('.title_relai').empty();
          $('.title_relai').append(`Points relais les plus proches :`);

          // vider le relais_id
          $('#relais_id').empty();

          data.forEach(location => {
            L.marker([location.coordGeolocalisationLatitude, location.coordGeolocalisationLongitude], {
              icon: customIcon
            }).addTo(map)
            .bindPopup(location.nom).on('click', function(e) {
              location.nom = location.nom.replace(/\s/g, '');
              $('#relais_' + location.nom).prop('checked', true);
            })


            let name_id = location.nom.replace(/\s/g, '');
            $('#relais_id').append(`
              <div class="checkbox">
                <label class="" for="relais_${name_id}">
                  <input type="radio" id="relais_${name_id}" name="relais_item" class="" value="${location.adresse1}|${location.codePostal}|${location.localite}|${location.codePays}|${location.identifiant}">
                  ${location.nom +' - '+location.adresse1 +' '+location.codePostal +' '+location.localite   }
                </label>
              </div>
            `);
          });



        }
      });

    });

    // ValidateForm
    $('.ValidateForm').click(function() {

      event.preventDefault(); // Prevent the default form submission

      $('.formDelivery').submit(); // Submit the form


    });

  });
</script>
const cityInput = document.getElementById('city');
const listCity = document.getElementById("listCity");
const codePostalInput = document.getElementById('zip_code');
const addressInput = document.getElementById('street');
const listAddress = document.getElementById("listAddress");
const dropdownArrayCity = [... document.querySelectorAll('#listCity li')];
const dropdownArrayAddress = [... document.querySelectorAll('#listAddress li')];
const countryInput = document.getElementById('country');


const divAddress = document.querySelector('.divAddress');
const divCpCity = document.querySelector('.divCpCity');
const divAddressCpl = document.querySelector('.divAddressCpl');
const divProvince = document.querySelector('.divProvince');

const firstname= document.getElementById('firstname');
const lastname= document.getElementById('lastname');
const suburb = document.getElementById('suburb');
const province = document.getElementById('province');
const telephone = document.getElementById('telephone');

let valueArray = [];
let valueArray2 = [];

const button = document.querySelector('button[type="submit"]')
const submitButton = document.querySelector('input[type="submit"]'); 

let checkCity = { value: false };
let checkAddress = { value: false};
let checkCodePostal = { value: false };


// Variable erreur
const manageCollabMode = document.querySelector('#management_collab_mode');
const errorCp = document.querySelector('#error_cp');
const errorCity = document.querySelector('#error_city');
const errorAddress = document.querySelector('#error_address'); 
const submitForm = document.querySelector('#form-address');
const errorAddressIcon = document.querySelector('#error-icon-address');
const errorCityIcon = document.querySelector('#error-icon-city');
const errorCpIcon = document.querySelector('#error-icon-cp');

// champs saisie libre address
const pageRegister = document.querySelector('#register');

// Variable des regex

const regexLetters = /[^A-Z ]/g;
const regexLettersAndNumbers = /[^A-Z0-9-.,' \p{L}]/gu ;
const regexNumbers = /[^0-9]/g;




// Appel de la fonction 
listenInput(cityInput, regexLettersAndNumbers);
listenInput(addressInput, regexLettersAndNumbers);
listenInput(codePostalInput, regexLettersAndNumbers);
listenInput(cityInput, regexLettersAndNumbers);
listenInput(addressInput, regexLettersAndNumbers);
listenInput(codePostalInput, regexLettersAndNumbers);
listenInput(firstname, regexLettersAndNumbers);
listenInput(lastname, regexLettersAndNumbers);
listenInput(suburb, regexLettersAndNumbers);
listenInput(province, regexLettersAndNumbers);
listenInput(telephone, regexLettersAndNumbers);




let urlApiCity = "https://geo.api.gouv.fr/communes";
// verifie au chargement de la page si l'api Ville est disponible
window.addEventListener('load', function() {
  pingApi(urlApiCity);
});







dropdwonFilterInput(dropdownArrayCity,valueArray,cityInput,listCity);
dropdwonFilterInput(dropdownArrayAddress,valueArray2,addressInput,listAddress)




 
handleKey(cityInput,listCity, 'li', checkCity)
handleKey(addressInput,listAddress, 'li')

setupFormListeners();
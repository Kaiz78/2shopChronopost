
const listCity = document.getElementById("listCity");
const listAddress = document.getElementById("listAddress");
const dropdownArrayCity = [... document.querySelectorAll('#listCity li')];
const dropdownArrayAddress = [... document.querySelectorAll('#listAddress li')];


const countryInput = document.getElementById('address_country');
const button = document.querySelector('button[type="submit"]')




let valueArray = [];
let valueArray2 = [];


let checkCity = { value: false };
let checkAddress = { value: false};
let checkCodePostal = { value: false };



// Variable erreur

const errorCp = document.querySelector('#error_cp');
const errorCity = document.querySelector('#error_city');
const errorAddress = document.querySelector('#error_address'); 
const errorAddressIcon = document.querySelector('#error-icon-address');
const errorCityIcon = document.querySelector('#error-icon-city');
const errorCpIcon = document.querySelector('#error-icon-cp');
const submitForm = document.querySelector('form');
const errorMain = document.querySelector('#error-main');






// Variable des regex

const regexLetters = /[^A-Z ]/g;
const regexLettersAndNumbers = /[^A-Z0-9-.,' \p{L}]/gu ;
const regexNumbers = /[^0-9]/g;


const cityInput = document.getElementById('address_city');
const addressInput = document.getElementById('address_street');
const codePostalInput = document.getElementById('address_zipcode');
const addressComplement = document.getElementById('address_complement');




// Variable des div
const divAddress = addressInput;
const divAddressCpl = addressComplement;
const divCpCity = codePostalInput;
const divProvince = divCpCity;




listenInput(cityInput, regexLettersAndNumbers);
listenInput(addressInput, regexLettersAndNumbers);
listenInput(codePostalInput, regexLettersAndNumbers);
listenInput(addressComplement, regexLettersAndNumbers);




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
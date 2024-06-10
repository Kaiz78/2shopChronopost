

//  Initialisation des variables 
const cityInput = document.getElementById('city');
const listCity = document.getElementById("listCity");
const codePostalInput = document.getElementById('zip_code');
const addressInput = document.getElementById('street');
const listAddress = document.getElementById("listAddress");
const dropdownArrayCity = [... document.querySelectorAll('#listCity li')];
const dropdownArrayAddress = [... document.querySelectorAll('#listAddress li')];
const countryInput = document.getElementById('address-livraison-input');

const divAddress = document.querySelector('.divAddress');
const divCpCity = document.querySelector('.divCpCity');
const divAddressCpl = document.querySelector('.divAddressCpl');
const divProvince = document.querySelector('.divProvince');

const firstname= document.getElementById('firstname');
const lastname= document.getElementById('lastname');
const suburb = document.getElementById('suburb');
const province = document.getElementById('province');

const telephone = document.getElementById('telephone');
const emailAddress = document.getElementById('email_address');
const emailAddressConfirm = document.getElementById('email_address_confirm');

const siret = document.getElementById('siret');
const company_name = document.getElementById('company_name');
const deliveryCompanyName = document.getElementById('delivery_company_name');
const recipient = document.getElementById('recipient');

let valueArray = [];
let valueArray2 = [];

const button = document.querySelector('button[type="submit"]')
const submitButton = document.querySelector('input[type="submit"]'); 

let checkCity = { value: false };
let checkAddress = { value: false};
let checkCodePostal = { value: false };


// Variable des regex

const regexLetters = /[^A-Z ]/g;
// Accept only letters, numbers and spaces
const regexLettersAndNumbers = /[^A-Z0-9-.,' ]/g;
// Accept only numbers
const regexNumbers = /[^0-9]/g;

// champs saisie libre address
const pageRegister = document.querySelector('#register');


// Variable erreur
const manageCollabMode = document.querySelector('#management_collab_mode');
const errorCp = document.querySelector('#error_cp');
const errorCity = document.querySelector('#error_city');
const errorAddress = document.querySelector('#error_address'); 
const submitForm = document.querySelector('#form-address');
const errorAddressIcon = document.querySelector('#error-icon-address');
const errorCityIcon = document.querySelector('#error-icon-city');
const errorCpIcon = document.querySelector('#error-icon-cp');




// // Fonction pour bloquer les caractères spéciaux
// function listenInput(inputText, regex) {
//     inputText.addEventListener("input", function(event) {
//         const value = event.target.value.toUpperCase().replace(regex, '');
//         event.target.value = value;
//         });
// }


// Appel de la fonction avec les bon regex
listenInput(cityInput, regexLettersAndNumbers);
listenInput(addressInput, regexLettersAndNumbers);
listenInput(codePostalInput, regexLettersAndNumbers);
listenInput(firstname, regexLettersAndNumbers);
listenInput(lastname, regexLettersAndNumbers);
listenInput(suburb, regexLettersAndNumbers);
listenInput(province, regexLettersAndNumbers);
listenInput(telephone, regexLettersAndNumbers);
listenInput(siret, regexLettersAndNumbers);
listenInput(company_name, regexLettersAndNumbers);
listenInput(deliveryCompanyName, regexLettersAndNumbers);


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






// // fonction qui permet de récupérer la ville et le code postal en fonction de l'adresse saisie
// const fetchCityData = async (cityInput, listCity, codePostalInput,cityCorrespondingPostalCode,country) => {
//   let timeoutId ;
//   let urlApi = "https://geo.api.gouv.fr/communes";

//   // Fonction pour obtenir des suggestions de ville à partir d'une API
//   function getCitySuggestions(urlApi,city, codePostal) {
//     // Vérifier si le pays est sélectionné
//     if (country.value !== true) {
//       // Retourne une promesse avec un tableau vide si le pays n'est pas sélectionné
//       return Promise.resolve([]);
//     }

//     // Retourner une nouvelle promesse qui effectue une requête AJAX pour obtenir des suggestions de ville
//     return new Promise((resolve, reject) => {
//       // Créer une nouvelle instance XMLHttpRequest
//       let xhr = new XMLHttpRequest();

//       // Configure la requête GET avec les paramètres de code postal et de nom de ville
//       xhr.open(
//           'GET',
//           urlApi + "?&codePostal=" + codePostal.value + "&nom=" + city
//       );

//       // Gére l'événement de chargement de la requête
//       xhr.onload = () => {
//           if (xhr.status === 200 ){
//             listCity.innerHTML = ""; 
//             // Récupérer les données de la réponse et les convertir en tableau
//             const data = JSON.parse(xhr.responseText);
//             // Renvoyer un tableau de noms de ville
//             resolve(data.map((feature) => feature.nom ));
//           }
//           else{
//             listCity.innerHTML = "";
//             //  Rejete la promesse avec le statut de la requête
//             reject(xhr.statusText);
//           }
//       };

//       //  Gére l'événement d'erreur de la requête
//       xhr.onerror = (e) => {
//           listCity.innerHTML = "";
//           // Rejete la promesse avec l'erreur
//           reject(e);
//       };

//       // Envoi de la requête
//       xhr.send();
//     });
//   }
      
//   // Ecoute sur le champ ville
//   cityInput.addEventListener("input", (event) => {
//       clearTimeout(timeoutId);
//       const inputValue = event.target.value.trim();

//       timeoutId = setTimeout(() => {
//           getCitySuggestions(urlApi,inputValue, codePostalInput).then((suggestions) =>  {

//               // Filtrer les suggestions pour éviter les doublons et normaliser le texte
//               suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); });
              
//               // Vérifier s'il n'y a pas de suggestions et que le pays est vrai
//               if(suggestions.length == 0 && country.value == true){
//                 listCity.innerHTML = "Aucun résultat";
//               }
//               else{
//                 listCity.innerHTML = "";
//               }

//               // Ajouter chaque suggestion à la liste sous forme d'éléments li
//               suggestions.forEach(() => {
//                   const item = document.createElement("li");
//                   item.id = "suggestion-city";

//                   // Mettre à jour la valeur de la saisie de la ville lors du clic
//                   item.addEventListener("click", (event) => {
//                     cityInput.value = event.target.innerText;
//                     // Vérifier si la ville correspond au code postal
//                     cityCorrespondingPostalCode.value = suggestionVerification === cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//                   });

//                   item.innerText = suggestionVerification;
//                   listCity.appendChild(item);
//               });

//               // Vérifier si la ville saisie par l'utilisateur est dans le tableau des suggestions
//               cityCorrespondingPostalCode.value = suggestionVerification === cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//             })
//         .catch((error) => {
//           console.error(error);  
//         });
//       }, 100);
//   });

//   // Ecoute sur le champ code postal
//   codePostalInput.addEventListener("input", (event) => {
//       clearTimeout(timeoutId);
//       const inputValue = event.target.value.trim();    

//       timeoutId = setTimeout(() => {
//         // Appeler la fonction getCitySuggestions avec la promesse associée 
//         getCitySuggestions(urlApi,cityInput.value, inputValue).then((suggestions) => {
//           // Filtrer les suggestions pour éviter les doublons et normaliser le texte  
//           suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); });

//           // Ajouter chaque suggestion à la liste sous forme d'éléments li
//           suggestions.forEach((suggestion) => {
//               const item = document.createElement("li");
//               item.id = "suggestion-city";

//               // Mettre à jour la valeur de la saisie de la ville lors du clic
//               item.addEventListener("click", (event) => {
//                 cityInput.value = event.target.innerText;

//                 // Vérifier si la ville correspond au code postal
//                 cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
//               });

//               item.innerText = suggestion;
//               listCity.appendChild(item);
//           });
          
//           // Vérifier si la ville saisie par l'utilisateur est dans le tableau des suggestions
//           cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));   
//         })
//         .catch((error) => {
//           console.error(error);  
//         });
//       }, 100);
//   });
// } 


// // fonction qui permet de récupérer l'adresse en fonction du code postal saisie
// const fetchAddressData = async (adresseInput, listAddress, codePostalInput,country) => {
//   let timeoutId ;
//   let urlApi = "https://api-adresse.data.gouv.fr/search/";

//   // Fonction pour rechercher une adresse à partir d'une API
//   function searchAddress(urlApi,address,codePostalInput) {
//     // Vérifier si le pays est sélectionné
//     if (country.value !== true) {
//       // Retourne une promesse résolue avec un tableau vide si le pays n'est pas sélectionné
//       return Promise.resolve([]);
//     }

//     // Retourner une nouvelle promesse qui effectue une requête AJAX pour rechercher une adresse
//     return new Promise((resolve, reject) => {
//       // Créer une nouvelle instance XMLHttpRequest
//       const xhr = new XMLHttpRequest();

//       // Configurer la requête GET avec les paramètres d'adresse et de code postal
//       xhr.open(
//         "GET",
//         urlApi + `?q=${address}&postcode=${codePostalInput.value.length == 5 ? codePostalInput.value : ""}`
//       );

//       // Gére l'événement de chargement de la requête
//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           const data = JSON.parse(xhr.responseText);
//           // Résoudre la promesse avec les noms des lieux de la réponse
//           resolve(data.features.map((feature) => feature.properties.name));
//         } else {
//           // Rejete la promesse avec le statut de la requête 
//           reject(xhr.statusText);
//         }
//       };

//       // Gére l'événement d'erreur de la requête
//       xhr.onerror = (e) => {
//         // Rejete la promesse avec l'erreur en cas d'échec de la requête
//        reject(e);
//       };

//       // Envoi la requête
//       xhr.send();
//     });
//   }

//   // Ajouter un écouteur d'événements sur la saisie d'adresse
//   adresseInput.addEventListener("input", (event) => {
//     // Annuler le timeout existant pour éviter de déclencher plusieurs requêtes trop rapidement
//     clearTimeout(timeoutId);

//     // Obtenir la valeur saisie par l'utilisateur et la nettoyer
//     const inputValue = event.target.value.trim();

//     //  Vérifier si la longueur de la saisie est inférieure à 3 caractères et si le pays est sélectionné
//     if (inputValue.length < 3  && country.value == true) {
//       // Ne rien faire si l'utilisateur n'a pas entré suffisamment de caractères
//       listAddress.innerHTML = "Aucun résultat";
//       return;
//     }

//     timeoutId = setTimeout(() => {
//       // Appeler la fonction de recherche d'adresse avec la valeur saisie et le code postal
//       searchAddress(urlApi,inputValue, codePostalInput).then((suggestions) => {  
//         // Filtrer et formater les suggestions d'adresse   
//         suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); });
//         if(suggestions.length == 0 && country.value == true){
//           listAddress.innerHTML = "Aucun résultat";
//         }
//         else{
//           listAddress.innerHTML = "";
//         } 
//         suggestions.forEach((suggestion) => {
//           const item = document.createElement("li");
//           item.classList.add("suggestion-address");
//           item.addEventListener("click", (event) => {
//             adresseInput.value = event.target.innerText;
//             // retire la class open 
//             listAddress.classList.remove("open");
//           });
//           item.innerText = suggestion;
//           listAddress.appendChild(item);
//         });
//       })
//       .catch((error) => {
//         console.error(error);  
//       });
//       }, 100);
//   });

// }  








// //  fonction pour afficher la liste déroulante
// function dropdwonFilterInput(dataList,newArray,inputWrite,dropdownList,countries){
//     dataList.forEach(item => {
//         newArray.push(item.textContent);
//     });
//     inputWrite.addEventListener('input', () => {
//             dropdownList.classList.add('open');      
//         let inputValue = inputWrite.value.toLowerCase();
//         if (inputValue.length > 0) {
//           for (let j = 0; j < newArray.length; j++) {
//             if (!(inputValue.substring(0, inputValue.length) === newArray[j].substring(0, inputValue.length).toLowerCase())) {
//               dataList[j].classList.add('closed');
//             } else {
//               dataList[j].classList.remove('closed');
//             }
//           }
//         } else {
//           for (let i = 0; i < dataList.length; i++) {
//             dataList[i].classList.remove('closed');
//           }
//         }
//     });
     
//     dataList.forEach(item => {
//         item.addEventListener('click', (evt) => {
//         inputWrite.value = item.textContent;
//         dataList.forEach(dropdownList => {
//             dropdownList.classList.add('closed');
//         });
//         });
//     })

//     inputWrite.addEventListener('focus', () => {

//         dropdownList.classList.add('open');
//         dataList.forEach(dropdown => {
//           dropdown.classList.remove('closed');
//         });
//      });  
//     document.addEventListener('click', (evt) => {
//         const isDropdown = dropdownList.contains(evt.target);
//         const isInput = inputWrite.contains(evt.target);
//         if (!isDropdown && !isInput) {
//         dropdownList.classList.remove('open');
//         }
//     });
// }




// function verif_checkout_address(cityCorrespondingPostalCode, cityInput, codePostaleInput, blacklistCodePostal){
//   submitForm.setAttribute('onsubmit', 'return false;');
//   // si manageCollabMode est checke alors on met le onsubmit du form a true
//   if (typeof manageCollabMode !== 'undefined' && manageCollabMode !== null && manageCollabMode.checked == true){
//     submitForm.setAttribute('onsubmit', 'return true;');
//     return true;
//   }
//   else if(countryInput.value != "FRANCE"){
//     submitForm.setAttribute('onsubmit', 'return true;');
//     return true;
//   }
//   else if(blacklistCodePostal.includes(codePostaleInput.value.substring(0,3))){
//     error.style.display = "none";
//     errorBlacklist.style.display = "";
//     codePostaleInput.focus();
//     submitForm.setAttribute('onsubmit', 'return false;');
//     return false;
//   }
//   else if (cityCorrespondingPostalCode.value == false){
//   errorBlacklist.style.display = "none";
//   error.style.display = "";
//   cityInput.focus();
//   submitForm.setAttribute('onsubmit', 'return false;');
//   return false;
//   }
//   else if(cityInput.value == "")  {

//       cityInput.focus();
//       submitForm.setAttribute('onsubmit', 'return false;');
//       return false;
//   }
//   else if(codePostaleInput.value == "") {
//       codePostaleInput.focus();
//       submitForm.setAttribute('onsubmit', 'return false;');
//       return false;
//   }
//   else if(isNaN(codePostaleInput.value) || codePostaleInput.value.length <  5 ){
//       codePostaleInput.focus();
//       submitForm.setAttribute('onsubmit', 'return false;');
//       return false;
//   }
//   else if(checkCity.value == true){
//       submitForm.setAttribute('onsubmit', 'return true;');
//       return true;
//   }
// }


// function clickSubmit(){
//     verif_checkout_address(checkCity, cityInput, codePostalInput, BlackListCp);  
// }


// function handleKey(listenInput, listDropdown, params, CheckCity) {
//   listenInput.addEventListener("keydown", handleKeyDown);

//   function handleKeyDown(e) {
//     const { key } = e;
//     const listElements = Array.from(listDropdown.querySelectorAll(params));
//     const length = listElements.length;

//     let activeIndex = listElements.findIndex(el => el.classList.contains('hover'));

//     if (key === "ArrowDown") {
//       activeIndex = (activeIndex + 1) % length;
//       navigateThroughElement(activeIndex);
//     }
//     if (key === "ArrowUp") {
//       if (activeIndex === -1) activeIndex = 0;
//       activeIndex = (length + (activeIndex - 1)) % length;
//       navigateThroughElement(activeIndex);
//     }
//     if (key === 'Enter'){
//       e.preventDefault();
//       insertText(e);
//       if(typeof CheckCity !== 'undefined'){
//         CheckCity.value = true;
//       }
//     } 

//     function navigateThroughElement(index) {
//       if (listElements.length == 0) return;
//       listElements.forEach(el => {
//         if (el.classList.contains('hover')) el.classList.remove('hover');
//       })
//       listElements[index].classList.add('hover');
//       listElements[index].scrollIntoView({ block: "nearest" });
//     }
//     function insertText(e) {
//       if (activeIndex >= 0) {
//         e.target.value = listElements[activeIndex].innerText;
//         // close the list
//         listDropdown.classList.remove('open');
//       }
//     }

//     // si la souris est sur un élément de la liste on enleve le hover
//     listElements.forEach(el => {
//       el.addEventListener('mouseover', () => {
//         listElements.forEach(el => {
//           if (el.classList.contains('hover')) el.classList.remove('hover');
//         })
//       })
//     });

//   }
// }







// function pingApi(url) {
//   return fetch(url, {
//     method: 'HEAD',
//     mode: 'no-cors'
//   }).then(function(response) {
//     if (cityInput.value !== ''){   
//       getCitySuggestions(url);
//     }
//     else{
//       checkCity.value = false;
//     }
//   }).catch(function(error) {
//     checkCity.value = true;
//   });
// }
// function getCitySuggestions(url) {
//   return new Promise((resolve, reject) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open(
//       'GET',
//       url + `?&codePostal=${codePostalInput.value}&nom=${cityInput.value}`
//   );
//   xhr.onload = () => {
//       if (xhr.status === 200) {
//       const data = JSON.parse(xhr.responseText);
//       resolve(data.map((feature) => {

//           if (feature.nom.toLowerCase() === cityInput.value.toLowerCase()){
//             checkCity.value = true;
//             // console.log(checkCity.value);
//            }
//       }));
//       } else {
//       reject(xhr.statusText);
//       }
//   };

//   xhr.onerror = (e) => {
//       reject(e);
//   };

//   xhr.send();
//   });
// }



// function setupFormListeners() {
//   let countries = { value: false };

//   // Exécutez cette fonction lorsque l'utilisateur change de sélection de pays.
//   countryInput.addEventListener("change", () => {
//     if(countryInput.value != ""){
//       divAddress.style.display = "";
//       divAddressCpl.style.display = "";
//       divCpCity.style.display = "";
//       divProvince.style.display = "";
//     }
//     else{
//       divAddress.style.display = "none";
//       divAddressCpl.style.display = "none";
//       divCpCity.style.display = "none";
//       divProvince.style.display = "none";
//     }
//     if (countryInput.value == "FRANCE") {
//       countries.value = true;
//       fetchCityData(cityInput, listCity, codePostalInput,checkCity,countries);
//       fetchAddressData(addressInput, listAddress, codePostalInput,countries);
//     } else {
//       countries.value = false;
//       listCity.innerHTML = '';
//       listAddress.innerHTML = '';
//       fetchCityData(cityInput, listCity, codePostalInput,checkCity,countries);
//       fetchAddressData(addressInput, listAddress, codePostalInput,countries);
//     }
//   });

//   if(countryInput.value == "FRANCE"){
//     countries.value = true;
//     fetchCityData(cityInput, listCity, codePostalInput,checkCity,countries);
//     fetchAddressData(addressInput, listAddress, codePostalInput,countries);
//   }

//   if(countryInput.value != ""){
//     divAddress.style.display = "";
//     divAddressCpl.style.display = "";
//     divCpCity.style.display = "";
//     divProvince.style.display = "";
//   }
// }





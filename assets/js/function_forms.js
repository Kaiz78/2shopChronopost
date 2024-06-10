



/**
 * Fonction qui ping l'api pour vérifier si elle est disponible
 * @param {string} url 
 */
function pingApi(url) {
  // Utiliser la fonction fetch pour effectuer une requête HEAD à l'API
  return fetch(url, {
    method: 'HEAD',
    mode: 'no-cors'
  })
  .catch(function(error) {
    // Si l'api n'est pas disponible on mets les champs a true
    console.error(error);
    checkCity.value = true;
    checkAddress.value = true;
    checkCodePostal.value = true;
  });
}
  



/**
 * Fonction qui permet de filtrer les caractères spéciaux
 * @param {HTMLElement} inputText  
 * @param {RegExp} regex  
*/
function listenInput(inputText, regex) {
  // Événement au saisit du texte dans l'élément inputText
  inputText.addEventListener("input", function(event) {
    // Récupére la valeur saisie dans l'élément inputText
    const normalizedValue = event.target.value.normalize('NFD');
    const valueWithoutAccents = normalizedValue.replace(/[\u0300-\u036f]/g, '').replace(/[ ]+/g, " ");
    const sanitizedValue = valueWithoutAccents.toUpperCase().replace(regex, '');

    // On remplace la valeur saisie par la valeur filtrée
    event.target.value = sanitizedValue;
  });
}






/**
 * Fonction qui permet de récupérer la liste des villes en fonction du code postal 
 * @param {HTMLElement} cityInput  
 * @param {HTMLElement} listCity  
 * @param {HTMLElement} codePostalInput  
 * @param {{value:boolean}} cityCorrespondingPostalCode  
 * @param {{value:boolean}} country  
*/
const fetchCityData = async (cityInput, listCity, codePostalInput,cityCorrespondingPostalCode,country) => {
  let timeoutId ;
  let urlApi = "https://geo.api.gouv.fr/communes";

  // Au saisit du texte dans l'élément cityInput
  cityInput.addEventListener("input", (event) => {
    // On masque l'erreur si l'utilisateur commence à taper
    errorCity.style.display = "none";
    errorCityIcon.style.display = "none";
    cityInput.classList.remove('form-control-error');

    clearTimeout(timeoutId);
    // supprimer les espaces en début et en fin de chaîne
    const inputValue = event.target.value.trim();
    
    // On déclenche la recherche après 100ms pour éviter de surcharger l'API
    timeoutId = setTimeout(() => {
      getCitySuggestions(inputValue, codePostalInput.value).then((suggestions) =>  { 
          suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });

          if(suggestions.length == 0 && country.value == true){
            listCity.innerHTML = "Aucun résultat";
          }
          else{
            listCity.innerHTML = "";
          }


          
          suggestions.forEach((suggestion) => {
              const item = document.createElement("li");
              item.id = "suggestion-city";
              item.addEventListener("click", (event) => {
                cityInput.value = event.target.innerText;
                cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));
                listCity.innerHTML = "";
                if(checkCity.value == true && checkCodePostal.value == true && checkAddress.value == true){
                  button.disabled = false;
                }

              });
              item.innerText = suggestion;
              listCity.appendChild(item);
          });

          // on vérifie si la ville saisie par l'utilisateur est dans le tableau suggestions
          cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));  

          
          // Vérification si tous les champs sont correctes
          if(checkCity.value == true && checkCodePostal.value == true && checkAddress.value == true){
            button.disabled = false;
          }

      })
      .catch((error) => {
        console.error(error);  
      });
    }, 100);
  });
  

  // Au click du champ ville on affiche la liste des villes suggérées
  cityInput.addEventListener("click", (event) => {


    clearTimeout(timeoutId);
    // On supprime les espaces en début et en fin de chaîne
    const inputValue = event.target.value.trim();
    
    timeoutId = setTimeout(() => {
        getCitySuggestions(inputValue, codePostalInput.value).then((suggestions) =>  { 
          suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });
            suggestions.forEach((suggestion) => {
                const item = document.createElement("li");
                item.id = "suggestion-city";
                item.addEventListener("click", (event) => {
                  cityInput.value = event.target.innerText;
                  cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));
                  listCity.innerHTML = "";
                  
                  // Vérification si tous les champs sont correctes
                  if(checkCity.value == true && checkCodePostal.value == true && checkAddress.value == true){
                    button.disabled = false;
                  }
                });

                item.innerText = suggestion;
                listCity.appendChild(item);
            });
          })
      .catch((error) => {
        console.error(error);  
      });
    }, 100);
  });

  // Au saisit du texte dans l'élément codePostalInput
  codePostalInput.addEventListener("input", (event) => {
      
      // On masque l'erreur si l'utilisateur commence à taper
      errorCp.style.display = "none";
      errorCpIcon.style.display = "none"; 
      codePostalInput.classList.remove('form-control-error');

      clearTimeout(timeoutId);
      // supprimer les espaces en début et en fin de chaîne
      const inputValue = event.target.value.trim();
      timeoutId = setTimeout(() => {
        
        getCitySuggestions("", inputValue).then((suggestions) => {
          if(suggestions.length == 0 && country.value == true){
            listCity.innerHTML = "Aucun résultat";
            checkCodePostal.value = false;
          }
          else{
            listCity.innerHTML = "";
            checkCodePostal.value = true;

          }

          suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });



          suggestions.forEach((suggestion) => {
              const item = document.createElement("li");
              item.id = "suggestion-city";
              item.addEventListener("click", (event) => {
                cityInput.value = event.target.innerText;
                cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));
                listCity.innerHTML = "";


              });
              item.innerText = suggestion;
              listCity.appendChild(item);
          });

          // on vérifie si la ville saisie par l'utilisateur est dans le tableau suggestions
          cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));   

          // Vérification si tous les champs sont correctes
          if(checkCity.value == true && checkCodePostal.value == true && checkAddress.value == true){
            button.disabled = false;
          }  

        })
        .catch((error) => {
          console.error(error);  
        });
      }, 100);
  });


  // Vérifie si le champ code postal est déjà rempli
  if(codePostalInput.value.length > 0){
    getCitySuggestions("", codePostalInput.value).then((suggestions) => {
      if(suggestions.length == 0 && country.value == true){
        listCity.innerHTML = "Aucun résultat";
        checkCodePostal.value = false;
      }
      else{
        listCity.innerHTML = "";
        checkCodePostal.value = true;

      }

      suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });

      // on vérifie si la ville saisie par l'utilisateur est dans le tableau suggestions
      cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));   

    })
    .catch((error) => {
      console.error(error);  
    });
  }

  // Vérifie si le champ ville est déjà rempli
  if(cityInput.value.length > 0){

    // 3 premieres caractère du cityInput.value
    let city = cityInput.value.substring(0, 3);


    getCitySuggestions(city, codePostalInput.value).then((suggestions) => {
      suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });
      
      // on vérifie si la ville saisie par l'utilisateur est dans le tableau suggestions
      cityCorrespondingPostalCode.value = suggestions.includes(cityInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));   
    })
    .catch((error) => {
      console.error(error);  
    });
  }
  
    
  /**
   * Fonction qui permet de récupérer la liste des villes en fonction du code postal 
   * @param {string} city  
   * @param {string} codePostal  
  */
  function getCitySuggestions(city, codePostal) {
      if (country.value !== true) {
        return Promise.resolve([]);
      }
      return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      if(city == ""){
        xhr.open(
          'GET',
          urlApi + "?&codePostal=" + codePostal
        );
      }
      else{
        xhr.open(
          'GET',
          urlApi + "?&codePostal=" + codePostal + "&nom=" + city
        );
      }

      xhr.onload = () => {
          if (xhr.status === 200 ) {
            listCity.innerHTML = "";
            // Afficher les 5 premières villes
            const data = JSON.parse(xhr.responseText).slice(0, 5)
            resolve(data.map((feature) => feature.nom ));
          } else {
            listCity.innerHTML = "";
            reject(xhr.statusText);
          }
      };
  
      xhr.onerror = (e) => {
          listCity.innerHTML = "";
          reject(e);
      };
  
      xhr.send();
      });
  }


} 



/**
 * Fonction pour récupérer les adresses en fonction de la ville et du code postal
* @param {string} adresseInput - L'input HTML de l'adresse
* @param {HTMLElement} listAddress - L'élément HTML où afficher les adresses.
* @param {HTMLElement} codePostalInput - L'input HTML du code postal.
* @param {{value:boolean}} addressCorrespondingCodePostal - Vérification si l'adresse est correct (true ou false)
* @param {{value:boolean}} country - Si le pays est France ou non (true ou false).
*/

const fetchAddressData = async (adresseInput, listAddress, codePostalInput,addressCorrespondingCodePostal,country) => {
    let timeoutId ;
    let urlApi = "https://api-adresse.data.gouv.fr/search/";

    // Au saisit du texte dans l'élément adresseInput
    adresseInput.addEventListener("input", (event) => {
      const inputValue = event.target.value.trim();
      clearTimeout(timeoutId);

      // On masque l'erreur si l'utilisateur commence à taper
      errorAddress.style.display = "none";
      errorAddressIcon.style.display = "none";
      adresseInput.classList.remove('form-control-error');
      
      if (inputValue.length < 3  && country.value == true) {
        // Ne rien faire si l'utilisateur n'a pas entré suffisamment de caractères
        listAddress.innerHTML = "Aucun résultat";
        return;
      }

      timeoutId = setTimeout(() => {
        searchAddress(inputValue).then((suggestions) => {     
          suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });
          
          
          if(suggestions.length == 0 && country.value == true){
            listAddress.innerHTML = "Aucun résultat";
          }
          else{
            listAddress.innerHTML = "";
          }

          suggestions.forEach((suggestion) => {
            const item = document.createElement("li");
            item.classList.add("suggestion-address");

            item.addEventListener("click", (event) => {
              errorAddress.style.display = "none";
              errorAddressIcon.style.display = "none";
              adresseInput.value = event.target.innerText;

              addressInput.classList.remove("form-control-error");
              listAddress.classList.remove("open");
              addressCorrespondingCodePostal.value = suggestions.includes(addressInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));
              
              // Vérification si tous les champs sont correctes
              if(checkCity.value == true && checkCodePostal.value == true && checkAddress.value == true){
                button.disabled = false;
              }          
            });

            item.innerText = suggestion;
            listAddress.appendChild(item);
          });

          // on vérifie si l'adresse saisie par l'utilisateur est dans le tableau suggestions
          addressCorrespondingCodePostal.value = suggestions.includes(inputValue.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));   

          // Vérification si tous les champs sont correctes
          if(checkCity.value == true && checkCodePostal.value == true && checkAddress.value == true){
            button.disabled = false;
          }

        })
        .catch((error) => {
          console.error(error);  
        });
      }, 100);
    });


    // Vérification si le champ adresse est déjà rempli
    if(adresseInput.value.length > 0){
      searchAddress(adresseInput.value).then((suggestions) => {     
        suggestions = suggestions.filter((item, index) => suggestions.indexOf(item) === index).map(function (x) { return x.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "); });
    
        // on vérifie si l'adresse saisie par l'utilisateur est dans le tableau suggestions
        addressCorrespondingCodePostal.value = suggestions.includes(adresseInput.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[ ]+/g, " "));   

      })
      .catch((error) => {
        console.error(error);  
      });
    }


    /**
     * Fonction pour récupérer les adresses en fonction de la ville et du code postal 
     * @param {string} address  
    */
    function searchAddress(address) {
      if (country.value !== true) {
        return Promise.resolve([]);
      }
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          urlApi + `?q=${address}&postcode=${codePostalInput.value.length == 5 ? codePostalInput.value : ""}`
        );

        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            // console.log(data);
			resolve(data.features.map((feature) => $.trim(feature.properties.name).replace(/[ ]+/g, " ")));
          } else {
            reject(xhr.statusText);
          }
        };
        
        xhr.onerror = (e) => {
          reject(e);
        };
        
        xhr.send();
      });
    }
}  


/**
 * Fonction pour afficher la liste déroulante filtrée.
 * @param {HTMLDataListElement} dataList - L'élément HTML `<datalist>` à filtrer.
 * @param {Array<string>} newArray - Un tableau de chaînes à utiliser pour filtrer la liste.
 * @param {HTMLInputElement} inputWrite - L'élément HTML `<input>` où l'utilisateur saisit le texte.
 * @param {HTMLUListElement} dropdownList - L'élément HTML `<ul>` où afficher la liste filtrée.
*/
function dropdwonFilterInput(dataList,newArray,inputWrite,dropdownList){
    
  dataList.forEach(item => {
    newArray.push(item.textContent);
  });
  
  inputWrite.addEventListener('input', () => {
    dropdownList.classList.add('open');      
    let inputValue = inputWrite.value.toLowerCase();
    
    if (inputValue.length > 0) {
      for (let j = 0; j < newArray.length; j++) {
        // Vérifie si la saisie ne correspond pas aux premiers caractères de chaque élément de newArray
        if (!(inputValue.substring(0, inputValue.length) === newArray[j].substring(0, inputValue.length).toLowerCase())) {
          dataList[j].classList.add('closed');
        } else {
          dataList[j].classList.remove('closed');
        }
      }
    } else {
      // Si la saisie est vide, affiche tous les éléments en retirant la classe 'closed'
      for (let i = 0; i < dataList.length; i++) {
        dataList[i].classList.remove('closed');
      }
    }
  });
     
  dataList.forEach(item => {
      item.addEventListener('click', (evt) => {
      inputWrite.value = item.textContent;
      dataList.forEach(dropdownList => {
          dropdownList.classList.add('closed');
      });
      });
  })

  inputWrite.addEventListener('focus', () => {

      dropdownList.classList.add('open');
      dataList.forEach(dropdown => {
        dropdown.classList.remove('closed');
      });
  });  

  document.addEventListener('click', (evt) => {
      const isDropdown = dropdownList.contains(evt.target);
      const isInput = inputWrite.contains(evt.target);
      if (!isDropdown && !isInput) {
      dropdownList.classList.remove('open');
      }
  });
}


/**
 * Fonction qui vérifie les erreurs d'adresse et de code postal
 * @param {{value:boolean}} checkCity - L'élément pour indiquer s'il y a une erreur dans la ville.
 * @param {HTMLInputElement} cityInput - L'élément HTML pour saisir la ville.
 * @param {HTMLInputElement} addressInput - L'élément HTML pour saisir l'adresse.
 * @param {{value:boolean}} checkAddress - L'élément pour indiquer s'il y a une erreur dans l'adresse.
 * @param {HTMLInputElement} codePostaleInput - L'élément HTML pour saisir le code postal.
 * @param {{value:boolean}} checkCodePostal - L'élément pour indiquer s'il y a une erreur dans le code postal.
 */
function verif_checkout_address(checkCity, cityInput, addressInput, checkAddress, codePostaleInput, checkCodePostal) {
    submitForm.setAttribute('onsubmit', 'return false;');

  
    if ((typeof manageCollabMode !== "undefined" && manageCollabMode.checked) || countryInput.value !== "FRANCE METROPOLITAINE ET DOM-TOM") {
      submitForm.setAttribute('onsubmit', 'return true;');
    } else if (!checkCodePostal.value || !checkCity.value || !checkAddress.value) {
      if (!checkCodePostal.value) {
        errorCp.style.display = "";
        errorCpIcon.style.display = "flex";
        codePostaleInput.focus();
        codePostaleInput.classList.add('form-control-error');
        
      }
      if (!checkCity.value) {
        errorCity.style.display = "";
        errorCityIcon.style.display = "flex";
        checkCodePostal.value == false ? '' : cityInput.focus();
        cityInput.classList.add('form-control-error');
      }
      if (!checkAddress.value) {
        errorAddress.style.display = "";
        errorAddressIcon.style.display = "flex";
        checkCity.value == false ? '' : addressInput.focus();
        addressInput.classList.add('form-control-error');
        
      }

    } else {
      submitForm.setAttribute('onsubmit', 'return true;');
    }


    // // si submit form contains onsubmit="return false" disabled btn
    if(submitForm.getAttribute('onsubmit') == "return false;" && typeof errorMain !== "undefined"){

      button.disabled = true;
      errorMain.style.display = "";
    }
    
  
    return false;
}




// Fonction excécutée au click du bouton submit
function clickSubmit(){
    verif_checkout_address(checkCity, cityInput,addressInput,checkAddress, codePostalInput, checkCodePostal);  
}



/**
 * Fonction qui permet de naviguer dans la liste avec les flèches du clavier ⬆️ ⬇️
 * @param {HTMLInputElement} listenInput - L'élément HTML d'entrée où l'utilisateur saisit du texte.
 * @param {HTMLUListElement} listDropdown - L'élément HTML de la liste déroulante à naviguer.
 * @param {string} listItemType - Le type d'élément de liste, par exemple 'li'.
 * @param {{value:boolean}} checkCity - L'élément pour indiquer s'il y a une erreur dans la ville.
 */
function handleKey(listenInput, listDropdown, listItemType, checkCity) {
    listenInput.addEventListener("keydown", handleKeyDown);
  
    function handleKeyDown(e) {
      const { key } = e;
      const listElements = Array.from(listDropdown.querySelectorAll(listItemType));
      const length = listElements.length;
  
      let activeIndex = listElements.findIndex(el => el.classList.contains('hover'));
  
      if (key === "ArrowDown") {
        activeIndex = (activeIndex + 1) % length;
        navigateThroughElement(activeIndex);
      }
      if (key === "ArrowUp") {
        if (activeIndex === -1) activeIndex = 0;
        activeIndex = (length + (activeIndex - 1)) % length;
        navigateThroughElement(activeIndex);
      }
      if (key === 'Enter'){
        e.preventDefault();
        insertText(e);
        if(typeof checkCity !== 'undefined'){
          checkCity.value = true;
        }
      } 
  
      function navigateThroughElement(index) {
        if (listElements.length == 0) return;
        listElements.forEach(el => {
          if (el.classList.contains('hover')) el.classList.remove('hover');
        })
        listElements[index].classList.add('hover');
        listElements[index].scrollIntoView({ block: "nearest" });
      }

      function insertText(e) {
        if (activeIndex >= 0) {
          e.target.value = listElements[activeIndex].innerText;
          // close the list
          listDropdown.classList.remove('open');
        }
      }
  
      // si la souris est sur un élément de la liste on enleve le hover
      listElements.forEach(el => {
        el.addEventListener('mouseover', () => {
          listElements.forEach(el => {
            if (el.classList.contains('hover')) el.classList.remove('hover');
          })
        })
      });
  
    }
}
  


// Vérificaton du pays selectionné
function setupFormListeners() {
    let countries = { value: false };
  
    // Exécutez cette fonction lorsque l'utilisateur change de sélection de pays.
    countryInput.addEventListener("change", () => {
      // Affichages des champs adresse si un pays est sélctionné   
      if(typeof divAddress !== "undefined"){
        if(countryInput.value != ""){
          divAddress.style.display = "";
          divAddressCpl.style.display = "";
          divCpCity.style.display = "";
          divProvince.style.display = "";
        }
        else{
          divAddress.style.display = "none";
          divAddressCpl.style.display = "none";
          divCpCity.style.display = "none";
          divProvince.style.display = "none";
        }
      }

  
      // Exécution des fonction de l'api en fonction du pays sélctionné
      if (countryInput.value == "FRANCE METROPOLITAINE ET DOM-TOM") {
        countries.value = true;
        fetchCityData(cityInput, listCity, codePostalInput,checkCity,countries);
        fetchAddressData(addressInput, listAddress, codePostalInput,checkAddress,countries);
      } else {
        button.disabled = false;
        countries.value = false;
        errorCity.style.display = "none";
        errorCityIcon.style.display = "none";
        errorCp.style.display = "none";
        errorCpIcon.style.display = "none";
        errorAddress.style.display = "none";
        errorAddressIcon.style.display = "none";
        cityInput.classList.remove('form-control-error');
        addressInput.classList.remove('form-control-error');
        codePostalInput.classList.remove('form-control-error');

        listCity.innerHTML = '';
        listAddress.innerHTML = '';
        fetchCityData(cityInput, listCity, codePostalInput,checkCity,countries);
        fetchAddressData(addressInput, listAddress, codePostalInput,checkAddress,countries);
      }
    });
  
    // Si par défaut le pays FRANCE METROPOLITAINE ET DOM-TOM est selectionner
    if(countryInput.value == "FRANCE METROPOLITAINE ET DOM-TOM"){
      countries.value = true;
      fetchCityData(cityInput, listCity, codePostalInput,checkCity,countries);
      fetchAddressData(addressInput, listAddress, codePostalInput,checkAddress,countries);



      setTimeout(() => {
        // si les champs ne sont pas vide
        if(cityInput.value != "" && addressInput.value != "" && codePostalInput.value != ""){
        verif_checkout_address(checkCity, cityInput,addressInput,checkAddress, codePostalInput, checkCodePostal);
        }
      }, 500);
    }
    // Si par défaut le pays n'est pas selectionner
    if(countryInput.value != "" && typeof divAddress !== "undefined"){
      checkCity.value = true;
      checkAddress.value = true
      checkCodePostal.value = true;
      divAddress.style.display = "";
      divAddressCpl.style.display = "";
      divCpCity.style.display = "";
      divProvince.style.display = "";
    }
}








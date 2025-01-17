// export default function informationTab(data){
  
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         const userId = urlParams.get('id')
//         const userAction = urlParams.get('stat')
//         console.log(userId)
//         //  make an API call to get more details about the user.
//         var apiEndpoint = 'https://www.sakane.ma/oc-content/plugins/rest/api.php?key=DOoebZRUU1ozFAelnC5u7x8hMvcqBV&type=read&object=item&action=byId&itemId=' + userId;
//         var apiPictures = 'https://www.sakane.ma/oc-content/plugins/rest/api.php?key=DOoebZRUU1ozFAelnC5u7x8hMvcqBV&type=read&object=item&action=resourcesById&itemId=' + userId
//         Promise.all([fetch(apiEndpoint), fetch(apiPictures)])
//           .then(responses => {
//             // Check for errors in the responses
//             if (!responses[0].ok || !responses[1].ok) {
//               throw new Error('One or both API responses were not ok');
//             }

//             // Parse the responses as JSON
//             return Promise.all([responses[0].json(), responses[1].json()]);
//           })
//           .then(data => {
//             var userData = data[0];
//             var picturesData = data[1];

//             // Process the user data and pictures data received from the APIs
//             if(userAction=="modify"){
//             modifyItemData(userData)
//           }else{
//             displayItemData(userData);
//             displayItemPictures(picturesData)
//           }
//           })
//           .catch(error => {
//             console.error('Error fetching user data or pictures:', error);
//           });
   
//     }
export default async function informationTab(data) {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('id');
    const userAction = urlParams.get('stat');
    console.log(userId);

    // Construire les URL des points de terminaison API
    const apiEndpoint =
      'https://www.sakane.ma/oc-content/plugins/rest/api.php?key=DOoebZRUU1ozFAelnC5u7x8hMvcqBV&type=read&object=item&action=byId&itemId=' +
      userId;
    const apiPictures =
      'https://www.sakane.ma/oc-content/plugins/rest/api.php?key=DOoebZRUU1ozFAelnC5u7x8hMvcqBV&type=read&object=item&action=resourcesById&itemId=' +
      userId;

    // Effectuer les appels API de manière asynchrone et attendre les réponses
    const [userDataResponse, picturesDataResponse] = await Promise.all([
      fetch(apiEndpoint),
      fetch(apiPictures),
    ]);

    // Vérifier que les réponses sont "ok"
    if (!userDataResponse.ok || !picturesDataResponse.ok) {
      throw new Error('L\'une ou les deux réponses de l\'API ne sont pas OK');
    }

    // Extraire les données JSON des réponses
    const userData = await userDataResponse.json();
    const picturesData = await picturesDataResponse.json();

    // Traiter les données utilisateur et images en fonction de userAction
    if(userData.response.pk_i_id != null){
      displayItemData(userData);
      displayItemPictures(picturesData);
      document.getElementById("buttonModifier").addEventListener("click",(e)=>{        
        clearTabClass(e.target)
        modifyItemData(userData)
        modifyItemPictures(picturesData);
    })
    }
    else{
      addItemData()
      addItemPictures() 
    }
   
    document.getElementById("buttonReservation").addEventListener("click",(e)=>{        
      console.log("reservation cliqué")
  })

      
    
    
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur ou des images :', error);
  }
}
    
    
    function modifyItemData(userData) {
      // Créez un formulaire pour afficher les données et permettre la modification
      var newtext = '<div class="flex justify-end">'
      newtext +=`<button onclick="window.location.href='index1.php?action=property&id=${userData.response.pk_i_id}';" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600" >Annuler</button>`;
      newtext +='<button id="modifier-button" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600 ml-2" >Enregistrer</button>';
      newtext += '</div>'
      newtext += '<div class="grid grid-cols-3 gap-4 p-5">';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2" id="swiper-img"></div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<form id="item-form">';
      newtext += '<span class="font-semibold">Titre : </span> <input type="text" id="titre-input" value="' + userData.response.s_title + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '<span class="font-semibold">Adresse : </span> <input type="text" id="adresse-input" value="' + userData.response.s_address + '" class="bg-gray-200 rounded-md p-2 mb-2">';
      newtext += '</form>';
      newtext += '</div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<form id="item-form">';
      newtext += '<span class="font-semibold">Prix : </span> <input type="text" id="prix-input" value="' + userData.response.i_price + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '<span class="font-semibold">Statut : </span> <input type="text" id="statut-input" value="' + userData.response.statut + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '</form>';
      newtext += '</div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<form id="item-form">';
      newtext += '<span class="font-bold">Contact : </span> <br>';
      newtext += '<span class="font-semibold">Nom de propriétaire : </span> <input type="text" id="nom-input" value="' + userData.response.s_contact_name + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '<span class="font-semibold">Numéro de téléphone : </span> <input type="text" id="tel-input" value="' + userData.response.s_contact_phone + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '</form>';
      newtext += '</div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<span class="font-semibold">Date d\'expiration : </span> <input type="text" id="expiration-input" value="' + userData.response.dt_expiration + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '<span class="font-semibold">Last occup : </span> <input type="text" id="last-occup-input" value="' + userData.response.last_occup + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '</div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<span class="font-semibold">Détails : </span> <input type="text" id="expiration-input" value="' + userData.response.s_description + '" class="bg-gray-200 rounded-md p-2 mb-2"><br>';
      newtext += '</div>';
      newtext += '</div>';
    
      document.getElementById('view-tab').innerHTML = newtext;
      //console.log(userData);
    
      // Ajouter un gestionnaire d'événements pour le bouton "Modifier"
      document.getElementById('modifier-button').addEventListener('click', function () {
        saveModifiedData(userData);
      });
      
    }
    function addItemData() {
      // Créez un formulaire pour afficher les données et permettre la modification
      var newtext = `<div class="flex justify-end">
      <button onclick="window.location.href='index1.php?action=propertyList'" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600">Annuler</button>
      <button id="save-button" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600 ml-2">Enregistrer</button>
  </div>
  <div class="grid grid-cols-3 gap-4 p-5">
      <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2" id="swiper-img"></div>
      <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
          <form id="item-form">
              <span class="font-semibold">Titre : </span> <input type="text" id="titre-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
              <span class="font-semibold">Adresse : </span> <input type="text" id="adresse-input" value="" class="bg-gray-200 rounded-md p-2 mb-2">
          </form>
      </div>
      <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
          <form id="item-form">
              <span class="font-semibold">Prix : </span> <input type="number" id="prix-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
              <span class="font-semibold">Statut : </span> <select id="statut-input" class="bg-gray-200 rounded-md p-2 mb-2">
              <option value="occupé">Occupée</option>
              <option value="disponible">Disponible</option>
          </select><br>
          </form>
      </div>
      <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
          <form id="item-form">
              <span class="font-bold">Contact : </span> <br>
              <span class="font-semibold">Nom de propriétaire : </span> <input type="text" id="nom-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
              <span class="font-semibold">Numéro de téléphone :  </span><input type="text" id="tel-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
                <p id="error-message" style="color: red;"></p>
          </form>
      </div>
      <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
          <span class="font-semibold">Date d'expiration : </span> <input type="date" id="expiration-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
          <span class="font-semibold">Last occup : </span> <input type="date" id="last-occup-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
      </div>
      <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
          <span class="font-semibold">Détails : </span> <input type="text" id="details-input" value="" class="bg-gray-200 rounded-md p-2 mb-2"><br>
      </div>
  </div>`
  
    
      document.getElementById('view-tab').innerHTML = newtext;
      //console.log(userData);
      const telInput = document.getElementById('tel-input');
      const errorMessage = document.getElementById('error-message');

      // Fonction pour valider le numéro de téléphone
      function validatePhoneNumber() {
          const phoneNumber = telInput.value;
          const phoneNumberPattern = /^\d{10}$/; // Format : 10 chiffres

          if (phoneNumberPattern.test(phoneNumber)) {
              errorMessage.textContent = ''; // Numéro de téléphone valide
          } else {
              errorMessage.textContent = 'Le numéro de téléphone doit contenir 10 chiffres.';
          }
      }

      // Écouteur d'événements pour valider lorsque l'utilisateur saisit quelque chose
      telInput.addEventListener('input', validatePhoneNumber);

      // Ajouter un gestionnaire d'événements pour le bouton "Enregistrer"
      document.getElementById('save-button').addEventListener('click', function () {
        var titreInput = document.getElementById("titre-input");
    var adresseInput = document.getElementById("adresse-input");
    var prixInput = document.getElementById("prix-input");
    var statutInput = document.getElementById("statut-input");
    var nomInput = document.getElementById("nom-input");
    var telInput = document.getElementById("tel-input");
    var expirationInput = document.getElementById("expiration-input");
    var lastOccupInput = document.getElementById("last-occup-input");
    var detailsInput = document.getElementById("details-input");

    // Obtenez une référence au bouton "Enregistrer"
    var enregistrerButton = document.getElementById("save-button");

    // Ajoutez un gestionnaire d'événement au bouton "Enregistrer"
    enregistrerButton.addEventListener("click", function() {
        // Récupérez les valeurs des champs

          var titre = titreInput.value;
          var adresse = adresseInput.value;
          var prix = prixInput.value;
          var statut = statutInput.value;
          var nom = nomInput.value;
          var tel = telInput.value;
          var expiration = expirationInput.value;
          var lastOccup = lastOccupInput.value;
          var details = detailsInput.value;

          if (
            titre.trim() === "" ||
            adresse.trim() === "" ||
            prix.trim() === "" ||
            statut.trim() === "" ||
            nom.trim() === "" ||
            tel.trim() === "" ||
            expiration.trim() === "" ||
            lastOccup.trim() === "" ||
            details.trim() === ""
          ) {
            alert("Veuillez remplir tous les champs.");
          } else {
            var data = {
              titre: titre,
              adresse: adresse,
              prix: prix,
              statut: statut,
              nom: nom,
              tel: tel,
              expiration: expiration,
              lastOccup: lastOccup,
              details: details
            };
            console.log(data);
          }
        // Créez un objet contenant les données à envoyer à l'API
        
        // Utilisez la méthode fetch pour envoyer les données à l'API
        // fetch('URL_DE_VOTRE_API', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(function(response) {
        //     // Traitez la réponse de l'API ici
        //     if (response.ok) {
        //         // La requête a réussi
        //         return response.json(); // Si l'API renvoie JSON
        //     } else {
        //         // La requête a échoué
        //         throw new Error('Erreur lors de la requête à l\'API');
        //     }
        // })
        // .then(function(data) {
        //     // Traitez les données renvoyées par l'API ici
        //     console.log(data);
        // })
        // .catch(function(error) {
        //     // Gérez les erreurs ici
        //     console.error(error);
        // });
    });
      });
      
    }
    var imageUrls = [];
  function addItemPictures() {


        function generateTopGallery() {
          return `
          <div class="swiper gallery-top swiper-initialized swiper-horizontal swiper-backface-hidden">
              
              <div id="selected-images" class="swiper-wrapper" aria-live="polite"></div>
              <div id="js-prev1" class="swiper-button-prev"></div>
              <div id="js-next1" class="swiper-button-next"></div>
              <div  class="swiper-container gallery-thumbs swiper-initialized swiper-horizontal swiper-free-mode swiper-watch-progress swiper-backface-hidden" style ="margin-top: 10px">
                  <div id="images-container" class="swiper-wrapper " aria-live="polite">
                    
                  </div>
                  <div id="addPic" style = "margin-top : 10px" ></div>
              </div>
          </div>
          `;
        }
        
        
        // Maintenant, vous pouvez utiliser ces fonctions pour générer la structure HTML
        
        var text = generateTopGallery();
        //text += generateThumbnailGallery();










    
    // Créer la structure HTML pour les Swiper slides
    document.getElementById('swiper-img').innerHTML = text;
   
  
    const swiper = new Swiper('.gallery-top', {
      speed: 400,
      navigation: {
        nextEl: '#js-next1',
        prevEl: '#js-prev1',
      },
    });
    
    // Créez une instance Swiper pour les miniatures
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '#js-next1',
        prevEl: '#js-prev1',
      },
    });
    
    // Associez les instances Swiper pour qu'elles se contrôlent mutuellement
    swiper.controller.control = galleryThumbs;
    galleryThumbs.controller.control = swiper;
   
    
  
    
    // Maintenant, vous avez un tableau imageUrls contenant les URLs des images
    //console.log(imageUrls.length);
    for (var i = 0; i < imageUrls.length; i++) {

      addImage(imageUrls[i]);

    }

    const imagesContainer = document.getElementById("addPic");

    // Assurez-vous que l'élément a été trouvé
    if (imagesContainer) {
      // Ajoutez le formulaire à l'élément div
      const thumbnailImages = document.querySelectorAll('.gallery-thumbs img');
      thumbnailImages.forEach(function (thumbnailImage) {
        thumbnailImage.addEventListener('click', function () {
          const slideIndex = parseInt(this.getAttribute('data-slide-index'));
          swiper.slideTo(slideIndex);
        });
      });
    
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.style.display = "none"; // Cacher l'input
    
      // Créez un bouton cliquable avec des classes Tailwind CSS
      const clickableButton = document.createElement("button");
      clickableButton.textContent = "Ajouter une image";
      clickableButton.classList.add(
        "bg-blue-500", // Couleur d'arrière-plan bleue
        "hover:bg-blue-700", // Couleur d'arrière-plan au survol
        "text-white", // Couleur du texte blanc
        "font-bold", // Texte en gras
        "py-2", // Rembourrage vertical
        "px-4", // Rembourrage horizontal
        "rounded" // Coins arrondis
      );
      clickableButton.style.cursor = "pointer"; // Changez le curseur pour montrer que le bouton est cliquable
      clickableButton.style.width = "308px";
      clickableButton.addEventListener("click", () => {
        fileInput.click();
      });
    
      // Ajouter l'input et le bouton à votre structure HTML
      imagesContainer.appendChild(fileInput);
      imagesContainer.appendChild(clickableButton);
    
      // Ajouter un gestionnaire d'événement pour détecter la sélection de fichier
      fileInput.addEventListener("change", (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          if (selectedFile.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(selectedFile);
            imageUrls.push(imageUrl);
            addImage(imageUrl);
          } else {
            alert("Veuillez sélectionner une image.");
          }
        }
      });
    } else {
      console.error("L'élément avec l'ID 'images-container' n'a pas été trouvé.");
    }
// Ajouter des écouteurs d'événements de clic aux miniatures



    //swiperimages();
    // Vous pouvez utiliser le tableau imageUrls comme bon vous semble
  }
 async function displayItemData(userData) {
      // Create an HTML element using the fetched data
      var newtext = '<div class="flex justify-end">'
      newtext += `<button id="buttonReservation" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600" >Réservation</button>`
      newtext += '<button id="buttonModifier" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600 ml-2" ; style ="margin-right: 21px" >Modifier</button>'
      newtext += '</div>'; 
      newtext += '<div class="grid grid-cols-3 gap-4 p-5">';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2" id="swiper-img"></div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<span class="font-semibold">Titre : </span> ' + userData.response.s_title + '<br><span class="font-semibold"> adresse : </span>' + userData.response.s_address;
      newtext += '</div> <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2">';
      newtext += '<span class="font-semibold">Prix : </span> ' + userData.response.i_price + '<br> <span class="font-semibold"> Statut : </span>' + '....' + '<br> <span class="font-bold"> contact : </span> <br> <span class="font-semibold"> Nom de proprietaire : </span>' + userData.response.s_contact_name + '<br> <span class="font-semibold"> Numero de telephone : </span>' + userData.response.s_contact_phone + '<br><span class="font-semibold"> date d\'expiration : </span>' + userData.response.dt_expiration + '<br><span class="font-semibold"> Last occup : </span>de ' + '...' + 'à ' + '...';
      newtext += '</div> <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg"><span class="font-semibold"> Details : </span>' + userData.response.s_description + '</div>';
      document.getElementById('view-tab').innerHTML = newtext;


      //console.log(userData);
    }
    


  function displayItemPictures(picturesData) {


   
    // Create the initial HTML structure for the Swiper slides
    var text = '<div class="swiper gallery-top">';
    text += '<div class="swiper-pagination" ></div><div class="swiper-wrapper">';
  
    // Loop through the items in the API response
    picturesData.response.forEach(function (item) {
      // Assuming each item has a "s_name" property containing the image name
      var itemId = item.pk_i_id;
      var extension = item.s_extension;
      var path = item.s_path;
  
      // Create the HTML structure for each slide using the extracted properties
      text += '<div class="swiper-slide">';
      text += `<div class="swiper-slide-container">
                <img src="https://sakane.ma/${path}${itemId}.${extension}"
                data-src="https://sakane.ma/${path}${itemId}.${extension}"
                loading="lazy" alt="Item Picture">
              </div>`;
      text += '</div>';
    });
  
    // Close the HTML structure
    text += '</div>';
  
    text +=  ` <div id="js-prev1" class="swiper-button-prev"></div>
    <div id="js-next1" class="swiper-button-next"></div>`;
  
    // Add thumbnails section
    text += '<div class="swiper-container gallery-thumbs" style="margin-top: 10px">';
    text += '<div class="swiper-wrapper">'
    
    // Loop through the items again to create thumbnails
    picturesData.response.forEach(function (item) {
      var itemId = item.pk_i_id;
      var extension = item.s_extension;
      var path = item.s_path;
  
      // Create the HTML structure for each thumbnail using the extracted properties
      text += '<div class="swiper-slide">'
      text += `<div class="swiper-slide-container">
              <img class="lazy" src="https://sakane.ma/${path}${itemId}.${extension}"
              data-src="https://www.sakane.ma/oc-content/uploads/84/24159_thumbnail.jpg" 
              alt="Dar bouazza, Bel appartement a louer, semi meublé 3CH - 2" loading="lazy"></img>
              </div>`
      
      // <img src="https://sakane.ma/${path}${itemId}.${extension}" alt="Item Thumbnail">`;
      text += '</div>';
    });
  
    // Close the thumbnails section
    text += '</div>';
    text += '</div>'; // Closing the gallery-thumbs div
  
    //console.log(text);
  
    document.getElementById('swiper-img').innerHTML = text;
  
    // Create a Swiper instance for the main slider
    const swiper = new Swiper('.gallery-top', {
      speed: 400,
      navigation: {
        nextEl: '#js-next1',
        prevEl: '#js-prev1',
      },
    });
    
    // Créez une instance Swiper pour les miniatures
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '#js-next1',
        prevEl: '#js-prev1',
      },
    });
  
    // Synchronize the main slider with the thumbnails
    swiper.controller.control = galleryThumbs;
    galleryThumbs.controller.control = swiper;
  
     // Add click event listeners to the thumbnails
     const thumbnailImages = document.querySelectorAll('.gallery-thumbs img');
     thumbnailImages.forEach(function (thumbnailImage) {
       thumbnailImage.addEventListener('click', function () {
         const slideIndex = parseInt(this.getAttribute('data-slide-index'));
         swiper.slideTo(slideIndex);
       });
     });
  }
  
  var imageUrls = [];
  function modifyItemPictures(picturesData) {


        function generateTopGallery() {
          return `
          <div class="swiper gallery-top swiper-initialized swiper-horizontal swiper-backface-hidden">
              
              <div id="selected-images" class="swiper-wrapper" aria-live="polite"></div>
              <div id="js-prev1" class="swiper-button-prev"></div>
              <div id="js-next1" class="swiper-button-next"></div>
              <div  class="swiper-container gallery-thumbs swiper-initialized swiper-horizontal swiper-free-mode swiper-watch-progress swiper-backface-hidden" style ="margin-top: 10px">
                  <div id="images-container" class="swiper-wrapper " aria-live="polite">
                    
                  </div>
                  <div id="addPic" style = "margin-top : 10px" ></div>
              </div>
          </div>
          `;
        }
        
        
        // Maintenant, vous pouvez utiliser ces fonctions pour générer la structure HTML
        
        var text = generateTopGallery();
        //text += generateThumbnailGallery();










    
    // Créer la structure HTML pour les Swiper slides
    document.getElementById('swiper-img').innerHTML = text;
    // Loop à travers les éléments dans la réponse de l'API
    picturesData.response.forEach(function (item) {
      var itemId = item.pk_i_id;
      var extension = item.s_extension;
      var path = item.s_path;
  
      // Créer l'URL de l'image
      var imageUrl = `https://sakane.ma/${path}${itemId}.${extension}`;
  
      // Ajouter l'URL à notre tableau imageUrls
      imageUrls.push(imageUrl);
  
      // Créer la structure HTML pour chaque slide en utilisant les propriétés extraites
    });
  
    const swiper = new Swiper('.gallery-top', {
      speed: 400,
      navigation: {
        nextEl: '#js-next1',
        prevEl: '#js-prev1',
      },
    });
    
    // Créez une instance Swiper pour les miniatures
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '#js-next1',
        prevEl: '#js-prev1',
      },
    });
    
    // Associez les instances Swiper pour qu'elles se contrôlent mutuellement
    swiper.controller.control = galleryThumbs;
    galleryThumbs.controller.control = swiper;
   
    
  
    
    // Maintenant, vous avez un tableau imageUrls contenant les URLs des images
    //console.log(imageUrls.length);
    for (var i = 0; i < imageUrls.length; i++) {

      addImage(imageUrls[i]);

    }

    const imagesContainer = document.getElementById("addPic");

    // Assurez-vous que l'élément a été trouvé
    if (imagesContainer) {
      // Ajoutez le formulaire à l'élément div
      const thumbnailImages = document.querySelectorAll('.gallery-thumbs img');
      thumbnailImages.forEach(function (thumbnailImage) {
        thumbnailImage.addEventListener('click', function () {
          const slideIndex = parseInt(this.getAttribute('data-slide-index'));
          swiper.slideTo(slideIndex);
        });
      });
    
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.style.display = "none"; // Cacher l'input
    
      // Créez un bouton cliquable avec des classes Tailwind CSS
      const clickableButton = document.createElement("button");
      clickableButton.textContent = "Ajouter une image";
      clickableButton.classList.add(
        "bg-blue-500", // Couleur d'arrière-plan bleue
        "hover:bg-blue-700", // Couleur d'arrière-plan au survol
        "text-white", // Couleur du texte blanc
        "font-bold", // Texte en gras
        "py-2", // Rembourrage vertical
        "px-4", // Rembourrage horizontal
        "rounded" // Coins arrondis
      );
      clickableButton.style.cursor = "pointer"; // Changez le curseur pour montrer que le bouton est cliquable
      clickableButton.style.width = "308px";
      clickableButton.addEventListener("click", () => {
        fileInput.click();
      });
    
      // Ajouter l'input et le bouton à votre structure HTML
      imagesContainer.appendChild(fileInput);
      imagesContainer.appendChild(clickableButton);
    
      // Ajouter un gestionnaire d'événement pour détecter la sélection de fichier
      fileInput.addEventListener("change", (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          if (selectedFile.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(selectedFile);
            imageUrls.push(imageUrl);
            addImage(imageUrl);
          } else {
            alert("Veuillez sélectionner une image.");
          }
        }
      });
    } else {
      console.error("L'élément avec l'ID 'images-container' n'a pas été trouvé.");
    }
// Ajouter des écouteurs d'événements de clic aux miniatures



    //swiperimages();
    // Vous pouvez utiliser le tableau imageUrls comme bon vous semble
  }
  
  var imagesContainer;
  var selectedImagesContainer;
  var selectedImageWrapper;
  var tableUrl = [];

  function addImage(imageUrls) {
    imagesContainer = document.getElementById("images-container");
    selectedImagesContainer = document.getElementById("selected-images");
  
    var imageElement = document.createElement("img");
    imageElement.src = imageUrls;
    imageElement.alt = "Uploaded Image";
    imageElement.classList.add("w-32", "h-16", "object-cover", "rounded", "image-pop");
  
    selectedImageWrapper = document.createElement("div");
    selectedImageWrapper.classList.add("swiper-slide");
    selectedImageWrapper.appendChild(imageElement.cloneNode(true));
    selectedImagesContainer.appendChild(selectedImageWrapper);
  
    (function(imageElement) {
      var deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button", "absolute", "top-0", "right-0", "text-red-500", "hover:text-red-700", "p-1");
  
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6.293 4.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg> `;
      deleteButton.addEventListener("click", function() {
        var imageContainer = this.parentNode;
        var selectedImageContainer = imageContainer.parentNode.parentNode;
        
        imagesContainer.removeChild(imageContainer);
  
        var selectedImageWrappers = document.querySelectorAll(".swiper-slide");
        //console.log(selectedImageWrappers)
        selectedImageWrappers.forEach(function(wrapper) {
          //console.log(wrapper)
          var image = wrapper.querySelector("img");
          //console.log(image)
          if (image.src === imageElement.src) {
            wrapper.parentNode.removeChild(wrapper);
            supprimerOccurrencesDeSource(imageElement.src);
          }
  
        });
      });
      var imageWrapper = document.createElement("div");
      imageWrapper.classList.add("swiper-slide");
      imageWrapper.appendChild(imageElement);
      imageWrapper.appendChild(deleteButton);
  
      imagesContainer.appendChild(imageWrapper);
    })(imageElement);








    
  }
  function supprimerOccurrencesDeSource(source) {

    tableUrl = tableUrl.filter(item => item !== source);
  }
  



  function clearTabClass(e){
    document.getElementById("view-tab").innerHTML = ""
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("text-blue-500","border-b-2","font-medium","border-blue-500"))
    e.classList.add("text-blue-500","border-b-2","font-medium","border-blue-500")
}
  
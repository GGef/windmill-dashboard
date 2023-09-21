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
    
      displayItemData(userData);
      displayItemPictures(picturesData);

      
      document.getElementById("buttonModifier").addEventListener("click",(e)=>{        
        clearTabClass(e.target)
        modifyItemData(userData)
        modifyItemPictures(picturesData);
        
        
    })
    
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur ou des images :', error);
  }
}
    
    
    function modifyItemData(userData) {
      // Créez un formulaire pour afficher les données et permettre la modification
      var newtext = '<div class="flex justify-end">'
      newtext +='<a href="index1.php?action=propertyList"><button class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600" >Annuler</button>';
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



    async function displayItemData(userData) {
      // Create an HTML element using the fetched data
      var newtext = '<div class="grid grid-cols-3 gap-4 p-5">';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2" id="swiper-img"></div>';
      newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">';
      newtext += '<span class="font-semibold">Titre : </span> ' + userData.response.s_title + '<br><span class="font-semibold"> adresse : </span>' + userData.response.s_address;
      newtext += '</div> <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2">';
      newtext += '<span class="font-semibold">Prix : </span> ' + userData.response.i_price + '<br> <span class="font-semibold"> Statut : </span>' + '....' + '<br> <span class="font-bold"> contact : </span> <br> <span class="font-semibold"> Nom de proprietaire : </span>' + userData.response.s_contact_name + '<br> <span class="font-semibold"> Numero de telephone : </span>' + userData.response.s_contact_phone + '<br><span class="font-semibold"> date d\'expiration : </span>' + userData.response.dt_expiration + '<br><span class="font-semibold"> Last occup : </span>de ' + '...' + 'à ' + '...';
      newtext += '</div> <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg"><span class="font-semibold"> Details : </span>' + userData.response.s_description + '</div>';
      newtext += '<button id="buttonModifier" class="bg-blue-500 text-white rounded-md py-2 px-4 mt-2 hover:bg-blue-600">Modifier</button>';
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
    text += '<div class="swiper-container gallery-thumbs">';
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
    const swiper = new Swiper('.swiper', {
      speed: 400,
      spaceBetween: 100,
     
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        nextButton: '#js-prev1',
        prevButton: '#js-next1',
      },
    });
  
    // Create a Swiper instance for the thumbnails
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
          // navigation arrows
          nextButton: '#js-prev1',
          prevButton: '#js-next1',
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
              <div  class="swiper-container gallery-thumbs swiper-initialized swiper-horizontal swiper-free-mode swiper-watch-progress swiper-backface-hidden">
                  <div class="swiper-wrapper" id="swiper-wrapper-4fd16d0a9b23ba16" aria-live="polite">
                  <div id="images-container" >
                      <div class="flex flex-row">
                      </div>
                  </div>
                  </div>
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
  
    const swiper = new Swiper('.swiper', {
      speed: 400,
     
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        nextButton: '#js-prev1',
        prevButton: '#js-next1',
      },
    });
  
    // Create a Swiper instance for the thumbnails
    const galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
          // navigation arrows
          nextButton: '#js-prev1',
          prevButton: '#js-next1',
    });
  
   
    
  
    
    // Maintenant, vous avez un tableau imageUrls contenant les URLs des images
    //console.log(imageUrls.length);
    for (var i = 0; i < imageUrls.length; i++) {

      addImage(imageUrls[i]);

    }
    swiper.controller.control = galleryThumbs;
    galleryThumbs.controller.control = swiper;

// Ajouter des écouteurs d'événements de clic aux miniatures
const thumbnailImages = document.querySelectorAll('.gallery-thumbs img');
thumbnailImages.forEach(function (thumbnailImage) {
  thumbnailImage.addEventListener('click', function () {
    const slideIndex = parseInt(this.getAttribute('data-slide-index'));
    swiper.slideTo(slideIndex);
  });
});
const imagesContainer = document.getElementById("images-container");

// Assurez-vous que l'élément a été trouvé
if (imagesContainer) {
  // Ajoutez le formulaire à l'élément div
  const form = document.createElement("form");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "fileInput"; // Ajoutez un ID pour référencer l'input plus tard si nécessaire

  // Ajouter un label pour l'input de type file (optionnel)
  const fileLabel = document.createElement("label");
  fileLabel.textContent = "Sélectionner une photo";
  fileLabel.htmlFor = "fileInput";

  // Ajouter le formulaire à votre structure HTML
  document.body.appendChild(form);
  //form.appendChild(fileLabel);
  form.appendChild(fileInput);

  // Ajouter un gestionnaire d'événement pour détecter la sélection de fichier
  fileInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];

    // Vérifier si un fichier a été sélectionné
    if (selectedFile) {
      // Vous pouvez maintenant traiter le fichier, par exemple, en l'ajoutant à imageUrls
      // Assurez-vous que selectedFile est une image avant de l'ajouter

      // Exemple : Vérifier si le type de fichier est une image
      if (selectedFile.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(selectedFile);
        imageUrls.push(imageUrl);

        // Mettez à jour la galerie d'images avec la nouvelle image
        addImage(imageUrl);
      } else {
        alert("Veuillez sélectionner une image.");
      }
    }
  });
  imagesContainer.appendChild(form);
} else {
  console.error("L'élément avec l'ID 'images-container' n'a pas été trouvé.");
}



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
        
        imagesContainer.querySelector(".flex-row").removeChild(imageContainer);
  
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
      imageWrapper.classList.add("mr-2", "mb-2", "relative");
      imageWrapper.appendChild(imageElement);
      imageWrapper.appendChild(deleteButton);
  
      imagesContainer.querySelector(".flex-row").appendChild(imageWrapper);
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
  
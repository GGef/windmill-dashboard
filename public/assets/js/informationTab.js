// export default function informationTab(data){
//     const donneesDeTest = genererDonneesDeTest(5); // Générer 5 éléments de test (ajustez le nombre selon vos besoins)

//     donneesDeTest.forEach(element => {
//         // Créer un élément de div pour afficher les données de l'élément
//         const elementDiv = "";
//         //elementDiv.classList.add('grid', 'grid-cols-3', 'gap-4', 'p-5');
        
//         // Remplir le contenu de l'élément avec les données de l'élément
//         elementDiv.innerHTML = `
//           <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2" id="swiper-img"></div>
//           <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
//             <span class="font-semibold">Titre : ${element.titre}</span><br>
//             <span class="font-semibold">Adresse : ${element.adress}</span>
//           </div>
//           <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2">
//             <img src="${element.image}" alt="Image" style="max-width: 100%;">
//         </div>
//           <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg row-span-2">
//             <span class="font-semibold">Prix : ${element.valeur}</span><br>
//             <span class="font-semibold">Statut : ${element.statut}</span><br>
//             <span class="font-bold">Contact : ${element.contact}</span><br>
//             <span class="font-semibold">Nom de propriétaire : ${element.nomPropritaire}</span><br>
//             <span class="font-semibold">Numéro de téléphone : ${element.numeroTelephone}</span><br>
//             <span class="font-semibold">Date d'expiration : ${element.dateExpiration}</span><br>
//             <span class="font-semibold">Last occup : ${element.nom}</span>
//           </div>
//           <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm p-10 rounded-lg">
//             <span class="font-semibold">Details : ${element.description}</span>
//           </div>
//         `;
//         // Create an HTML element using the fetched data
//         return elementDiv;
//         // document.getElementById(new).innerHTML = newtext;
//         // console.log(userData);``
      
//     });
// }
// function genererDonneesDeTest(nombreDElements) {
//     const donnees = [];
//     const images = [
//         'https://example.com/image1.jpg',
//         'https://example.com/image2.jpg',
//         'https://example.com/image3.jpg',
//         // Ajoutez autant d'URLs d'images que vous le souhaitez
//       ];
  
//     for (let i = 1; i <= nombreDElements; i++) {
//       const randomImage = images[Math.floor(Math.random() * images.length)];
//       const element = {
//         id: i,
//         titre : `titre ${i}`,
//         adress : `adress ${i}`,
//         statut : `status ${i}`,
//         contact : `contact ${i}`,
//         nomPropritaire : `nomPropritaire ${i}`,
//         numeroTelephone : `numeroTelephone ${iiiiiiiiiiiiiiii}`,
//         nom: `Élément ${i}`,
//         image: randomImage,
//         description: `Ceci est la description de l'élément ${i}`,
//       };
  
//       donnees.push(element);
//     }
  
//     return donnees;
//   }

export default function informationTab(data){
    
        // document.getElementById(new).innerHTML = newtext;
        // console.log(userData);``
        //var userRows = document.querySelectorAll('.item-row');
    // Find the corresponding .detailsRow element for the clicked .user-row
        var userRows = document.querySelectorAll('.item-row');
        userRows.forEach(function (userRow) {
        userRow.addEventListener('click', function () {
    // Find the corresponding .detailsRow element for the clicked .user-row
    var detailsRow = this.nextElementSibling;
    if ( event.target.tagName !== 'A' && !event.target.closest('button')) {
    // Check if the display property is set to 'none'
      if (detailsRow.style.display === 'none') {
        // Change the display property to 'table-row'
        detailsRow.style.display = 'table-row';

        // Get the user ID from the data-id attribute of the clicked row
        var userId = userRow.dataset.id;
        console.log(userId)
        //  make an API call to get more details about the user.
        var apiEndpoint = 'https://www.sakane.ma/oc-content/plugins/rest/api.php?key=DOoebZRUU1ozFAelnC5u7x8hMvcqBV&type=read&object=item&action=byId&itemId=' + userId;
        var apiPictures = 'https://www.sakane.ma/oc-content/plugins/rest/api.php?key=DOoebZRUU1ozFAelnC5u7x8hMvcqBV&type=read&object=item&action=resourcesById&itemId=' + userId
          
        Promise.all([fetch(apiEndpoint), fetch(apiPictures)])
          .then(responses => {
            // Check for errors in the responses
            if (!responses[0].ok || !responses[1].ok) {
              throw new Error('One or both API responses were not ok');
            }

            // Parse the responses as JSON
            return Promise.all([responses[0].json(), responses[1].json()]);
          })
          .then(data => {
            var userData = data[0];
            var picturesData = data[1];

            // Process the user data and pictures data received from the APIs
            displayItemData(userData);
            displayItemPictures(picturesData)
          })
          .catch(error => {
            console.error('Error fetching user data or pictures:', error);
          });
      } else {
        // If the details row is visible, hide it by setting the display property to 'none'
        detailsRow.style.display = 'none';
      }
    }
  });
});
}

function displayItemData(userData ) {
    // Create an HTML element using the fetched data
    var newtext = '<div class="grid grid-cols-3 gap-4 p-5">';
    newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm  p-10 rounded-lg row-span-2" id="swiper-img"></div>';
    newtext += '<div class="shadow-lg bg-gray-100 px-4 py-3 text-sm  p-10 rounded-lg">';
    newtext += '<span class="font-semibold">Titre : </span> ' + userData.response.s_title +'<br><span class="font-semibold"> adresse : </span>'+ userData.response.s_address ;
    newtext += '</div> <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm  p-10 rounded-lg row-span-2">';
    newtext += '<span class="font-semibold">Prix : </span> ' + userData.response.i_price + '<br> <span class="font-semibold"> Statut : </span>' + '....' +  '<br> <span class="font-bold"> contact : </span> <br> <span class="font-semibold"> Nom de proprietaire : </span>'+ userData.response.s_contact_name + '<br> <span class="font-semibold"> Numero de telephone : </span>'+ userData.response.s_contact_phone +  '<br><span class="font-semibold"> date d\'expiration : </span>'+ userData.response.dt_expiration + '<br><span class="font-semibold"> Last occup : </span>de ' + '...' + 'à ' + '...';
    newtext += '</div> <div class="shadow-lg bg-gray-100 px-4 py-3 text-sm   p-10 rounded-lg"><span class="font-semibold"> Details : </span>' + userData.response.s_description + '</div> </div>';
    document.getElementById('new').innerHTML = newtext;
    console.log(userData);
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
  
    console.log(text);
  
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
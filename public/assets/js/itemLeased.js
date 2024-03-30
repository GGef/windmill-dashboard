
//---------------------------------------------------------------------
var limit = 5
document.addEventListener("DOMContentLoaded", function() {
  //Obtenez une référence vers le bouton
  var bottonNext = document.getElementById("NextButton");
  var bottonPrevius = document.getElementById("PreviousButton");
  var searchInput = document.getElementById("searchInput");
  var page = 1;
  GetItem(page)
  //Utilisez addEventListener pour détecter le clic sur le bouton
  bottonNext.addEventListener("click", (e) => {
    page = (bottonNext.getAttribute("data-current-id") * 1) + 1;
    if ((bottonNext.getAttribute("data-current-id") * 1) + 1 < document.getElementById("endPage").value) {
      console.log(page);
      GetItem(page);
      bottonNext.setAttribute("data-current-id", `${page}`);
      bottonPrevius.setAttribute("data-current-id", `${page}`);
    }
  });

  bottonPrevius.addEventListener("click", (e) => {
    // Effectuez une action AJAX ici (par exemple, récupérez des données du serveur)
    var page = (bottonNext.getAttribute("data-current-id")*1) -1
    if((bottonNext.getAttribute("data-current-id")*1)-1 >= 1){
    console.log(page)
    GetItem(page)
    bottonNext.setAttribute("data-current-id",`${page}`)
    bottonPrevius.setAttribute("data-current-id",`${page}`)
    }
  });

    // Add event listener for search input
    searchInput.addEventListener("input", function() {
      console.log('search : ' + this.value.trim())
        GetItem(1);
        console.log("searched")      
    });

    document.addEventListener("click", function(event) {
      if (event.target.matches(".pagination")) {
          var pageNumber = parseInt(event.target.getAttribute("data-id"));
          console.log(`Page number clicked: ${pageNumber}`);
          if (pageNumber <= document.getElementById("endPage").value && pageNumber >=1) {
            GetItem(pageNumber);
            bottonNext.setAttribute("data-current-id", `${pageNumber}`);
            bottonPrevius.setAttribute("data-current-id", `${pageNumber}`);
        }
      }
  });
});

//----------------Fonction 2-----------------------
// document.addEventListener("DOMContentLoaded", function() {
//   // Obtenez une référence vers le bouton
//   var btns = document.querySelectorAll(".pagination")
//   // Utilisez addEventListener pour détecter le clic sur le bouton
//   btns.forEach(el=>{
//   el.addEventListener("click",(e)=>{
//     var bottonNext = document.getElementById("NextButton");
//     var bottonPrevius = document.getElementById("PreviousButton");
//     GetItem(e.target.getAttribute("data-id"));
//     bottonNext.setAttribute("data-current-id",`${e.target.getAttribute("data-id")}`)
//     bottonPrevius.setAttribute("data-current-id",`${e.target.getAttribute("data-id")}`)
    
//   })
//   })
// });

function GetItem(pageNumber){
  console.log(`Le Nombre a été cliqué !${pageNumber}`);
  var inputValue = document.getElementById("searchInput").value.trim(); // Trim whitespace
  var isSearch = inputValue !== "";
  var action = isSearch ? "SearchItemLeased" : "paginationItemL";
  var queryParam = isSearch ? `&query=${inputValue}` : "";
  pagination(pageNumber, inputValue); // Update pagination

  $.ajax({
    url: `index1.php?action=${action}&limit=${limit}&prepa=${pageNumber}${queryParam}`, // URL du script PHP à appeler
    type: "GET",             // Méthode de la requête (GET, POST, etc.)
    dataType: "json",   
     // Type de données attendu en retour (json, text, html, etc.)
     success: function(data) {
      console.log('Data received:', data);
      var tableBody = document.getElementById("data-table-body");
      tableBody.innerHTML = ""; // Clear existing rows
      
      data.data.forEach(el => {
          let createRow = document.createElement("tr");
          // createRow.setAttribute('class', 'flex justify-between  items-center px-4 py-3 text-sm  bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12');
          // createRow.setAttribute('data-id', `${el.id}`);
          createRow.innerHTML = rowTable(el);
          tableBody.appendChild(createRow); // Append row to table body
      });  
        $("#resultat").html("Réponse du serveur : " + data.message);
    },
    error: function() {
      // Cette fonction sera appelée en cas d'échec de la requête
      $("#resultat").html("Échec de la requête AJAX.");
    }
  });

}

function pagination(pageNumber, query) {
  $.ajax({
      url: `index1.php?action=lengthItemL&query=${query}`,
      type: "GET",
      dataType: "json",
      success: function(data) {
        console.log("-> " + data.data[0]['COUNT(*)'])
          var totalItems = data.data[0]['COUNT(*)'];
          var totalPages = Math.ceil(totalItems / limit);
          updatePagination(totalPages);
          updatePaginationInfo(pageNumber, totalItems);
          $("#resultat").html("Réponse du serveur : " + data.message);
      },
      error: function() {
          $("#resultat").html("Échec de la requête AJAX.");
      }
  });
}

function updatePaginationInfo(pageNumber, totalItems) {
  var startItem = (pageNumber - 1) * limit + 1;
  var endItem = Math.min(startItem + 4, totalItems);
  var paginationInfo = `AFFICHAGE ${startItem}-${endItem} SUR ${totalItems}`;
  document.getElementById("affichage").innerHTML = paginationInfo;
}

function updatePagination(totalPages) {
  var paginationHTML = '';
  for (var i = 1; i <= totalPages; i++) {
      paginationHTML += `<li><button class="pagination px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple" data-id=${i}>${i}</button></li>`;
  }
  document.getElementById("pagination").innerHTML = paginationHTML;
}

function rowTable(item){
   let newItem = `
  
        <td>${item.id}</td>
        <td>${item.item_name}</td>
        <td>${item.username}</td>
        <td>${item.time_from}</td>
        <td>${item.time_to}</td>
        <td>${item.price_total}</td>
         
        <td >
          <button>
            <a class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              aria-label="Edit"
              href="index1.php?action=editItem&id=${item.id}">
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </a>
          </button>
          <button>
            <a
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              aria-label="Delete" onclick="return confirm('voulez vous vraiment supprimer ce utilisateur')" 
              href="index1.php?action=destroyItem&id=${item.id}" >
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd" >
                </path>
              </svg>
            </a>
          </button> 
        </td>`
    //console.log(newItem);

   return newItem;
 
}

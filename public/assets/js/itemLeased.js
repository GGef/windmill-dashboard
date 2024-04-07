
//---------------------------------------------------------------------
var limit = 5
var sort = "id";
var direction = "asc"

document.addEventListener("DOMContentLoaded", function() {
  //Obtenez une référence vers le bouton
  var bottonNext = document.getElementById("NextButton");
  var bottonPrevius = document.getElementById("PreviousButton");
  var page = (bottonNext.getAttribute("data-current-id") * 1) - 1;

  var searchInput = document.getElementById("searchInput");
  var page = 1;
  GetItem(page);
  //Utilisez addEventListener pour détecter le clic sur le bouton
  bottonNext.addEventListener("click", (e) => {
    var page = (bottonNext.getAttribute("data-current-id")*1) +1
    if(page <= document.getElementById("endPage").value){
      console.log(page)
      GetItem(page)
      bottonNext.setAttribute("data-current-id",`${page}`)
      bottonPrevius.setAttribute("data-current-id",`${page}`)
    }
          
  });

  bottonPrevius.addEventListener("click", function(e) {
    var page = (bottonNext.getAttribute("data-current-id")*1) -1
    if(page >= 1){
      console.log(page)
      GetItem(page)
      bottonNext.setAttribute("data-current-id",`${page}`)
      bottonPrevius.setAttribute("data-current-id",`${page}`)
    }
  });

  searchInput.addEventListener("input", function() {
      GetItem(1); // Trigger item retrieval when input changes
  });

    // Add event listener for search input
    // searchInput.addEventListener("input", function() {
    //   console.log('search : ' + this.value.trim())
    //     GetItem(1);
    //     console.log("searched")      
    // });

    document.addEventListener("click", function(event) {
      if (event.target.matches(".pagination")) {
        const pageNumber = parseInt(event.target.getAttribute("data-id"));
        console.log(`Page number clicked: ${pageNumber}`);
              GetItem(pageNumber);
              bottonNext.setAttribute("data-current-id", `${pageNumber}`);
              bottonPrevius.setAttribute("data-current-id", `${pageNumber}`);
          
        }
    });

  //--------------------sorting && limit---------------------
  var tableHeaders = document.querySelectorAll("th.sorting, th.sorting-asc, th.sorting-desc");
  var columnSortMapping = {
      "ID": "id",
      "NOM": "item_name",
      "LOCATAIRE": "username",
      "À PARTIR DE": "time_from",
      "JUSQU'À": "time_to",
      "PRIX TOTAL": "price_total"
  };
  tableHeaders.forEach(function(header) {
      header.addEventListener("click", function() {
          var sortDirection = "sorting-asc";
          if (header.classList.contains("sorting-asc")) {
              sortDirection = "sorting-desc";
          }

          // Reset sorting classes on all headers
          tableHeaders.forEach(function(header) {
              header.classList.remove("sorting-asc", "sorting-desc");
              header.classList.add("sorting");
          });

          // Set sorting class and direction on clicked header
          header.classList.remove("sorting");
          header.classList.add(sortDirection);

          // Perform sorting logic or return the value of the clicked header
          var columnHeader = header.textContent.trim(); // Get the text content of the header
          sort = columnSortMapping[columnHeader];
          direction = sortDirection.substring(sortDirection.indexOf("-") + 1);
          GetItem(page);

      });
  });
   // Get the select element for the limit
   var selectElement = document.getElementById("limit");

   // Initialize the limit variable with the default value
   limit = selectElement.value;

   // Add event listener to the select element
   selectElement.addEventListener("change", function() {
       // Update the limit variable with the selected value
       limit = this.value;
       GetItem(page);
   });

});

function GetItem(pageNumber){
  console.log(`Le Nombre a été cliqué !${pageNumber}`);
  var inputValue = document.getElementById("searchInput").value.trim(); // Trim whitespace
  var isSearch = inputValue !== "";
  var action = isSearch ? "SearchItemLeased" : "paginationItemL";
  var queryParam = isSearch ? `&query=${inputValue}` : "";
  pagination(pageNumber, inputValue); // Update pagination

  $.ajax({
    url: `index1.php?action=${action}&limit=${limit}&sort=${sort}&direction=${direction}&prepa=${pageNumber}${queryParam}`, // URL du script PHP à appeler
    type: "GET",             // Méthode de la requête (GET, POST, etc.)
    dataType: "json",   
     // Type de données attendu en retour (json, text, html, etc.)
     success: function(data) {
      console.log('Data received:', data);
      if(data.data.length!=0)
      {
        var tableBody = document.getElementById("ItemContainer");
        tableBody.innerHTML = ""; // Clear existing rows
        
        data.data.forEach(el => {
            let createRow = document.createElement("tr");
            createRow.setAttribute('class',' px-4 py-3 text-sm  bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
            createRow.setAttribute('data-id', `${el.id}`);
            createRow.innerHTML = rowTable(el);
            tableBody.appendChild(createRow); // Append row to table body
        });  
      }
      else
      {
        createRow = document.createElement("tr")
        createRow.setAttribute('class',' px-4 py-3 text-sm  bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
        createRow.innerHTML = "No data available in table"
        document.getElementById("ItemContainer").append(createRow)
      }
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
  let lm = limit - 1 ;
  var endItem = Math.min(startItem + lm, totalItems);
  var paginationInfo = `AFFICHAGE ${startItem}-${endItem} SUR ${totalItems}`;
  document.getElementById("affichage").innerHTML = paginationInfo;
}

function updatePagination(totalPages) {
  var paginationHTML = '';
  document.getElementById("endPage").value = totalPages
  for (var i = 1; i <= totalPages; i++) {
      paginationHTML += `<li><button class="pagination px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple" data-id=${i}>${i}</button></li>`;
  }
  document.getElementById("pagination").innerHTML = paginationHTML;
}

function rowTable(item){
   let newItem = `
  
        <td class="px-4 py-3">${item.id}</td>
        <td class="px-4 py-3">${item.item_name}</td>
        <td class="px-4 py-3">${item.username}</td>
        <td class="px-4 py-3">${item.time_from}</td>
        <td class="px-4 py-3">${item.time_to}</td>
        <td class="px-4 py-3">${item.price_total}</td>
        <td class="px-4 py-3" >
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

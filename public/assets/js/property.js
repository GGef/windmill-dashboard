var limit = 5
var sort = "I.id";
var direction = "asc"

function GetItem(pageNumber){
    console.log(`Le Nombre a été cliqué !${pageNumber}`);
    var inputValue = document.getElementById("searchInput").value.trim(); 
    pagination( pageNumber, inputValue); // Update pagination
    // Check if there's a search query
    var isSearch = inputValue !== "";
    var action = isSearch ? "SearchItem" : "paginationNumber";
    
    var queryParam = isSearch ? `&query=${inputValue}` : "";
    $.ajax({
      url: `index1.php?action=${action}&limit=${limit}&prepa=${pageNumber}&sort=${sort}&direction=${direction}${queryParam}`, // URL du script PHP à appeler
      type: "GET",             // Méthode de la requête (GET, POST, etc.)
      dataType: "json",   
       // Type de données attendu en retour (json, text, html, etc.)
      success: function(data) {
          document.getElementById("ItemContainer").innerHTML = ""; // Clear previous items
          if(data.data.length!=0)
          {
              data.data.forEach(el=>{
              // var SecChildNode =  document.getElementById("Secondchildnode")
              let createRow = document.createElement("tr")
              //  createRow.setAttribute('class','flex justify-between  items-center px-4 py-3 text-sm')
              createRow.setAttribute('class','item-row px-4 py-3 text-sm  bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
              createRow.setAttribute('data-id',`${el.id}`)
              // createRow.innerHTML = rowTable(el)
              rowTable(el, createRow);
              var Elem  =  document.getElementById("ItemContainer")
              Elem.append(createRow)
              })
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
  function statusAvailable(id, callback) {
    $.ajax({
        url: `index1.php?action=statutActionItem&id=${id}`,
        type: "GET",
        dataType: "json",
        success: function(data) {
            callback(data.data); // Pass the data to the callback function
        },
        error: function() {
            // Handle error if needed
        }
    });
  }
  
  function rowTable(item, createRow){
    statusAvailable(item.id, function(status) {
    let newItem = `
   
         <td class="px-4 py-3">${item.id}</td>
         <td class="px-4 py-3">${item.item_name}</td>
         <td class="px-4 py-3" >${item.type_name}</td>
         <td class="px-4 py-3" >${item.name}</td>
         <td class="px-4 py-3" >${item.item_location}</td>
         <td class="px-4 py-3" >${item.description}</td>
         <td class="px-4 py-3" >${item.username}</td>
         <td class="px-4 py-3" >${item.price_per_unit}</td>
         <td class="px-4 py-3" >${item.unit_name}</td>
         <td class="px-4 py-3 available">${status}</td>      
         <td class="px-4 py-3">
            <div class='flex  items-center space-x-4 text-sm'>
              <div class='relative '>
                <button class='dropdownbtton'
                  type='button' onclick='toggleDropdown(this)' data-item-id='${item.id}'>
                  <svg class='dropdownbtton' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-more-vertical'>
                    <circle cx='12' cy='12' r='1'></circle>
                    <circle cx='12' cy='5' r='1'></circle>
                    <circle cx='12' cy='19' r='1'></circle>
                  </svg>
                </button>
                <div id='dropdownDelay-${item.id}' class='drop absolute z-20 right-0 w-56 space-y-2 hidden text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700'>
                  <ul class='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDelayButton'>
                    <li>
                      <a href='index1.php?action=editItem&id=${item.id}' class='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'>Modifier</a>
                    </li>
                    <li>
                      <a href='index1.php?action=reserveItem' class='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'>Réserver</a>
                    </li>
                    <li>  
                      <a onclick="return confirm('voulez vous vraiment supprimer ce utilisateur')" href="index1.php?action=destroyItem&id=${item.id}" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Supprimer</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </td>
        <td class="px-4 py-3">
          <button class='dropdownbtton'
            type='button' data-item-id='${item.id}'>
            <a href='index1.php?action=property&id=${item.id}'</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
          </button>
        </td>`
     //console.log(newItem);
    // return newItem;
    createRow.innerHTML = newItem;
    });
 }

// Event listener for clicks on the body
document.body.addEventListener('click', function(event) {
  var clickedElement = event.target;
  
  if (!clickedElement.classList.contains('dropdownbtton')) {
    var dropdowns = document.querySelectorAll('.drop');
    dropdowns.forEach(function (drop) {
      
    drop.classList.add('hidden');
  });
  } 
});
  //----------------Fonction 2-----------------------
  
function pagination(pageNumber, query) {
  $.ajax({
      url: `index1.php?action=lengthItem&query=${query}`,
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


document.addEventListener("DOMContentLoaded", function() {
  var bottonNext = document.getElementById("NextButton");
  var bottonPrevius = document.getElementById("PreviousButton");
  var page = (bottonNext.getAttribute("data-current-id") * 1) - 1;

  var searchInput = document.getElementById("searchInput");
  var page = 1;
  GetItem(page);


  bottonNext.addEventListener("click", function(e) {
    page = (bottonNext.getAttribute("data-current-id") * 1) + 1;
    if (page <= document.getElementById("endPage").value) {
      GetItem(page);
      bottonNext.setAttribute("data-current-id", `${page}`);
      bottonPrevius.setAttribute("data-current-id", `${page}`);
    }
  });

  bottonPrevius.addEventListener("click", function(e) {
    page = (bottonNext.getAttribute("data-current-id") * 1) - 1;
    if (page >= 1) {
      GetItem(page);
      bottonNext.setAttribute("data-current-id", `${page}`);
      bottonPrevius.setAttribute("data-current-id", `${page}`);
    }
  });

  searchInput.addEventListener("input", function() {
      GetItem(1); // Trigger item retrieval when input changes
  });

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
      "TYPE": "type_name",
      "EMPLACEMENT": "name",
      "EMPLACEMENT DE L'ARTICLE": "item_location",
      "DESCRIPTION": "description",
      "PROPRIÉTAIRE": "username",
      "PRIX": "price_per_unit",
      "UNITÉ": "unit_name"
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

 //---------------- Dropdown function: modify, reserve, and delete ----------------

// Function to toggle a dropdown and close others
function toggleDropdown(button) {
  var dropdown = button.nextElementSibling;
  closeDropdown(dropdown)
  dropdown.classList.toggle('hidden');
}
// Function to close all dropdowns except a specific one
function closeDropdown(dropdown)
{
  var dropdowns = document.querySelectorAll('.drop');
  dropdowns.forEach(function (drop) {
    if(dropdown.id != drop.id){
      drop.classList.add('hidden');
    }
    
  });
}

// Get the select element for the limit
var selectElement = document.getElementById("limit");

// Initialize the limit variable with the default value
var limit = selectElement.value;

var sort = "id";
var direction = "asc"

function typeClient() {
    var type = "";
    if (document.getElementById("locataire").classList.contains("active")) {
        console.log("Locat.");
        type = 3; // Locataire
        titre = "Liste des Locataires :";
    } else {
        console.log("Prop.");
        type = 2; // Propriétaire
        titre = "Liste des Propriétaires :";
    }
    return type;
}

function GetUser(pageNumber) {
  console.log(`Page number clicked: ${pageNumber}`);
  var type = typeClient(); // Get the type of client
  var inputValue = document.getElementById("searchInput").value.trim(); // Trim whitespace
  // Check if there's a search query
  var isSearch = inputValue !== "";
  var action = isSearch ? "SearchClient" : "paginationClient";
  
  var queryParam = isSearch ? `&query=${inputValue}` : "";
  console.log("we have  :  " + queryParam)

  pagination(type, pageNumber, inputValue); // Update pagination

  $.ajax({
      url: `index1.php?action=${action}&limit=${limit}&prepa=${pageNumber}&sort=${sort}&direction=${direction}&type=${parseInt(type)}${queryParam}`, // Include pageNumber in the AJAX URL
      type: "GET",
      dataType: "json",
      success: function(data) {
          console.log('Data received:', data);
          document.getElementById("ItemContainer").innerHTML = ""; // Clear previous items
          if(data.data.length!=0)
        {
            data.data.forEach(el=>{
            // var SecChildNode =  document.getElementById("Secondchildnode")
            let createRow = document.createElement("tr")
            //  createRow.setAttribute('class','flex justify-between  items-center px-4 py-3 text-sm')
            createRow.setAttribute('class',' px-4 py-3 text-sm  bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
            createRow.setAttribute('data-id',`${el.id}`)
            createRow.innerHTML = rowTable(el)
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
          $("#titre").html(isSearch ? "Résultats de la recherche :" : titre); // Update title if it's a search
      },
      error: function() {
          $("#resultat").html("Échec de la requête AJAX.");
      }
  });
}

function rowTable(item) {
    let newItem = `
        <td class="px-4 py-3">${item.id}</td>
        <td class="px-4 py-3">${item.username}</td>
        <td class="px-4 py-3">${item.name}</td>
        <td class="px-4 py-3">${item.phone}</td>
        <td class="px-4 py-3">${item.mobile}</td>
        <td class="px-4 py-3">${item.email}</td>
        <td class="px-4 py-3">${item.registration_time}</td>
        <td class="px-4 py-3 flex" >
            
                <a class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit" href="index1.php?action=editItem&id=${item.id}">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                    </svg>
                </a>
                <a class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete" onclick="return confirm('voulez vous vraiment supprimer ce utilisateur')" href="index1.php?action=destroyItem&id=${item.id}">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0v-6zm6 0a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </a>
        </td>
    `;
    return newItem;
}

function pagination(type, pageNumber, query) {
    $.ajax({
        url: `index1.php?action=lengthUser&type=${type}&query=${query}`,
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
    var proprietaire = document.getElementById("proprietaire");
    var locataire = document.getElementById("locataire");
    var bottonNext = document.getElementById("NextButton");
    var bottonPrevius = document.getElementById("PreviousButton");
    var page = (bottonNext.getAttribute("data-current-id") * 1) - 1;

    var searchInput = document.getElementById("searchInput");
    var page = 1;
    GetUser(page);

    proprietaire.addEventListener("click", function() {
        proprietaire.classList.add("active");
        locataire.classList.remove("active");
        GetUser(1);
    });

    locataire.addEventListener("click", function() {
        locataire.classList.add("active");
        proprietaire.classList.remove("active");
        GetUser(1);
    });

    bottonNext.addEventListener("click", function(e) {
        page = (bottonNext.getAttribute("data-current-id") * 1) + 1;
        if (page <= document.getElementById("endPage").value) {
            GetUser(page);
            bottonNext.setAttribute("data-current-id", `${page}`);
            bottonPrevius.setAttribute("data-current-id", `${page}`);
        }
    });

    bottonPrevius.addEventListener("click", function(e) {
        page = (bottonNext.getAttribute("data-current-id") * 1) - 1;
        if (page >= 1) {
            GetUser(page);
            bottonNext.setAttribute("data-current-id", `${page}`);
            bottonPrevius.setAttribute("data-current-id", `${page}`);
        }
    });

    searchInput.addEventListener("input", function() {
        GetUser(1); // Trigger item retrieval when input changes
    });

    document.addEventListener("click", function(event) {
        if (event.target.matches(".pagination")) {
            var pageNumber = parseInt(event.target.getAttribute("data-id"));
            console.log(`Page number clicked: ${pageNumber}`);
            if (pageNumber < document.getElementById("endPage").value && pageNumber >=1) {
              GetUser(pageNumber);
              bottonNext.setAttribute("data-current-id", `${pageNumber}`);
              bottonPrevius.setAttribute("data-current-id", `${pageNumber}`);
          }
        }
    });

    //--------------------sorting && limit---------------------
    var tableHeaders = document.querySelectorAll("th.sorting, th.sorting-asc, th.sorting-desc");
    var columnSortMapping = {
        "Id": "U.id",
        "NOM D'UTILISATEUR": "U.username",
        "EMPLACEMENT": "L.name",
        "TÉLÉPHONE": "U.phone",
        "PORTABLE": "U.mobile",
        "EMAIL": "U.email",
        "HEURE D'INSCRIPTION": "U.registration_time"
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
            GetUser(page);

        });
    });
 
     // Add event listener to the select element
     selectElement.addEventListener("change", function() {
         // Update the limit variable with the selected value
         limit = this.value;
         GetUser(page);
     });
});

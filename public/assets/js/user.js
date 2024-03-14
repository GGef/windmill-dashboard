  function typeClient(){
    var type = ""; // Cette variable stockera le type sélectionné
    if (document.getElementById("locataire").classList.contains("active")) {
        console.log("Locat.");
        type = 3;
        titre = "Liste des Locataire :"

    } else {
        console.log("Prop.");
        type = 2;
        titre = "Liste des propriétaires :"
    }
    return type
  }

  function GetItem(pageNumber){
    console.log(`Le Nombre a été cliqué !${pageNumber}`);
    var url;
    var type = typeClient()
    pagination(type,pageNumber);
    $.ajax({
        url: `index1.php?action=paginationClient&limit=5&prepa=${pageNumber}&type=${parseInt(type)}`, // Convert type to integer
        type: "GET",             // Méthode de la requête (GET, POST, etc.)
        dataType: "json",   
        success: function(data) {

            console.log('Data received:', data);
            document.getElementById("ItemContainer").innerHTML= " <div id=Childnode  class='table-row-group'  data-id='${item.id}'></div>"
            data.data.forEach(el=>{
                let createRow = document.createElement("div")
                createRow.setAttribute('class','table-row flex bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
                createRow.setAttribute('data-id',`${el.id}`)
                createRow.innerHTML = rowTable(el)
                console.log(el);
                var Elem  =  document.getElementById("Childnode")
                Elem.append(createRow)
            })
            $("#resultat").html("Réponse du serveur : " + data.message);
            $("#titre").html(titre);
        },
        error: function() {
            $("#resultat").html("Échec de la requête AJAX.");
        }
    });
}


  function searchItems(query) {
    if (query !== "") {
      var type = typeClient()
      $.ajax({
        url: `index1.php?action=SearchClient&query=${query}&type=${type}`,
        type: "GET",
        dataType: "json",
        success: function(data) {
          console.log('Data received:', data);
            document.getElementById("ItemContainer").innerHTML= " <div id=Childnode  class='table-row-group'  data-id='${item.id}'></div>"
            data.data.forEach(el=>{
                let createRow = document.createElement("div")
                createRow.setAttribute('class','table-row flex bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
                createRow.setAttribute('data-id',`${el.id}`)
                createRow.innerHTML = rowTable(el)
                console.log(el);
                var Elem  =  document.getElementById("Childnode")
                Elem.append(createRow)
            })
            $("#resultat").html("Réponse du serveur : " + data.message);
            $("#titre").html(titre);
        },
        error: function() {
            $("#resultat").html("Échec de la requête AJAX.");
        }
      });
    }   
  else {
    // If search input is empty, display all items (similar to initial page load)
    GetItem(1);
  }
  }
  
  
  function rowTable(item){
     let newItem = `
    
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;">${item.id}</div>
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;">${item.username}</div>
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;" >${item.name}</div>
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;" >${item.phone}</div>
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;" >${item.mobile}</div>
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;" >${item.email}</div>
          <div class="table-cell px-4 py-3 p-2 text-sm" style="width: 16.6667%;" >${item.registration_time}</div>           
          <div class="table-cell px-4 py-3 p-2 text-sm" >
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
                        
                    </div>
                  </div>
                </div>`
      //console.log(newItem);
  
     return newItem;
   
  }
  

  function pagination(type, pageNumber) {
    $.ajax({
        url: `index1.php?action=lengthUser&type=${type}`,
        type: "GET",
        dataType: "json",
        success: function(data) {
            var totalItems = data.data[0]['COUNT(*)'];
            var totalPages = Math.ceil(totalItems / 5);
            updatePagination(totalPages);
            updatePaginationInfo(pageNumber, totalItems);
            $("#resultat").html("Réponse du serveur : " + data.message);
        },
        error: function() {
            $("#resultat").html("Échec de la requête AJAX.");
        }
    });
}

// Fonction pour mettre à jour les informations de pagination affichées dans l'interface utilisateur
function updatePaginationInfo(pageNumber, totalItems) {
    var startItem = (pageNumber - 1) * 5 + 1;
    var endItem = Math.min(startItem + 4, totalItems);
    var paginationInfo = `AFFICHAGE ${startItem}-${endItem} SUR ${totalItems}`;
    document.getElementById("affichage").innerHTML = paginationInfo;
}

// Fonction pour mettre à jour les éléments de pagination dans l'interface utilisateur
function updatePagination(totalPages) {
    var paginationHTML = '';
    for (var i = 1; i <= totalPages; i++) {
        paginationHTML += `<li><button class="pagination px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple" data-id=${i}>${i}</button></li>`;
    }
    document.getElementById("pagination").innerHTML = paginationHTML;
}

  //---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  //Obtenez une référence vers le bouton
  var proprietaire = document.getElementById("proprietaire");
  var locataire = document.getElementById("locataire");
  var bottonNext = document.getElementById("NextButton");
  var bottonPrevius = document.getElementById("PreviousButton");
  // var searchInput = document.getElementById("searchInput");
  var page = 1;
  GetItem(page)

  // Ajoutez un gestionnaire d'événements au bouton propriétaire
  proprietaire.addEventListener("click", function() {
    proprietaire.classList.add("active"); // Ajoutez la classe active au bouton propriétaire
    locataire.classList.remove("active"); // Supprimez la classe active du bouton locataire si elle est présente
    GetItem(1)
    // Effectuez d'autres actions si nécessaire
  });

  // Ajoutez un gestionnaire d'événements au bouton locataire
  locataire.addEventListener("click", function() {
      locataire.classList.add("active"); // Ajoutez la classe active au bouton locataire
      proprietaire.classList.remove("active"); // Supprimez la classe active du bouton propriétaire si elle est présente
      GetItem(1)
      // Effectuez d'autres actions si nécessaire
  });
  //Utilisez addEventListener pour détecter le clic sur le bouton
  bottonNext.addEventListener("click", (e) => {
    var page = (bottonNext.getAttribute("data-current-id")*1) +1
    if((bottonNext.getAttribute("data-current-id")*1)+1 <= document.getElementById("endPage").value){
      console.log(page)
      GetItem(page)
      bottonNext.setAttribute("data-current-id",`${page}`)
      bottonPrevius.setAttribute("data-current-id",`${page}`)
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
      console.log('search')
      console.log(this.value.trim())
      searchItems(this.value.trim());
      console.log("searched")
    });

    document.addEventListener("click", function(event) {
      if (event.target.matches(".pagination")) {
          var pageNumber = parseInt(event.target.getAttribute("data-id"));
          console.log(`Page number clicked: ${pageNumber}`);
          GetItem(pageNumber);
      }
  });
});
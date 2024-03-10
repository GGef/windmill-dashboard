
//---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  //Obtenez une référence vers le bouton
  var bottonNext = document.getElementById("NextButton");
  var bottonPrevius = document.getElementById("PreviousButton");
  var page = 1;
  GetItem(page)
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
});

//----------------Fonction 2-----------------------
document.addEventListener("DOMContentLoaded", function() {
  // Obtenez une référence vers le bouton
  // var bouton = document.getElementById("paginationNumber");
  var btns = document.querySelectorAll(".pagination")
  //console.log("======== ",bouton);
  // Utilisez addEventListener pour détecter le clic sur le bouton
  //console.log("Le Nombre a été cliqué !");
  btns.forEach(el=>{
  el.addEventListener("click",(e)=>{
    var bottonNext = document.getElementById("NextButton");
    var bottonPrevius = document.getElementById("PreviousButton");
    GetItem(e.target.getAttribute("data-id"));
    bottonNext.setAttribute("data-current-id",`${e.target.getAttribute("data-id")}`)
    bottonPrevius.setAttribute("data-current-id",`${e.target.getAttribute("data-id")}`)
    
  })
  })
});

function GetItem(pageNumber){
  console.log(`Le Nombre a été cliqué !${pageNumber}`);
  $.ajax({
    url: `index1.php?action=paginationItemL&limit=5&prepa=${pageNumber}`, // URL du script PHP à appeler
    type: "GET",             // Méthode de la requête (GET, POST, etc.)
    dataType: "json",   
     // Type de données attendu en retour (json, text, html, etc.)
    success: function(data) {

        console.log('Data received:', data);
        // Cette fonction sera appelée en cas de succès de la requête
        // 'data' contient la réponse du serveur
        document.getElementById("ItemContainer").innerHTML= " <div id=Childnode  class='bg-white dark:bg-gray-900'  data-id='${item.id}'></div>"
        // document.getElementById("Childnode").innerHTML="  <div id=Secondchildnode class='flex justify-between items-center px-4 py-3 text-sm'></div> "
        // <div class="flex justify-between items-center px-4 py-3 text-sm"></div>
        data.data.forEach(el=>{
            // var SecChildNode =  document.getElementById("Secondchildnode")
            let createRow = document.createElement("div")
            createRow.setAttribute('class','flex justify-between  items-center px-4 py-3 text-sm  bg-gray-50 dark:bg-gray-900 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400 h-12')
            createRow.setAttribute('data-id',`${el.id}`)
            createRow.innerHTML = rowTable(el)
            console.log(el);
            var Elem  =  document.getElementById("Childnode")
            Elem.append(createRow)
        })
        $("#resultat").html("Réponse du serveur : " + data.message);
    },
    error: function() {
      // Cette fonction sera appelée en cas d'échec de la requête
      $("#resultat").html("Échec de la requête AJAX.");
    }
  });

}

function rowTable(item){
   let newItem = `
  
        <div class='table-cell px-4 py-3 p-2 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase  border-gray-500 dark:border-gray-700 truncate'>${item.id}</div>
        <div class='table-cell px-4 py-3 p-2 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase  border-gray-500 dark:border-gray-700 truncate'>${item.item_name}</div>
        <div class='table-cell px-4 py-3 p-2 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase  border-gray-500 dark:border-gray-700 truncate' >${item.username}</div>
        <div class='table-cell px-4 py-3 p-2 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase  border-gray-500 dark:border-gray-700 truncate' >${item.time_from}</div>
        <div class='table-cell px-4 py-3 p-2 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase  border-gray-500 dark:border-gray-700 truncate' >${item.time_to}</div>
        <div class='table-cell px-4 py-3 p-2 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase  border-gray-500 dark:border-gray-700 truncate' >${item.price_total}</div>
         
        <div class="flex items-center space-x-4 text-sm">
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

   <div class=' sam-details__box' style='display:none;' >
      <div class='sam-details__item-box'>1</div>
      <div class='sam-details__item-box fff'>
        <div class='sam-details__item'>2</div>          
        <div class='sam-details__item'>3</div>
      </div>
      <div class='sam-details__item-box'>4</div>
    </div>`
    //console.log(newItem);

   return newItem;
 
}

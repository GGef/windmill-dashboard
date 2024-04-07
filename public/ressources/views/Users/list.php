<?php
namespace ressources\views\Users;
use \app\models\User;
use \app\controllers\UserController;

require "vendor/autoload.php";

$title = "Liste des utilisateurs";
ob_start();
include "listHeader.php" ;

// Define the total number of items
$totalItems = UserController::lengthAction(' role_id =2');

// Define the number of items to display per page
$itemsPerPage = 3;

// Calculate the total number of pages
$totalPages = ceil($totalItems / $itemsPerPage);

// Get the current page number from the query parameter
$current_page = isset($_GET['page']) && is_numeric($_GET['page']) ? intval($_GET['page']) : 1;

// Ensure the current page number is within the valid range
$current_page = max(1, min($current_page, $totalPages));

// Calculate the offset to fetch the items for the current page
$offset = ($current_page - 1) * $itemsPerPage;

// Display the pagination information
$startItem = ($current_page - 1) * $itemsPerPage + 1;
$endItem = 8;
?>
<style>
  .active {
    background-color: #7C3AED;
    color : #FFFFFF;
  }
</style>
<input id="pageCount" type="hidden" name="" value="<?= $totalItems ?>">
<input id="endPage" type="hidden" name="" value="<?= $endItem ?>">
<h4 id="titre" class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
</h4>
  <div class="flex flex-col justify-between flex-wrap mb-4 space-y-4 md:flex-row md:items-end md:space-x-4">
    
    
    <!-- add button -->
    <a href="index1.php?action=create" > <button class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
      Ajouter </button>
    </a>
  </div>  
  <div class="w-full overflow-hidden rounded-lg shadow-xs">
    <div  class=" grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800" >
      <div class="flex items-center col-span-6" >
        <label>Afficher <select name="example_length" id="limit" aria-controls="example" class="bg-transparent">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select> entrées
        </label>
      </div>
      <!-- Search input -->
      <!-- <form class="relative w-full max-w-xl mr-6 focus-within:text-purple-500" action="index1.php?action=search<?= $actionValue?>" method="post"> -->
      <div class="flex items-center col-span-3">
        <div class="relative w-full max-w-xl mr-6 focus-within:text-purple-500" >
          <div class="absolute inset-y-0 flex items-center pl-2">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            class="search w-full pl-8 pr-2 p-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
            type="text" name="search" id="searchInput"
            placeholder="Recherche selon..."
            aria-label="Search"
          />
        </div>
      </div>
    </div>
      <!-- Table container -->
      <div class="w-full whitespace-no-wrap container mx-auto overflow-y-auto">
        <table id="example" style="width:100%; padding-top: 1em;  padding-bottom: 1em;">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr class="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700">
              <!-- columns -->
              <th class="sorting-asc px-4 py-3">Id</th>
              <th class="sorting px-4 py-3">
                NOM D'UTILISATEUR
              </th>
              <!-- <th class="sorting px-4 py-3">Mot de passe</th> -->
              <th class="sorting px-4 py-3">EMPLACEMENT</th>
              <th class="sorting px-4 py-3">TÉLÉPHONE</th>
              <th class="sorting px-4 py-3">PORTABLE</th>
              <th class="sorting px-4 py-3">EMAIL</th>
              <th class="sorting px-4 py-3">HEURE D'INSCRIPTION</th>
              <th class="px-4 py-3" >Action</th>                  
            </tr>
          </thead>
          <tbody  id="ItemContainer" class="bg-gray-50 dark:bg-gray-900">
         
          </tbody>                     
        </table>
      </div>
    <div  class=" grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800" >
      <span id="affichage" class="flex items-center col-span-3"></span> 
      <span class="col-span-2"></span>
      
      <!-- Pagination-->
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
         <nav aria-label="Table navigation">
            <ul class="inline-flex items-center">
              <li><button id="PreviousButton" class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous">
              <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button></li>
              <div  id="pagination" class="inline-flex "></div>
              <li><button id="NextButton" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
              <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button></li>
            </ul>
          </nav>
      </span>  
    </div>
  </div>
</div>

<script>
  <?php
  include_once 'assets/js/user.js';
  ?>
</script>

<?php
$content = ob_get_clean();
include_once 'ressources/views/layout.php';
?>


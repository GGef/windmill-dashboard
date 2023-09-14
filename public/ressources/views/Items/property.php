<?php
namespace ressources\views\Items;
use \app\models\Item;
use \app\controllers\ItemController;

$title = "Ajouter propriétés";
$typeOption = ItemController::SelectOptionItem('item_type','type_name');
$locationOption = ItemController::SelectOptionItem('location','name');
$proprietaireOption = ItemController::SelectOptionItem('user_account','username',' role_id = 2');
$unitOption = ItemController::SelectOptionItem('unit','unit_name');



ob_start();
?>

<div class="bg-white">
    <nav class="flex flex-col sm:flex-row">
        <button id="b1" class="text-gray-600 tab-btn py-4 px-6 block hover:text-blue-500 focus:outline-none">
        Ajouter une nouvelle propriété
        </button>
        <button id="b2" class="text-gray-600 tab-btn py-4 px-6 block hover:text-blue-500 focus:outline-none">
        Modifier une propriété
        </button>
        <button id="b3" class="text-gray-600 tab-btn py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Reservation
        </button>
        <button id="b4" class="text-gray-600 tab-btn py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Historique
        </button>
        <button id="b5" class="text-gray-600 tab-btn py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Informations
        </button>
        <button id="b6" class="text-gray-600 tab-btn py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Messages
        </button>
    </nav>
</div>
        <div id="view-tab"></div>
        
        
        <script type="module" src=".\assets\js\proprety.js"></script>

<?php
$content = ob_get_clean();
include_once 'ressources/views/layout.php';
?>

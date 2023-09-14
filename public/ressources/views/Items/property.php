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
        <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
        Ajouter une nouvelle propriété
        </button>

        <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Tab 2
        </button><button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Tab 3
        </button><button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
            Tab 4
        </button>
    </nav>
</div>
<div id="view-tab"></div>

<script type="module" src=".\assets\js\proprety.js"></script>



<?php
$content = ob_get_clean();
include_once 'ressources/views/layout.php';
?>

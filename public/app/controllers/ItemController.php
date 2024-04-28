<?php
namespace app\controllers ;
// Include the necessary files
require "vendor/autoload.php";


// Use the User class from the app\models namespace
use \app\models\Item;
use \app\controllers\SessionController;



class ItemController  extends BaseController
{
    private static $productsPerPage = 3;

    public static function getModelItem()
    {
        // Check if the model instance is null
        if (is_null(static::$model)) {
            // Create a new instance of the Item model
            static::$model = new Item();
        }
        return static::$model;
    }

    public static function indexActionItem()
    {
        var_dump(SessionController::isUserAuthenticated('Administrateur')); // Should return false
        var_dump(SessionController::isUserAuthenticated('Proprietaire'));
        if (SessionController::isUserAuthenticated('Proprietaire') || SessionController::isUserAuthenticated('Administrateur') ||SessionController::isUserAuthenticated('SuperAdmin') || SessionController::isUserAuthenticated('Locataire')) {        
        // Render the view "Items/propertyList" 
            static::requir("Items/propertyList");
        }
        else{
            static::redirect('login');

        }
        // static::requir("Items/propertyList");


    }

    public static function lengthActionItem()
    {
        // Retrieve the length of the "item" table
        return static::getModelItem()->length('item');
    }

    public static function CountNewItems()
    {
        // Retrieve the length of the "item" table
        return static::getModelItem()->countNewIU('item' , ' date_creation ');
    }

    public static function retrieveSettresItem()
    {
        $Item = static::getModelItem();

        // Set the properties of the user object using the values from the form inputs
        $Item->setItemName($_POST['name']);
        $Item->setItemTypeId($_POST['typeId']);
        $Item->setItemLocationId($_POST['locationId']);
        $Item->setItemLocation($_POST['itemLocation']);
        $Item->setItemDescription($_POST['description']);
        $Item->setOwnerId($_POST['ownerId']);
        $Item->setPricePerUnit($_POST['price']);
        $Item->setItemUnitId($_POST['unitId']);
        $Item->setItemTitle($_POST['titrePropriete']);


        return $Item ;
    }

    public static function createActionItem()
    {
        static::requir("Items/createItem");
        
    }
    
    public static function reserveActionItem()
    {
        static::requir("Items/reserveItem");
        
    }

    public static function property()
    {
        static::requir("Items/property");
        
    }

    public static function storeActionItem()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $ItemCreated = static::retrieveSettresItem();
            $ItemCreated->createItem();
            if($ItemCreated >0){
                static::redirect('propertyList');
            }
            else{
                echo "Erreur";
            }

        }

    }

    public static function editActionItem()
    {
        $id=$_GET['id'];
        $item = self::getModelItem()::viewItem($id);
        static::requir('Items/editItem',$item);

    }

    public static function SelectOptionItem($referencedTable , $column ,  $cond = NULL )
    {
        
        return static::getModelItem()::SelectInputs($referencedTable, $column ,  $cond ) ;
    }

    public static function updateActionItem()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $userUpdated = static::retrieveSettresItem();
            $userUpdated->updateItem($_POST['id']);
            if($userUpdated >0 ){
                static::redirect('propertyList');
            }
            else{
                echo "Erreur";
            }

        }

    }

    public static function destroyActionItem()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {

            $userdeleted = static::getModelItem();
            $userdeleted->destroy('item',$_GET['id']);
            if($userdeleted >0 ){
                static::redirect('propertyList');
            }
            else{
                echo "Erreur";
            }

        }

    }

    public static function statutActionItem()
    {
        $id = $_GET['id'];
        $statut = static::getModelItem()->statut($id);
        $etat = '';
        // var_dump($statut);
        if ($statut) {
            // Assuming $statut contains the result from the database query
            // If you have a specific condition to check for "app", modify it accordingly
            $etat = '<span class="px-2 py-1 font-semibold leading-tight text-red bg-red-100 rounded-full dark:bg-red-700 dark:text-red-200">occupée<span>';
        }
        else
        {
            $etat = '<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">Disponible</span>';
        }
    
        header('Content-type: application/json');
       echo json_encode(array(
        'data' => $etat 
        ));
       exit;
    }

    public static function ItemType()
    {
        $id = $_GET['id'];
        $statut = static::getModelItem()->Type($id);
        if ($statut) {
            $etat = true;
        }
        else
        {
            $etat =false;
        }
    
        header('Content-type: application/json');
       echo json_encode(array(
        'data' => $etat 
        ));
       exit;
    }
    

    public static function paginationNumber()
{
    // Retrieve pagination parameters from $_GET
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5; // Default limit is set to 5 if not provided
    $numberOfPage = isset($_GET['prepa']) ? intval($_GET['prepa']) : 1; // Default page number is set to 1 if not provided
    $offset = $limit * ($numberOfPage - 1);
    $query = isset($_GET['query']) ? $_GET['query'] : null;
    $sort = isset($_GET['sort']) ? $_GET['sort'] : ''; // Set default sort
    $direction = isset($_GET['direction']) ? $_GET['direction'] : 'asc'; // Set default direction

    // Check user authentication and role
    $authenticatedUserRole = SessionController::isUserAuthenticated();

    switch ($authenticatedUserRole) {
        case 'SuperAdmin':
            $result = static::getModelItem()::getDataOffset($limit, $offset, $query, $sort, $direction);
            break;
        case 'Proprietaire':
            $userId = $_SESSION['id'] ;
            // $result = static::getModelItem()::getDataOffsetProp($limit, $offset, $query, $sort, $direction, $userId);
            $result = static::getModelItem()::getDataOffsetProp($limit, $offset, $query, $sort, $direction, $userId);
            break;
        case 'Locataire':
            $result = static::getModelItem()::getDataOffsetRent($limit, $offset, $query, $sort, $direction);
            break;
        default:
            // Handle unauthorized access
            http_response_code(403);
            exit("Unauthorized access.");
    }

    // Send JSON response
    header('Content-type: application/json');
    echo json_encode(array(
        'data' => $result
    ));
    exit;
}

    


    public static function lengthProperty() {
        // Extract necessary parameters from $_GET
        // $query = $_GET['query'] ?? null;
        $query = isset($_GET['query']) ? $_GET['query'] : null;


        // Call your actual model function to get the length of items
        $result = static::getModelItem()::lengthItem($query);

        // Return JSON response
        header('Content-type: application/json');
        echo json_encode(array('data' => $result));
        exit;
    }




}



?>
 
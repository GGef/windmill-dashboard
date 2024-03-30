<?php
namespace app\controllers ;
// Include the necessary files
require "vendor/autoload.php";


// Use the User class from the app\models namespace
use \app\models\Item;


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
    
    public static function makeItemsProductPager()
    {
        // Get the total number of pages
        $totalPages = static::lengthActionItem();
    
        // Check the value of the 'page' parameter in the URL
        if (!isset($_GET['page']) || intval($_GET['page']) == 0 || intval($_GET['page']) == 1 || intval($_GET['page']) < 0) {
            // If 'page' parameter is not set or is invalid, set the page number to 1
            $pageNumber = 1;
            $leftLimit = 0;
            $rightLimit = static::$productsPerPage; // Set the limit based on the number of products per page
        } elseif (intval($_GET['page']) > $totalPages || intval($_GET['page']) == $totalPages) {
            // If 'page' parameter is greater than the total number of pages, set the page number to the last page
            $pageNumber = $totalPages;
            $leftLimit = static::$productsPerPage * ($pageNumber - 1);
            $rightLimit = $leftLimit + static::$productsPerPage; // Variable $allProducts is undefined, you might need to define it
        } else {
            // If 'page' parameter is valid, set the page number based on the value in the URL
            $pageNumber = intval($_GET['page']);
            $leftLimit = static::$productsPerPage * ($pageNumber - 1);
            $rightLimit = static::$productsPerPage;
        }
        
        // Call the 'getLimitProducts()' method of the model to fetch the products within the specified limits
        return static::getModelItem()->latestItem($leftLimit, $rightLimit);
    }

    public static function indexActionItem()
    {
        // Retrieve the search input from the POST request
        $searchType = isset($_POST['search_type']) ? $_POST['search_type'] : null;
        $searchValue = isset($_POST['search']) ? $_POST['search'] : null;
        
        // Retrieve the request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if ($searchValue !== "" && $searchType !== "" && $requestMethod === 'POST') {
            // Search for items based on the provided search input
            $items = static::getModelItem()->findItem($searchType, $searchValue);
           
        } else {
            // Retrieve the latest items
            $items = static::makeItemsProductPager();
        }
        if(is_null($items))
        {
            $items = static::makeItemsProductPager();
        }

        // Render the view "Items/propertyList" and pass the items as data
        static::requir("Items/propertyList", $items);
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
    

    public static function paginationNumber()
    {
        // Retrieve pagination parameters from $_GET
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 5; // Default limit is set to 5 if not provided
        $numberOfPage = $_GET['prepa']; 
        $offset = $limit * ($numberOfPage - 1);
        // $query = isset($_GET['query']) ? $_GET['query'] : "" ; 
        $query = isset($_GET['query']) ? $_GET['query'] : null;
        $sort = $_GET['sort']; 
        $direction =  $_GET['direction']; 
    
        // Call the model method to fetch paginated data
        $result = static::getModelItem()::getDataOffset($limit, $offset, $query, $sort, $direction);
    
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


    public static function SearchItem()
    {
        $query = $_GET['query'];
        // var_dump($query); // For debugging

        $result = static::getModelItem()::search($query);

        header('Content-type: application/json');
        echo json_encode(array(
            'data' => $result 
        ));
        exit;
    }

    public static function sendData($id)
    {
        $item = static::getModelItem() ;
        $itemData = $item::fetch_data($id);
        $itemLatestData = $item::fetch_latest_data($id);
    
        if ($itemData !== null)
        {
            // Prepare the data to be sent back in JSON format
            $responseData = array(
                'titre' => $itemData[0]['item_name'], 
                'desc' => $itemData[0]['description'], 
                'price' => $itemData[0]['price_per_unit'],   
            );

            if($itemLatestData !== null)
            {
                $responseData += array(
                    'from' => $itemLatestData['time_from'], 
                    'to' => $itemLatestData['time_to'], 
                    'lastprice' => $itemLatestData['price_total'],   
                );
            }

            $status = $item->statut($id);
            $responseData += array(
                'statut' => $status ? 'occupé' : 'disponible',
            );

            header('Content-Type: application/json');
    
            // Output the JSON data
            echo json_encode($responseData);
        }
        
        return null; // Return null if user data is not found or there's an error
    }

}



?>
 
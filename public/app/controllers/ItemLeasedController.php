<?php
namespace app\controllers ;
// Include the necessary files
require "vendor/autoload.php";


// Use the User class from the app\models namespace
use \app\models\ItemLeased;


class ItemLeasedController  extends BaseController
{
    private static $productsPerPage = 3;

    public static function getModelItemLeased()
    {
        // Check if the model instance is null
        if (is_null(static::$model)) {
            // Create a new instance of the Item model
            static::$model = new ItemLeased();
        }
        return static::$model;
    }

    public static function indexActionItemLeased()
    {
        if (SessionController::isUserAuthenticated('Proprietaire') ) {     
        static::requir("ItemLeased/itemLeasedList");

            }
            else{
                static::redirect('login');
    
            }
    }
    
    public static function lengthActionItemLeased()
    {
        // Retrieve the length of the "item" table
        return static::getModelItemLeased()->reserved();
    }

    public static function CountNewItemLeased()
    {
        // Retrieve the length of the "item" table
        return static::getModelItemLeased()->countNewIU('item_leased' , ' time_from ');
    }


    public static function paginationNumber()
    {
        $limit = $_GET['limit'] ;
        $numberOfPage = $_GET['prepa'] ;
        $query = $_GET['query'] ?? null;
        $offset = $limit * ($numberOfPage - 1);
        $sort = $_GET['sort'] ;
        $direction = $_GET['direction'] ;
       $result = static::getModelItemLeased()::getDataOffset($limit, $offset, $query, $sort, $direction);
    //    var_dump($result);
       header('Content-type: application/json');
       echo json_encode(array(
        'data' => $result 
        ));
       exit;
    }

    public static function SearchItemLeased()
    {
        $query = isset($_GET['query']) && $_GET['query'] !== '' ? $_GET['query'] : null;
        $page = $_GET['prepa'] ?? 1;
        $limit = 5;
        $offset = ($page - 1) * $limit;

        $result = static::getModelItemLeased()::getDataOffset($limit, $offset, $query);

        header('Content-type: application/json');
        echo json_encode(array(
            'data' => $result 
        ));
        exit;
    }

    // Function to get the length of users
    public static function lengthItem() {
        // Extract necessary parameters from $_GET
        $query = $_GET['query'] ?? null;

        // Call your actual model function to get the length of users
        $result = static::getModelItemLeased()::lengthItem($query);

        // Return JSON response
        header('Content-type: application/json');
        echo json_encode(array('data' => $result));
        exit;
    }
}
<?php
namespace app\controllers ;
// Include the necessary files
require "vendor/autoload.php";


// Use the User class from the app\models namespace
use \app\models\ItemLeased;

class DashController extends BaseController
{
    public static function getModelItemLeased()
    {
        // Check if the model instance is null
        if (is_null(static::$model)) {
            // Create a new instance of the Item model
            static::$model = new ItemLeased();
        }
        return static::$model;
    }

    public static function dashFile($file)
    {
        session_start();

        $itemModel = static::getModelItemLeased();
        echo  $_SESSION['role'];
        echo  $_SESSION['email'];
        echo  $_SESSION['id'];

        if (SessionController::isUserAuthenticated('SuperAdmin')) {  
        $itemLeased = $itemModel->latestItemLeased();
        }
        elseif(SessionController::isUserAuthenticated('Proprietaire') || SessionController::isUserAuthenticated('Administrateur'))
        {
            $itemLeased = $itemModel->latestItemLeased($_SESSION['id']);
        }
        elseif(SessionController::isUserAuthenticated('Locataire'))
        {
            $itemLeased = $itemModel->latestItemLeasedRenter($_SESSION['id']);
        }
        else{
            static::redirect('login');
            exit();
        }
        static::requir($file, $itemLeased);
        

    }

  
}

?>


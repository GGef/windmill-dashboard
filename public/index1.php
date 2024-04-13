<?php
  require "vendor/autoload.php";

   use \app\controllers\UserController;
   use \app\controllers\BaseController;
   use \app\controllers\ItemController;
   use \app\controllers\ItemLeasedController;
   use \app\controllers\DashController;
   use \app\controllers\CalendarController;

    // Création d'un routeur.
    if (isset($_GET['action'])) 
    {
        $action = $_GET['action'];
        switch ($action) {
            case "dash":
                // echo 'hello' ;
             DashController::dashFile('dashboard');
            break;
            case 'create':
                UserController::createAction();
            break;
            case 'list' :
                UserController::indexAction();
            break;
            case 'paginationClient':
                case 'SearchClient' :
                UserController::paginationNumber();
            break;
            case 'lengthUser':
                UserController::lengthUser();
            break;
            case 'store':
                UserController::storeAction();
            break;
            case 'destroy':
                UserController::destroyAction();
            break;
            case 'edit':
                UserController::editAction();
            break;
            case 'update':
                UserController::updateAction();
            break;
            case 'propertyList':
                ItemController::indexActionItem();
            break;
            case 'createItem':
                ItemController::createActionItem();
            break;
            case 'storeItem':
                ItemController::storeActionItem();
            break;
            case 'editItem':
                ItemController::editActionItem();
            break;
            
            case 'property':
                ItemController::property();
            break;
            case 'paginationNumber' :
                ItemController::paginationNumber();
            break;
            case 'SearchItem':
                ItemController::paginationNumber();
            break;
            case 'lengthItem' :
                ItemController::lengthProperty();
            break;
            
            case 'updateItem':
                ItemController::updateActionItem();
            break;
            case 'destroyItem':
                ItemController::destroyActionItem();
            break;
            case 'reserveItem':
                ItemController::reserveActionItem();
            break;
            case 'itemLeasedList':
                ItemLeasedController::indexActionItemLeased();
            break;
            case 'SearchItemLeased' :
                ItemLeasedController::paginationNumber();
            break;
            case 'calendar' :
                CalendarController::calendarFile();
            break;
            case 'statutActionItem' :
                ItemController::statutActionItem();
            break;
            case 'ItemType' :
                ItemController::ItemType();
            break;
            case "ItemLeasedDetails":
                // echo 'hello' ;
             DashController::dashFile('ItemLeased/itemLeasedDetails');
            break;
            case 'paginationItemL' :
                ItemLeasedController::paginationNumber();
            break;
            case 'lengthItemL':
                ItemLeasedController::lengthItem();
            break;
            default :
            require 'ressources/views/404.php';
            break;
            }
    }


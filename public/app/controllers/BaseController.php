<?php
namespace public\app\controllers;


class BaseController
{
    protected static $model ;
  

    public static function view($view,$data = null)
    {
        require "../../ressources/views/".$view.".php";
    }

    public static function redirect($route)
    {
        header("location: index1.php?action=$route");
    }
}

?>
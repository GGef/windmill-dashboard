<?php
namespace app\controllers ;



class BaseController
{
    protected static $model ;
 

    public static function requir($view , $data = NULL)
    {
        require "public/ressources/views/".$view.".php";
    }

    public static function redirect($route)
    {
        header("location: index1.php?action=$route");
    }


}

?>


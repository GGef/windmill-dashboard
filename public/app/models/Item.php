<?php
namespace app\models;

// Import the base Model class
require_once __DIR__ . '/Model.php';
use \app\models\Model;

use PDO;

class Item extends \app\models\Model
{
   // private $id;
    private $item_name;
    private $item_type_id;
    private $location_id;
    private $item_location;
    private $description;
    private $owner_id;
    private $price_per_unit;
    private $unit_id;

    // Getters
    public function getItemId()
    {
        return $this->id;
    }

    public function getItemName()
    {
        return $this->item_name;
    }

    public function getItemTypeId()
    {
        return $this->item_type_id;
    }

    public function getItemLocationId()
    {
        return $this->location_id;
    }

    public function getItemLocation()
    {
        return $this->item_location;
    }

    public function getItemDescription()
    {
        return $this->description;
    }

    public function getOwnerId()
    {
        return $this->owner_id;
    }

    public function getPricePerUnit()
    {
        return $this->price_per_unit;
    }

    public function getItemUnitId()
    {
        return $this->unit_id;
    }

    // Setters
    public function setItemId($id)
    {
        $this->id = $id;
    }

    public function setItemName($item_name)
    {
        $this->item_name = $item_name;
    }

    public function setItemTypeId($item_type_id)
    {
        $this->item_type_id = $item_type_id;
    }

    public function setItemLocationId($location_id)
    {
        $this->location_id = $location_id;
    }

    public function setItemLocation($item_location)
    {
        $this->item_location = $item_location;
    }

    public function setItemDescription($description)
    {
        $this->description = $description;
    }

    public function setOwnerId($owner_id)
    {
        $this->owner_id = $owner_id;
    }

    public function setPricePerUnit($price_per_unit)
    {
        $this->price_per_unit = $price_per_unit;
    }

    public function setItemUnitId($unit_id)
    {
        $this->unit_id = $unit_id;
    }

    public static function latestItem()
    {
        // Perform a database query to retrieve the latest items
        return static::database()->query('SELECT I.id, I.item_name, It.type_name, l.name, I.item_location, I.description,
            U.username, I.price_per_unit, Un.unit_name, I.avaible FROM user_account U 
            INNER JOIN item I ON I.owner_id = U.id 
            INNER JOIN item_type It ON I.item_type_id = It.id 
            INNER JOIN location l ON I.location_id = l.id 
            INNER JOIN unit Un ON I.unit_id = Un.id')
            ->fetchAll(PDO::FETCH_CLASS, __CLASS__);
    }
    
    public function createItem()
    {
        // Prepare the SQL statement with placeholders for values
        $statement = static::database()->prepare("INSERT INTO `item` (`id`, `item_name`, `item_type_id`, `location_id`, 
            `item_location`, `description`, `owner_id`, `price_per_unit`, `unit_id`) 
            VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)");
    
        // Execute the prepared statement with the actual values
        return $statement->execute([$this->item_name, $this->item_type_id, $this->location_id, $this->item_location, 
            $this->description, $this->owner_id, $this->price_per_unit, $this->unit_id]);
    }
    
    public function updateItem($id)
{
    // Prepare the SQL statement with placeholders for values
    $statement = static::database()->prepare("UPDATE item SET item_name = ?, item_type_id = ?, location_id = ?, 
        item_location = ?, description = ?, owner_id = ?, price_per_unit = ?, unit_id = ?, avaible = ? WHERE id = ".$id);

    // Create an array of parameters containing the updated values
    $parameters = [
        $this->item_name, 
        $this->item_type_id, 
        $this->location_id, 
        $this->item_location, 
        $this->description, 
        $this->owner_id, 
        $this->price_per_unit, 
        $this->unit_id, 
        $this->avaible
    ];

    // Execute the prepared statement with the actual values
    return $statement->execute($parameters);
}


}


?>

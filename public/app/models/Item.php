<?php
namespace app\models;

require "vendor/autoload.php";

use \app\models\Model;

use PDO;

class Item extends Model
{
    public $id;
    public $item_name;
    public $item_type_id;
    public $location_id;
    public $item_location;
    public $description;
    public $owner_id;
    public $price_per_unit;
    public $unit_id;
    public $titrePropriete;

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

    public function getItemTitle()
    {
        return $this->titrePropriete;
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

    public function setItemTitle($titrePropriete)
    {
         $this->titrePropriete = $titrePropriete;
    }
    
    public function createItem()
    {
        // Prepare the SQL statement with placeholders for values
        $statement = static::database()->prepare("INSERT INTO `item` (`id`, `item_name`, `item_type_id`, `location_id`, 
            `item_location`, `description`, `owner_id`, `price_per_unit`, `unit_id` , `titrePropriete`) 
            VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
        // Execute the prepared statement with the actual values
        return $statement->execute([$this->item_name, $this->item_type_id, $this->location_id, $this->item_location, 
            $this->description, $this->owner_id, $this->price_per_unit, $this->unit_id , $this->titrePropriete]);
    }

    public static function viewItem($id)
    {
        // Prepare the SQL statement to select a record from the "user_account" table based on the given id
        $sqlstate = static::database()->prepare("SELECT * FROM item WHERE id = ?");
        
        // Execute the prepared statement with the provided id
        $sqlstate->execute([$id]);
        
        // Fetch the result as an array of objects of the current class and return the first element
        return current($sqlstate->fetchAll(PDO::FETCH_CLASS, __CLASS__));
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

    public  function statut($id)
    {
        $statement = static::database()->prepare('SELECT * FROM item I
            INNER JOIN item_leased Il ON I.id = Il.item_id
            WHERE Il.item_id = :id AND Il.time_to >= NOW()'); // Adding the WHERE condition based on the provided $id
        $statement->bindParam(':id', $id, PDO::PARAM_INT); // Binding the $id parameter
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetching the results as an associative array
        return $result;
    }

    public  function Type($id)
    {
        $statement = static::database()->prepare('SELECT * FROM item I
            INNER JOIN item_leased Il ON I.id = Il.item_id
            WHERE Il.item_id = :id'); 
        $statement->bindParam(':id', $id, PDO::PARAM_INT); // Binding the $id parameter
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetching the results as an associative array
        return $result;
    }

    public static function getDataOffset($Limit, $offset, $query, $sort, $direction) 
    {
        // Construct the SQL query with placeholders for left and right limit values
        $sql = "SELECT I.id, I.item_name, It.type_name, l.name, I.item_location, I.description,
            U.username, I.price_per_unit, Un.unit_name, I.avaible FROM user_account U 
            INNER JOIN item I ON I.owner_id = U.id
            INNER JOIN item_type It ON I.item_type_id = It.id 
            INNER JOIN location l ON I.location_id = l.id 
            INNER JOIN unit Un ON I.unit_id = Un.id  ";
        // Add search condition if query is provided
        if($query != null) {
            $sql .= " WHERE I.item_name LIKE :value OR I.id LIKE :value ";
            // Bind the search value
            $queryValue = "%$query%";
        }

        // Add sorting condition
        $sql .= " ORDER BY $sort $direction";

        // Add limit and offset clauses
        $sql .= " LIMIT :limit OFFSET :offset";

        // Prepare the SQL statement
        $stmt = static::database()->prepare($sql);
        $stmt->bindParam(':limit', $Limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        // Bind search value if provided
        if($query != null) {
            $stmt->bindParam(':value', $queryValue, PDO::PARAM_STR);
        }
        // Execute the prepared statement  
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS, __CLASS__);
    }


    public static function lengthItem($query) 
    {
        // Construct the SQL query with placeholders for limit, offset, and type
        $sql = "SELECT  COUNT(*) FROM item";
    
        if ($query != null) {
            $sql .= " WHERE (id LIKE :value OR item_name LIKE :value)";
            // Bind the search value
            $queryValue = "%$query%";
        }
        // Prepare the SQL statement
        $stmt = static::database()->prepare($sql);
        if ($query != null) {
            $stmt->bindParam(':value', $queryValue, PDO::PARAM_STR);
        }
        // Execute the prepared statement
        $stmt->execute();
        // Fetch and return the results
        return $stmt->fetchAll(PDO::FETCH_CLASS, __CLASS__);
    }

}





?>


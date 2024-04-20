<?php
namespace app\models;

require "vendor/autoload.php";

use \app\models\Model;

use PDO;

class User extends Model
{
    public $id;
    public $username;
    public $password;
    public $location_id;
    public $location_details;
    public $phone;
    public $mobile;
    public $email;
    public $role_id;
    public $registration_time;
    
    

  // Getters
   

  public function getUsername()
  {
      return $this->username;
  }

  public function getPassword()
  {
      return $this->password;
  }

  public function getUserLocationId()
  {
      return $this->location_id;
  }

  public function getPhone()
  {
      return $this->phone;
  }

  public function getMobile()
  {
      return $this->mobile;
  }

  public function getUserEmail()
  {
      return $this->email;
  }

  public function getRoleId()
  {
      return $this->role_id;
  }

  public function getRegistrationTime()
  {
      return $this->registration_time;
  }

  // Setters

  public function setUsername($username)
  {
      $this->username = $username;
  }

  public function setPassword($password)
  {
      $this->password = $password;
  }

  public function setUserLocationId($location_id)
  {
      $this->location_id = $location_id;
  }

  public function setPhone($phone)
  {
      $this->phone = $phone;
  }

  public function setMobile($mobile)
  {
      $this->mobile = $mobile;
  }

  public function setUserEmail($email)
  {
      $this->email = $email;
  }

  public function setRoleId($role_id)
  {
      $this->role_id = $role_id;
  }

  public function setRegistrationTime($registration_time)
  {
      $this->registration_time = $registration_time;
  }

  public static function authenticate($email, $password)
  {
    // Prepare SQL statement
    $sql = "SELECT U.id, U.email, R.type_role 
    FROM user_account U
    INNER JOIN role R ON U.role_id = R.id
    WHERE U.email = :email AND U.password = :password";

    // Prepare and execute the statement
    $stmt = static::database()->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    // Fetch user data
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists
    if ($user) {
    return $user; // Return user data if found
    } else {
    return false; // Return false if user not found
    }
  }

  public function getLimitProducts($leftLimit, $rightLimit , $key) 
  {
      // Construct the SQL query with placeholders for left and right limit values
      $sql = "SELECT * FROM user_account WHERE role_id = ".$key." LIMIT ".$leftLimit.", ".$rightLimit;
      
      // Prepare the SQL statement
      $stmt = static::database()->prepare($sql);
      
      // Execute the prepared statement
      $stmt->execute();
      
      // Fetch all rows as an array of objects of the current class
      return $stmt->fetchAll(PDO::FETCH_CLASS, __CLASS__);
  }

  public static function getDataLimit($Limit) 
  {
      // Construct the SQL query with placeholders for left and right limit values
      $sql = "SELECT * FROM item LIMIT ".$Limit;
      // Prepare the SQL statement
      $stmt = static::database()->prepare($sql);
      // Execute the prepared statement
      $stmt->execute();
      return $stmt->fetchAll(PDO::FETCH_CLASS, __CLASS__);
  }

  public static function search($value, $type)
{
    $statement = static::database()->prepare('SELECT U.*, L.name FROM user_account U
        INNER JOIN location L ON L.id = U.location_id
        WHERE (U.id LIKE :value OR U.username LIKE :value) AND U.role_id = :type ');

    // Bind the value parameter
    $statement->bindValue(':value', "%$value%");

    // Bind the type parameter (no % signs here)
    $statement->bindValue(':type', $type);

    // Execute the prepared statement
    $statement->execute();

    // Fetch all rows as an array of objects of the current class and return the result
    return $statement->fetchAll(PDO::FETCH_CLASS, __CLASS__);
}


public static function getDataOffset($limit, $offset, $type, $query, $sort, $direction) 
{
    // Construct the SQL query with placeholders for limit, offset, and type
    $sql = "SELECT U.* , L.name FROM user_account U
            INNER JOIN location L ON L.id = U.location_id
            WHERE role_id = :type ";

    // Add search condition if query is provided
    if($query != null) {
        $sql .= " AND (U.id LIKE :value OR U.username LIKE :value) ";
        // Bind the search value
        $queryValue = "%$query%";
    }

    // Add sorting condition
    $sql .= " ORDER BY $sort $direction";

    // Add limit and offset clauses
    $sql .= " LIMIT :limit OFFSET :offset";

    // Prepare the SQL statement
    $stmt = static::database()->prepare($sql);

    // Bind values to the placeholders
    $stmt->bindParam(':type', $type, PDO::PARAM_INT);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);

    // Bind search value if provided
    if($query != null) {
        $stmt->bindParam(':value', $queryValue, PDO::PARAM_STR);
    }

    // Execute the prepared statement
    $stmt->execute();

    // Fetch and return the results
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}




public static function lengthClient($type,$query) 
{
    // Construct the SQL query with placeholders for limit, offset, and type
    $sql = "SELECT  COUNT(*) FROM user_account
            WHERE role_id = :type";

    if ($query != null) {
        $sql .= " AND (id LIKE :value OR username LIKE :value)";
        // Bind the search value
        $queryValue = "%$query%";
    }
    
    // Prepare the SQL statement
    $stmt = static::database()->prepare($sql);

    // Bind values to the placeholders
    $stmt->bindParam(':type', $type, PDO::PARAM_INT);
    if ($query != null) {
        $stmt->bindParam(':value', $queryValue, PDO::PARAM_STR);
    }
    // Execute the prepared statement
    $stmt->execute();
    // Fetch and return the results
    return $stmt->fetchAll(PDO::FETCH_CLASS, __CLASS__);
}


//   public function getLimitProducts($leftLimit, $rightLimit , $key) 
//   {
//       // Construct the SQL query with placeholders for left and right limit values
//       $sql = "SELECT U.username, U.password, L.name, U.phone, U.mobile, U.email, U.registration_time
//         FROM user_account U
//         INNER JOIN location L ON U.location_id = L.id
//         WHERE U.role_id = " . $key . "
//         LIMIT " . $leftLimit . ", " . $rightLimit;

//       // Prepare the SQL statement
//       $stmt = static::database()->prepare($sql);  
      
//       // Execute the prepared statement
//       $stmt->execute();
      
//       // Fetch all rows as an array of objects of the current class
//       return $stmt->fetchAll(PDO::FETCH_CLASS, __CLASS__);
//   }


  public function create()
  {
      // Prepare the SQL statement with placeholders for values
      $statement = static::database()->prepare("INSERT INTO `user_account` (`id`, `username`, `password`, `location_id`, 
      `phone`, `mobile`, `email`, `registration_time`, `role_id`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)");
      
      // Execute the prepared statement with the corresponding values
      return $statement->execute([$this->username, $this->password, $this->location_id, 
       $this->phone, $this->mobile , $this->email , $this->registration_time, $this->role_id]);
  }
  
  public static function view($id)
  {
      // Prepare the SQL statement to select a record from the "user_account" table based on the given id
      $sqlstate = static::database()->prepare("SELECT * FROM user_account WHERE id = ?");
      
      // Execute the prepared statement with the provided id
      $sqlstate->execute([$id]);
      
      // Fetch the result as an array of objects of the current class and return the first element
      return current($sqlstate->fetchAll(PDO::FETCH_CLASS, __CLASS__));
  }
      
    public function update($id)
    {
        // Prepare the SQL statement to update the "user_account" table based on the given id
        $statement = static::database()->prepare("UPDATE user_account SET username = ?, password = ?, location_id = ?,
         phone = ?, mobile = ?, email = ?, registration_time = ?, role_id = ? WHERE id = " . $id);
        
        // Prepare an array of parameters with the values to be updated
        $parameters = [$this->username, $this->password, $this->location_id, 
        $this->phone, $this->mobile, $this->email, $this->registration_time, $this->role_id];
        
        // Execute the prepared statement with the parameters
        return $statement->execute($parameters);
    }

    public function find($table, $searchType, $searchValue)
    {
        // Define the allowed search types (you can customize this as needed)
        $allowedSearchTypes = ['id', 'username'];
    
        // Validate the search type parameter
        if (!in_array($searchType, $allowedSearchTypes)) {
            var_dump('nothing');
            // throw new InvalidArgumentException('Invalid search type. Allowed types: ' . implode(', ', $allowedSearchTypes));
        }
    
        // Prepare the SQL statement to select records from the specified table where the search type matches the provided value
        $statement = static::database()->prepare('SELECT * FROM ' . $table . ' WHERE ' . $searchType . ' LIKE :search_value');
    
        // Bind the value of the search_value parameter to the corresponding placeholder in the query
        $statement->bindValue(':search_value', $searchValue);
    
        // Execute the prepared statement
        $statement->execute();
    
        // Fetch all rows as an array of objects of the current class and return the result
        return $statement->fetchAll(PDO::FETCH_CLASS, __CLASS__);
    }
    


}

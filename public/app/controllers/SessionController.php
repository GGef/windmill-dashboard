<?php
namespace app\controllers;

use app\models\UserModel; // Adjust namespace as needed

class SessionController extends BaseController
{

    public static function login() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Retrieve user input
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Authenticate user
            $user = UserController::getModel()::authenticate($email, $password);

            if ($user) {
                // Start session
                session_start();
                $_SESSION['email'] = $user['email'];
                $_SESSION['role'] = $user['type_role'];
             
                // Redirect to dashboard
                // header("Location: index1.php?action=dash");
                static::redirect('dash');
                
                exit();
            } else {
                // If authentication fails, redirect to login page with error message
                // header("Location: login.php?error=1");
                static::redirect('login&error=1');
                exit();
            }
        }
    }

    public static function isUserAuthenticated($requiredRole)
    {
        // Start session if not already started
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // Check if the user is logged in
        if (isset($_SESSION['email']) && isset($_SESSION['role'])) {
            // Check if the user's role matches the required role
            return $_SESSION['role'] == $requiredRole;
        }

        return false; // User is not authenticated or does not have the required role
    }
}
?>

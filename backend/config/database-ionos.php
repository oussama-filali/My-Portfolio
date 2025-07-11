<?php
// Configuration de la base de données pour IONOS
class Database {
    // Configuration pour IONOS (à ajuster selon vos paramètres)
    private $host = 'localhost';           // Ou l'host fourni par IONOS
    private $db_name = 'portfolio_db';     // Nom de votre base IONOS
    private $username = 'votre_user';      // Utilisateur MySQL IONOS
    private $password = 'votre_password';  // Mot de passe MySQL IONOS
    private $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // En production, ne pas afficher les erreurs détaillées
            error_log("Erreur de connexion: " . $exception->getMessage());
            echo "Erreur de connexion à la base de données";
        }
        
        return $this->conn;
    }
}
?>

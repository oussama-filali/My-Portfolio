<?php
// Configuration de la base de données
class Database {
    // Configuration pour IONOS
    private $host = 'db501818340.hosting-data.io';  // Host IONOS visible dans votre interface
    private $db_name = 'dbs14416817';               // Nom de votre base IONOS
    private $username = 'dbu14416817';              // Généralement dbu + numéro de base
    private $password = 'Didoulidaid57@';       // À remplacer par votre mot de passe IONOS
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
            // En production, logger les erreurs sans les afficher
            error_log("Erreur de connexion DB: " . $exception->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Erreur de connexion à la base de données']);
        }
        
        return $this->conn;
    }
}
?>

<?php
// Test de connexion pour debug
header('Content-Type: application/json');

// Activer l'affichage des erreurs pour debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    require_once '../config/database.php';
    
    $database = new Database();
    $conn = $database->getConnection();
    
    if ($conn) {
        // Test simple de requête
        $query = "SELECT COUNT(*) as count FROM visits";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'message' => 'Connexion OK',
            'test_query' => $result
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Pas de connexion'
        ]);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
?>

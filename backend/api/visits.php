<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gestion des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

class VisitTracker {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function trackVisit() {
        try {
            $ip = $this->getRealIpAddr();
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
            $page = $_POST['page'] ?? 'home';
            
            // Vérifier si c'est une nouvelle visite (même IP dans les 30 minutes)
            $query = "SELECT COUNT(*) as count FROM visits 
                     WHERE ip_address = :ip 
                     AND visit_timestamp > DATE_SUB(NOW(), INTERVAL 30 MINUTE)";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':ip', $ip);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Si c'est une nouvelle visite, l'enregistrer
            if ($result['count'] == 0) {
                $insertQuery = "INSERT INTO visits (ip_address, user_agent, page_visited) 
                               VALUES (:ip, :user_agent, :page)";
                
                $insertStmt = $this->conn->prepare($insertQuery);
                $insertStmt->bindParam(':ip', $ip);
                $insertStmt->bindParam(':user_agent', $userAgent);
                $insertStmt->bindParam(':page', $page);
                $insertStmt->execute();
                
                // Mettre à jour les statistiques
                $this->updateStats();
            }
            
            // Retourner les statistiques actuelles
            return $this->getStats();
            
        } catch(Exception $e) {
            return ['error' => 'Erreur lors de l\'enregistrement: ' . $e->getMessage()];
        }
    }
    
    public function getStats() {
        try {
            $query = "SELECT 
                        (SELECT COUNT(*) FROM visits) as total_visits,
                        (SELECT COUNT(*) FROM feedback) as total_feedback,
                        (SELECT ROUND(AVG(rating), 1) FROM feedback) as average_rating,
                        (SELECT COUNT(*) FROM visits WHERE DATE(visit_timestamp) = CURDATE()) as today_visits
                     ";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => [
                    'total_visits' => (int)$stats['total_visits'],
                    'today_visits' => (int)$stats['today_visits'],
                    'total_feedback' => (int)$stats['total_feedback'],
                    'average_rating' => (float)$stats['average_rating'] ?: 0
                ]
            ];
            
        } catch(Exception $e) {
            return ['error' => 'Erreur lors de la récupération des stats: ' . $e->getMessage()];
        }
    }
    
    private function updateStats() {
        $updateQuery = "UPDATE stats SET 
                       total_visits = (SELECT COUNT(*) FROM visits),
                       total_feedback = (SELECT COUNT(*) FROM feedback),
                       average_rating = (SELECT AVG(rating) FROM feedback)
                       WHERE id = 1";
        
        $stmt = $this->conn->prepare($updateQuery);
        $stmt->execute();
    }
    
    private function getRealIpAddr() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            return $_SERVER['REMOTE_ADDR'];
        }
    }
}

// Traitement des requêtes
$tracker = new VisitTracker();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($tracker->trackVisit());
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($tracker->getStats());
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>

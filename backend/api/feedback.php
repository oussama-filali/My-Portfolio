<?php
// DEBUG: Test de sortie immédiate
// echo json_encode(['debug' => 'Top du fichier atteint !', 'time' => time()]);
// exit();

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

class FeedbackManager {
    private $conn;
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    public function addFeedback() {
        try {
            $input = json_decode(file_get_contents('php://input'), true);
            
            $rating = (int)$input['rating'];
            $comment = trim($input['comment'] ?? '');
            $email = trim($input['email'] ?? '');
            $ip = $this->getRealIpAddr();
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
            
            // Validation
            if ($rating < 1 || $rating > 5) {
                return ['error' => 'La note doit être entre 1 et 5'];
            }
            
            // Vérifier si l'IP a déjà donné un avis dans les dernières 24h
            $checkQuery = "SELECT COUNT(*) as count FROM feedback 
                          WHERE ip_address = :ip 
                          AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)";
            
            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->bindParam(':ip', $ip);
            $checkStmt->execute();
            $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
            
            if ($existing['count'] > 0) {
                return ['error' => 'Vous avez déjà donné votre avis aujourd\'hui. Merci ! 😊'];
            }
            
            // Insérer le nouvel avis
            $insertQuery = "INSERT INTO feedback (rating, comment, email, ip_address, user_agent) 
                           VALUES (:rating, :comment, :email, :ip, :user_agent)";
            
            $stmt = $this->conn->prepare($insertQuery);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':comment', $comment);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':ip', $ip);
            $stmt->bindParam(':user_agent', $userAgent);
            
            if ($stmt->execute()) {
                // Mettre à jour les statistiques
                $this->updateStats();
                
                return [
                    'success' => true,
                    'message' => 'Merci pour votre avis ! 🙏',
                    'data' => [
                        'id' => $this->conn->lastInsertId(),
                        'rating' => $rating,
                        'comment' => $comment
                    ]
                ];
            } else {
                return ['error' => 'Erreur lors de l\'enregistrement de l\'avis'];
            }
            
        } catch(Exception $e) {
            return ['error' => 'Erreur: ' . $e->getMessage()];
        }
    }
    
    public function getFeedback($limit = 10) {
        try {
            $query = "SELECT rating, comment, display_name, created_at 
                     FROM feedback 
                     WHERE is_approved = 1 AND comment IS NOT NULL AND comment != ''
                     ORDER BY created_at DESC 
                     LIMIT :limit";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            
            $feedback = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $feedback
            ];
            
        } catch(Exception $e) {
            return ['error' => 'Erreur lors de la récupération des avis: ' . $e->getMessage()];
        }
    }
    
    public function getStats() {
        try {
            $query = "SELECT 
                        COUNT(*) as total_feedback,
                        ROUND(AVG(rating), 1) as average_rating,
                        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_stars,
                        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_stars,
                        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_stars,
                        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_stars,
                        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
                     FROM feedback WHERE is_approved = 1";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => [
                    'total_feedback' => (int)$stats['total_feedback'],
                    'average_rating' => (float)$stats['average_rating'] ?: 0,
                    'distribution' => [
                        5 => (int)$stats['five_stars'],
                        4 => (int)$stats['four_stars'],
                        3 => (int)$stats['three_stars'],
                        2 => (int)$stats['two_stars'],
                        1 => (int)$stats['one_star']
                    ]
                ]
            ];
            
        } catch(Exception $e) {
            return ['error' => 'Erreur lors de la récupération des statistiques: ' . $e->getMessage()];
        }
    }
    
    private function updateStats() {
        $updateQuery = "UPDATE stats SET 
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
$feedbackManager = new FeedbackManager();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($feedbackManager->addFeedback());
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'stats') {
        echo json_encode($feedbackManager->getStats());
    } else {
        $limit = (int)($_GET['limit'] ?? 10);
        echo json_encode($feedbackManager->getFeedback($limit));
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>

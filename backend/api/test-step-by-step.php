<?php
header('Content-Type: application/json');
echo json_encode(['debug' => 'Avant inclusion database.php']);

try {
    require_once '../config/database.php';
    echo json_encode(['debug' => 'Inclusion database.php OK']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur inclusion: ' . $e->getMessage()]);
    exit();
}

try {
    $db = new Database();
    echo json_encode(['debug' => 'Création objet Database OK']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur création Database: ' . $e->getMessage()]);
    exit();
}

try {
    $conn = $db->getConnection();
    if ($conn) {
        echo json_encode(['debug' => 'Connexion BDD OK', 'status' => 'connected']);
    } else {
        echo json_encode(['error' => 'Connexion BDD impossible']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur connexion BDD: ' . $e->getMessage()]);
}
?>

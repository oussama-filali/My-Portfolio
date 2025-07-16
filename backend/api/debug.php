<?php
// Script de debug complet pour IONOS
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Debug IONOS - Portfolio Backend</h1>";
echo "<hr>";

// 1. Test PHP version
echo "<h2>1. Version PHP</h2>";
echo "Version PHP : " . phpversion() . "<br>";
echo "SAPI : " . php_sapi_name() . "<br>";
echo "<hr>";

// 2. Test des extensions
echo "<h2>2. Extensions PHP</h2>";
echo "PDO disponible : " . (extension_loaded('pdo') ? 'OUI' : 'NON') . "<br>";
echo "PDO MySQL disponible : " . (extension_loaded('pdo_mysql') ? 'OUI' : 'NON') . "<br>";
echo "MySQLi disponible : " . (extension_loaded('mysqli') ? 'OUI' : 'NON') . "<br>";
echo "<hr>";

// 3. Test du fichier de configuration database
echo "<h2>3. Configuration Database</h2>";
$config_path = '../config/database.php';
if (file_exists($config_path)) {
    echo "Fichier database.php trouvé<br>";
    try {
        require_once $config_path;
        echo "Fichier chargé avec succès<br>";
        // Supposons que le fichier database.php définit les variables suivantes :
        // $db_host, $db_name, $db_user, $db_pass
        echo "HOST défini : " . (isset($db_host) ? 'OUI (' . htmlspecialchars($db_host) . ')' : 'NON') . "<br>";
        echo "DATABASE défini : " . (isset($db_name) ? 'OUI (' . htmlspecialchars($db_name) . ')' : 'NON') . "<br>";
        echo "USER défini : " . (isset($db_user) ? 'OUI (' . htmlspecialchars($db_user) . ')' : 'NON') . "<br>";
        echo "PASSWORD défini : " . (isset($db_pass) ? 'OUI (***masqué***)' : 'NON') . "<br>";
    } catch (Exception $e) {
        echo "ERREUR lors du chargement : " . $e->getMessage() . "<br>";
    }
} else {
    echo "ERREUR : Fichier database.php non trouvé à " . $config_path . "<br>";
}
echo "<hr>";

// 4. Test de connexion MySQL
echo "<h2>4. Test Connexion MySQL</h2>";
if (isset($db_host) && isset($db_name) && isset($db_user) && isset($db_pass)) {
    try {
        $dsn = "mysql:host=" . $db_host . ";dbname=" . $db_name . ";charset=utf8mb4";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        echo "✅ Connexion MySQL réussie !<br>";
        
        // Test de requête
        $stmt = $pdo->query("SELECT DATABASE() as current_db, NOW() as current_time");
        $result = $stmt->fetch();
        echo "Base courante : " . $result['current_db'] . "<br>";
        echo "Heure serveur : " . $result['current_time'] . "<br>";
        
        // Test des tables
        echo "<h3>Tables existantes :</h3>";
        $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
        foreach ($tables as $table) {
            echo "- " . $table . "<br>";
        }
        
    } catch (PDOException $e) {
        echo "❌ ERREUR Connexion MySQL : " . $e->getMessage() . "<br>";
        echo "Code erreur : " . $e->getCode() . "<br>";
    }
} else {
    echo "❌ Configuration incomplète<br>";
}
echo "<hr>";

// 5. Test des permissions de fichiers
echo "<h2>5. Permissions</h2>";
echo "Répertoire courant : " . __DIR__ . "<br>";
echo "Répertoire lisible : " . (is_readable(__DIR__) ? 'OUI' : 'NON') . "<br>";
echo "Répertoire en écriture : " . (is_writable(__DIR__) ? 'OUI' : 'NON') . "<br>";
echo "<hr>";

// 6. Variables d'environnement
echo "<h2>6. Variables Serveur</h2>";
echo "SERVER_NAME : " . ($_SERVER['SERVER_NAME'] ?? 'non défini') . "<br>";
echo "REQUEST_METHOD : " . ($_SERVER['REQUEST_METHOD'] ?? 'non défini') . "<br>";
echo "DOCUMENT_ROOT : " . ($_SERVER['DOCUMENT_ROOT'] ?? 'non défini') . "<br>";
echo "<hr>";

echo "<p><strong>Debug terminé - " . date('Y-m-d H:i:s') . "</strong></p>";
?>

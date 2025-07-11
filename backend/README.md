# Configuration Backend Portfolio

## 📋 **Prérequis**
- WAMP/XAMPP avec PHP 7.4+ et MySQL
- Base de données MySQL accessible

## 🚀 **Installation**

### 1. **Configuration de la base de données**
1. Ouvrez phpMyAdmin (`http://localhost/phpmyadmin`)
2. Exécutez le script SQL : `backend/sql/setup.sql`
3. Vérifiez que la base `portfolio_db` est créée avec les tables

### 2. **Configuration PHP**
1. Modifiez `backend/config/database.php` avec vos paramètres :
```php
private $host = 'localhost';
private $db_name = 'portfolio_db';
private $username = 'root';      // Votre utilisateur MySQL
private $password = '';          // Votre mot de passe MySQL
```

### 3. **Test des API**
- Visits: `http://localhost/My-Portfolio/backend/api/visits.php`
- Feedback: `http://localhost/My-Portfolio/backend/api/feedback.php`

## 📊 **Fonctionnalités**

### **Tracking des visites**
- ✅ Comptage automatique des visites uniques
- ✅ Protection contre le spam (30 min entre visites)
- ✅ Statistiques en temps réel
- ✅ Affichage discret sur le portfolio

### **Système d'avis**
- ✅ Notes de 1 à 5 étoiles
- ✅ Commentaires optionnels
- ✅ Email optionnel
- ✅ Protection anti-spam (1 avis/24h par IP)
- ✅ Stockage en base MySQL

## 🔧 **API Endpoints**

### **Visits API** (`/api/visits.php`)
```javascript
// Tracker une visite
POST /visits.php
Body: { page: 'home' }

// Récupérer les stats
GET /visits.php
Response: {
  total_visits: 123,
  today_visits: 12,
  total_feedback: 45,
  average_rating: 4.2
}
```

### **Feedback API** (`/api/feedback.php`)
```javascript
// Soumettre un avis
POST /feedback.php
Body: {
  rating: 5,
  comment: "Super portfolio !",
  email: "test@example.com"
}

// Récupérer les avis
GET /feedback.php?limit=10

// Stats des avis
GET /feedback.php?action=stats
```

## 📱 **Usage Frontend**
```javascript
import PortfolioAPI from './services/api';

// Tracker une visite
await PortfolioAPI.trackVisit('home');

// Soumettre un avis
await PortfolioAPI.submitFeedback(5, 'Super !', 'email@test.com');
```

## 🛡️ **Sécurité**
- ✅ Protection CORS configurée
- ✅ Validation des données
- ✅ Protection anti-spam
- ✅ Requêtes préparées (SQL injection)
- ✅ Nettoyage des entrées utilisateur

## 📈 **Base de données**

### **Tables créées**
- `visits` : Tracking des visites
- `feedback` : Stockage des avis
- `stats` : Statistiques globales

### **Données collectées**
- IP (anonymisée après 30 jours)
- User Agent
- Timestamps
- Avis et commentaires
- Statistiques d'usage

## 🔧 **Maintenance**
- Les données peuvent être consultées via phpMyAdmin
- Possibilité d'approuver/désapprouver les avis
- Statistiques détaillées disponibles

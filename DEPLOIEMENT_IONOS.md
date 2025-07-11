# 🚀 Guide de Déploiement IONOS - Portfolio Oussama

## 📋 **Étapes de déploiement**

### **1. Préparer la base de données**
1. **Ouvrir phpMyAdmin IONOS** (comme dans votre screenshot)
2. **Sélectionner la base** : `dbs14416817`
3. **Onglet SQL** → Copier/coller le contenu de `backend/sql/setup.sql`
4. **Exécuter** le script pour créer les tables

### **2. Configurer les paramètres de connexion**
Dans `backend/config/database.php`, remplacez :
```php
private $password = 'VOTRE_MOT_DE_PASSE';
```
Par votre vraie mot de passe MySQL IONOS.

### **3. Structure à uploader sur IONOS**
```
votre-domaine/
├── index.html              (depuis dist/)
├── assets/                 (depuis dist/assets/)
│   ├── index-xxxxx.css
│   └── index-xxxxx.js
├── img/                    (depuis dist/img/)
│   ├── favicon.png
│   ├── portfolio1.gif (optimisé)
│   ├── quiz.gif (optimisé)
│   └── ... (toutes les autres images)
└── backend/                (nouveau dossier)
    ├── config/
    │   └── database.php    (avec vos paramètres IONOS)
    └── api/
        ├── visits.php
        └── feedback.php
```

### **4. Upload sur IONOS**
1. **Via FTP/SFTP** ou gestionnaire de fichiers IONOS
2. **Uploader TOUT** le contenu ci-dessus à la racine
3. **Vérifier les permissions** PHP (généralement OK par défaut)

### **5. Test des fonctionnalités**
- ✅ Portfolio : `https://votre-domaine.com`
- ✅ API Visits : `https://votre-domaine.com/backend/api/visits.php`
- ✅ API Feedback : `https://votre-domaine.com/backend/api/feedback.php`

## 🔧 **Paramètres IONOS detectés**
```php
Host: db501818340.hosting-data.io
Base: dbs14416817
User: dbu14416817 (probable)
Password: [À saisir]
```

## 📊 **Fonctionnalités qui seront actives**
- 🎯 **Tracking automatique** des visites
- ⭐ **Système d'avis** stockés en MySQL
- 📈 **Statistiques temps réel** (visites + notes)
- 🛡️ **Protection anti-spam** (IP + temporelle)

## ⚠️ **Important**
- Le mot de passe MySQL est nécessaire pour que ça fonctionne
- Testez d'abord les API dans votre navigateur
- Les avis sont stockés définitivement en base

## 🎉 **Résultat final**
Portfolio professionnel avec vraies statistiques et avis persistants ! 🚀

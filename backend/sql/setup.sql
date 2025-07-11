-- Script pour IONOS - Tables du portfolio
-- À exécuter dans phpMyAdmin IONOS base: dbs14416817
-- (Ignorer l'erreur de CREATE DATABASE - normal sur IONOS)

-- Utiliser la base existante
USE dbs14416817;

-- Table pour les statistiques de visites
CREATE TABLE IF NOT EXISTS visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    page_visited VARCHAR(255) DEFAULT 'home',
    visit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    country VARCHAR(100),
    city VARCHAR(100)
);

-- Table pour les avis/feedback
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    email VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT 1,
    display_name VARCHAR(100) DEFAULT 'Visiteur anonyme'
);

-- Table pour les statistiques globales
CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_visits INT DEFAULT 0,
    total_feedback INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion des statistiques initiales
INSERT INTO stats (total_visits, total_feedback, average_rating) 
VALUES (0, 0, 0.00) 
ON DUPLICATE KEY UPDATE id=id;

-- Index pour optimiser les performances
CREATE INDEX idx_visits_timestamp ON visits(visit_timestamp);
CREATE INDEX idx_visits_ip ON visits(ip_address);
CREATE INDEX idx_feedback_rating ON feedback(rating);
CREATE INDEX idx_feedback_created ON feedback(created_at);

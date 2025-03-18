-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestion_parrainage;
USE gestion_parrainage;

-- Table pour stocker les électeurs
CREATE TABLE IF NOT EXISTS electeurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cin VARCHAR(20) UNIQUE NOT NULL,
    numero_electeur VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    lieu_naissance VARCHAR(100) NOT NULL,
    sexe ENUM('M', 'F') NOT NULL,
    bureau_vote VARCHAR(100) NOT NULL
);

-- Table pour stocker les candidats
CREATE TABLE IF NOT EXISTS candidats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_electeur VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    parti_politique VARCHAR(100),
    slogan TEXT,
    photo_url VARCHAR(255),
    couleur1 VARCHAR(20),
    couleur2 VARCHAR(20),
    couleur3 VARCHAR(20),
    url_page VARCHAR(255)
);

-- Table pour stocker les parrainages
CREATE TABLE IF NOT EXISTS parrainages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    electeur_id INT NOT NULL,
    candidat_id INT NOT NULL,
    date_parrainage TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (electeur_id) REFERENCES electeurs(id),
    FOREIGN KEY (candidat_id) REFERENCES candidats(id)
);

-- Table pour historiser les tentatives d'upload
CREATE TABLE IF NOT EXISTS historisation_upload (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur VARCHAR(100) NOT NULL,
    date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    adresse_ip VARCHAR(50) NOT NULL,
    clef_utilisee VARCHAR(255) NOT NULL,
    resultat BOOLEAN NOT NULL
);

-- Table temporaire pour stocker les électeurs lors de l'upload d'un fichier CSV
CREATE TABLE IF NOT EXISTS electeurs_temporaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cin VARCHAR(20) NOT NULL,
    numero_electeur VARCHAR(20) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    lieu_naissance VARCHAR(100) NOT NULL,
    sexe ENUM('M', 'F') NOT NULL,
    bureau_vote VARCHAR(100) NOT NULL,
    upload_id INT NOT NULL, -- Référence à l'historisation_upload
    FOREIGN KEY (upload_id) REFERENCES historisation_upload(id)
);
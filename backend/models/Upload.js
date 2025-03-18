// models/Upload.js
const db = require('../config/db');

class Upload {
    static create(upload, callback) {
        const query = 'INSERT INTO historisation_upload (utilisateur, adresse_ip, clef_utilisee, resultat) VALUES (?, ?, ?, ?)';
        db.query(query, [upload.utilisateur, upload.adresse_ip, upload.clef_utilisee, upload.resultat], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM historisation_upload';
        db.query(query, callback);
    }
}

module.exports = Upload;
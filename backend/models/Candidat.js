// models/Candidat.js
const db = require('../config/db');

class Candidat {
    static create(candidat, callback) {
        const query = 'INSERT INTO candidats (numero_electeur, nom, prenom, date_naissance, email, telephone, parti_politique, slogan, photo_url, couleur1, couleur2, couleur3, url_page) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [candidat.numero_electeur, candidat.nom, candidat.prenom, candidat.date_naissance, candidat.email, candidat.telephone, candidat.parti_politique, candidat.slogan, candidat.photo_url, candidat.couleur1, candidat.couleur2, candidat.couleur3, candidat.url_page], callback);
    }

    static getAll(callback) {
        const query = 'SELECT * FROM candidats';
        db.query(query, callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM candidats WHERE id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Candidat;
const db = require('../config/db');

class Electeur {
    static getAll(callback) {
        const query = 'SELECT * FROM electeurs';
        db.query(query, callback);
    }

    static findByCriteria(criteria, callback) {
        const query = 'SELECT * FROM electeurs WHERE numero_electeur = ? AND cin = ? LIMIT 1';
        db.query(query, [criteria.numero_electeur, criteria.cin], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    }

    static create(electeur, callback) {
        const query = 'INSERT INTO electeurs (cin, numero_electeur, nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [
            electeur.cin,
            electeur.numero_electeur,
            electeur.nom,
            electeur.prenom,
            electeur.date_naissance,
            electeur.lieu_naissance,
            electeur.sexe,
            electeur.bureau_vote
        ], callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM electeurs WHERE id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Electeur;
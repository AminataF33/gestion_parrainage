// models/Parrainage.js
const db = require('../config/db');

class Parrainage {
    static create(parrainage, callback) {
        const query = 'INSERT INTO parrainages (electeur_id, candidat_id) VALUES (?, ?)';
        db.query(query, [parrainage.electeur_id, parrainage.candidat_id], callback);
    }

    static getByCandidatId(candidat_id, callback) {
        const query = 'SELECT * FROM parrainages WHERE candidat_id = ?';
        db.query(query, [candidat_id], callback);
    }
}

module.exports = Parrainage;
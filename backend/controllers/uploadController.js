// controllers/uploadController.js
const Upload = require('../models/Upload');
const fs = require('fs');
const csv = require('csv-parser');
const db = require('../config/db');

const uploadFile = (req, res) => {
    const filePath = req.file.path;
    const checksum = req.body.checksum;

    // Vérification du checksum (exemple simplifié)
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const crypto = require('crypto');
    const calculatedChecksum = crypto.createHash('sha256').update(fileContent).digest('hex');

    if (calculatedChecksum !== checksum) {
        return res.status(400).json({ message: 'Checksum invalide' });
    }

    const electeursTemporaires = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            electeursTemporaires.push(row);
        })
        .on('end', () => {
            // Insertion des électeurs dans la table temporaire
            const query = 'INSERT INTO electeurs_temporaires (cin, numero_electeur, nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote, upload_id) VALUES ?';
            const uploadId = 1; // À remplacer par l'ID de l'upload réel
            const values = electeursTemporaires.map(e => [
                e.cin,
                e.numero_electeur,
                e.nom,
                e.prenom,
                e.date_naissance,
                e.lieu_naissance,
                e.sexe,
                e.bureau_vote,
                uploadId,
            ]);

            db.query(query, [values], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de l\'insertion des électeurs temporaires' });
                }
                res.json({ message: 'Fichier importé avec succès', rowsInserted: result.affectedRows });
            });
        });
};

module.exports = { uploadFile };
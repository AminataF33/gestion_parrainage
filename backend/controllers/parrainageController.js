// controllers/parrainageController.js
const Parrainage = require('../models/Parrainage');

const createParrainage = (req, res) => {
    const parrainage = req.body;
    Parrainage.create(parrainage, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la création du parrainage' });
        }
        res.status(201).json({ message: 'Parrainage créé avec succès', id: result.insertId });
    });
};

const getParrainagesByCandidatId = (req, res) => {
    const candidat_id = req.params.candidat_id;
    Parrainage.getByCandidatId(candidat_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des parrainages' });
        }
        res.json(results);
    });
};

module.exports = { createParrainage, getParrainagesByCandidatId };
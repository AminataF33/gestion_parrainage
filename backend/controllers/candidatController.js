const Candidat = require('../models/Candidat');

// Création d'un candidat
const createCandidat = (req, res) => {
    const candidat = req.body;
    Candidat.create(candidat, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la création du candidat' });
        }
        res.status(201).json({ message: 'Candidat créé avec succès', id: result.insertId });
    });
};

// Récupérer tous les candidats
const getAllCandidats = (req, res) => {
    Candidat.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des candidats' });
        }
        res.json(results);
    });
};

// Rechercher un candidat par numéro d'électeur
const searchByElectorNumber = (req, res) => {
    const electorNumber = req.query.electorNumber;
    Candidat.searchByElectorNumber(electorNumber, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la recherche du candidat' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Candidat non trouvé' });
        }
        res.json(result);
    });
};

// Enregistrement d'un candidat
const registerCandidat = (req, res) => {
    const candidatInfo = req.body;
    Candidat.register(candidatInfo, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du candidat' });
        }
        res.status(201).json({ message: 'Candidat enregistré avec succès', id: result.insertId });
    });
};

// Régénération du code de sécurité
const regenerateSecurityCode = (req, res) => {
    const candidatId = req.params.id;
    Candidat.regenerateSecurityCode(candidatId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la régénération du code de sécurité' });
        }
        res.json({ message: 'Code de sécurité régénéré avec succès', code: result.code });
    });
};

// Récupérer les détails d'un candidat
const getCandidatDetails = (req, res) => {
    const candidatId = req.params.id;
    Candidat.getDetails(candidatId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des détails du candidat' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Candidat non trouvé' });
        }
        res.json(result);
    });
};

// Authentification du candidat
const authenticateCandidat = (req, res) => {
    const { email, securityCode } = req.body;
    Candidat.authenticate(email, securityCode, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'authentification du candidat' });
        }
        if (!result) {
            return res.status(401).json({ message: 'Email ou code de sécurité incorrect' });
        }
        res.json({ message: 'Authentification réussie', candidat: result });
    });
};

// Vérification de la carte d'électeur
const verifyVoterCard = (req, res) => {
    const cardNumber = req.query.cardNumber;
    Candidat.verifyVoterCard(cardNumber, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la vérification de la carte d\'électeur' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Carte d\'électeur non trouvée' });
        }
        res.json({ message: 'Carte d\'électeur validée', details: result });
    });
};

module.exports = {
    createCandidat,
    getAllCandidats,
    searchByElectorNumber,
    registerCandidat,
    regenerateSecurityCode,
    getCandidatDetails,
    authenticateCandidat,
    verifyVoterCard
};

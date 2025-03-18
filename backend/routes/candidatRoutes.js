// routes/candidatRoutes.js
const express = require('express');
const candidatController = require('../controllers/candidatController');
const router = express.Router();

// Utiliser /candidats comme préfixe pour les routes
router.post('/', candidatController.createCandidat);
router.get('/', candidatController.getAllCandidats);
router.get('/search', candidatController.searchByElectorNumber);
router.post('/register', candidatController.registerCandidat);
router.post('/:id/regenerate-code', candidatController.regenerateSecurityCode);
router.get('/:id', candidatController.getCandidatDetails);
router.post('/authenticate', candidatController.authenticateCandidat);
router.get('/verify-voter-card', candidatController.verifyVoterCard);

module.exports = router;

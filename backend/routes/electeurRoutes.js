const express = require('express');
const electeurController = require('../controllers/electeurController');

const router = express.Router();

router.get('/', electeurController.getAllElecteurs);
router.post('/verifier', electeurController.verifierIdentite);
router.post('/parrainage', electeurController.enregistrerParrainage);
router.get('/:id/parrainage-existant', electeurController.verifierParrainageExistant);

module.exports = router;
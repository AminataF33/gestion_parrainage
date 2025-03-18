// routes/parrainageRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const parrainageController = require('../controllers/parrainageController');

const router = express.Router();

router.post('/parrainages', parrainageController.createParrainage);
router.get('/candidats/:candidat_id/parrainages',  parrainageController.getParrainagesByCandidatId);

module.exports = router;
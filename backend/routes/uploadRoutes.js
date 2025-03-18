// routes/uploadRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

router.post('/upload-electeurs', authMiddleware, uploadMiddleware.single('file'), uploadController.uploadFile);

module.exports = router;
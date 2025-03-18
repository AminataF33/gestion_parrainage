// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const electeurRoutes = require('./routes/electeurRoutes');
const candidatRoutes = require('./routes/candidatRoutes');
const parrainageRoutes = require('./routes/parrainageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/electeurs', electeurRoutes);
app.use('/api/candidats', candidatRoutes); 
app.use('/api/parrainages', parrainageRoutes);
app.use('/api/uploads', uploadRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

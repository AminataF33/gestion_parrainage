// controllers/authController.js
const db = require('../config/db');
const generateToken = require('../utils/generateToken');

const login = (req, res) => {
    const { numero_electeur, cin } = req.body;

    const query = 'SELECT * FROM electeurs WHERE numero_electeur = ? AND cin = ?';
    db.query(query, [numero_electeur, cin], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la connexion' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }

        const electeur = results[0];
        const token = generateToken(electeur.id);

        res.json({ token });
    });
};

module.exports = { login };
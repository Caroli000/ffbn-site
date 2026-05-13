const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {

    const cookieToken = req.cookies && req.cookies.admin_token;
    const header = req.headers && req.headers.authorization;
    const headerToken = header && header.startsWith('Bearer ') ? header.slice(7) : null;

    const token = cookieToken || headerToken;

    if (!token) {
        console.warn(`[AUTH] Accès refusé pour ${req.originalUrl} - Token manquant`);
        return res.status(401).json({ success: false, message: 'Accès refusé. Non authentifié.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ffbn_super_secret_key_2024_change_me_in_prod');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Accès refusé. Rôle insuffisant.' });
        }
        req.user = decoded; // Ajoute l'utilisateur à la requête pour la suite
        next();
    } catch (err) {
        console.warn(`[AUTH] Accès refusé pour ${req.originalUrl} - Token invalide ou expiré`);
        return res.status(401).json({ success: false, message: 'Token invalide ou expiré.' });
    }
};

module.exports = { checkAdmin };

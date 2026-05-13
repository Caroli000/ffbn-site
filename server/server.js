require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const connectDB = require('./config/db');

// Connexion DB sécurisée
try {
    connectDB();
} catch (e) {
    console.error('DB Error:', e.message);
}

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dossier d'images
const getImagePath = () => {
    const paths = [
        path.join(__dirname, '../../images'),
        path.join(__dirname, '../images'),
        path.join(__dirname, 'images'),
        path.join(process.cwd(), 'images')
    ];
    for (const p of paths) {
        if (fs.existsSync(p)) return p;
    }
    return path.join(__dirname, '../../images');
};

const imagePath = getImagePath();
app.use('/images', express.static(imagePath));

// Routes de base (Directes pour éviter les erreurs de require)
const AdminController = require('./controllers/AdminController');
const adminController = new AdminController();
const mediaController = require('./controllers/MediaController');

app.post('/api/admin/login', adminController.login);
app.get('/api/media/list/:category', mediaController.publicListMedia);
app.get('/api/admin/media/list', mediaController.listMedia);
app.post('/api/admin/media/upload', mediaController.uploadImage);

// Chargement sécurisé des autres routes
const safeLoadRoute = (routePath, apiPath) => {
    const fullPath = path.join(__dirname, routePath + '.js');
    if (fs.existsSync(fullPath)) {
        try {
            app.use(apiPath, require(routePath));
            console.log(`Route ${apiPath} chargée.`);
        } catch (e) {
            console.error(`Erreur chargement route ${apiPath}:`, e.message);
        }
    } else {
        console.warn(`Fichier manquant: ${fullPath}`);
    }
};

safeLoadRoute('./routes/actionRoutes', '/api/actions');
safeLoadRoute('./routes/eventRoutes', '/api/events');
safeLoadRoute('./routes/statsRoutes', '/api/stats');
safeLoadRoute('./routes/chatRoutes', '/api/chat');

app.get('/api/health', (req, res) => res.json({ 
    status: 'up', 
    images: fs.existsSync(imagePath),
    path: imagePath,
    node: process.version
}));

const PORT = process.env.PORT || 3001;
// Bind to 0.0.0.0 explicitly — some hosting providers require this to expose the service
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});

module.exports = app;

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const getMediaBasePath = () => {
    if (process.env.MEDIA_DIR) return process.env.MEDIA_DIR;

    const possiblePaths = [
        path.join(__dirname, '../../images'),
        path.join(__dirname, '../public/images'),
        path.join(__dirname, '../images'),
        path.join(process.cwd(), 'images'),
        path.join(process.cwd(), 'public/images')
    ];

    for (const p of possiblePaths) {
        try {
            if (fs.existsSync(p)) return p;
        } catch (e) {
            // Ignorer les erreurs de permission lors du scan
        }
    }

    const fallback = path.join(__dirname, '../../images');
    try {
        if (!fs.existsSync(fallback)) {
            fs.mkdirSync(fallback, { recursive: true });
        }
    } catch (e) {
        console.warn('[Media] Impossible de créer le dossier images, vérifiez les permissions.');
    }
    return fallback;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const category = req.body.category || 'misc';
        const targetDir = path.join(getMediaBasePath(), category);

        try {
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
        } catch (e) {
            console.error('[Media] Erreur destination upload:', e.message);
        }
        cb(null, targetDir);
    },
    filename: (req, file, cb) => {
        const targetName = req.body.targetFilename || file.originalname;
        cb(null, targetName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Augmenté à 10MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            return cb(null, true);
        }
        cb(new Error('Veuillez uploader uniquement des fichiers images (jpg, png, webp, etc.)'));
    }
}).single('image');

class MediaController {

    async uploadImage(req, res) {
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'Aucun fichier reçu' });
            }

            res.json({
                success: true,
                message: 'Image enregistrée avec succès',
                file: {
                    name: req.file.filename,
                    path: `/images/${req.body.category}/${req.file.filename}`
                }
            });
        });
    }

    async deleteImage(req, res) {
        const { category, filename } = req.body;
        if (!category || !filename) {
            return res.status(400).json({ success: false, message: 'Catégorie et nom requis' });
        }

        const filePath = path.join(getMediaBasePath(), category, filename);

        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return res.json({ success: true, message: 'Image supprimée' });
            }
            res.status(404).json({ success: false, message: 'Fichier non trouvé' });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async listMedia(req, res) {
        const baseDir = getMediaBasePath();
        try {
            const categories = ['hero', 'about', 'actions', 'members', 'identity', 'solidarity', 'discover'];
            const result = {};

            for (const cat of categories) {
                const catDir = path.join(baseDir, cat);
                try {
                    if (fs.existsSync(catDir)) {
                        result[cat] = fs.readdirSync(catDir).filter(file => {
                            const ext = path.extname(file).toLowerCase();
                            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
                        });
                    } else {
                        result[cat] = [];
                    }
                } catch (e) {
                    result[cat] = [];
                }
            }

            res.json({ success: true, data: result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async publicListMedia(req, res) {
        const { category } = req.params;
        const baseDir = path.join(getMediaBasePath(), category);

        try {
            if (!fs.existsSync(baseDir)) {
                return res.json({ success: true, data: [] });
            }

            const files = fs.readdirSync(baseDir).filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
            });

            res.json({ success: true, data: files });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new MediaController();

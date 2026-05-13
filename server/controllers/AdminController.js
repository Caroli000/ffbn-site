const StatsService = require('../services/StatsService');
const ActionService = require('../services/ActionService');
const EventService = require('../services/EventService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

class AdminController {
    constructor() {
        this.statsService = new StatsService();
        this.actionService = new ActionService();
        this.eventService = new EventService();

        this.login = this.login.bind(this);
        this.getStatsRaw = this.getStatsRaw.bind(this);
        this.updateStat = this.updateStat.bind(this);
        this.createStat = this.createStat.bind(this);
        this.deleteStat = this.deleteStat.bind(this);
        this.getActions = this.getActions.bind(this);
        this.createAction = this.createAction.bind(this);
        this.updateAction = this.updateAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.getEvents = this.getEvents.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.logout = this.logout.bind(this);
        this.getMediaList = this.getMediaList.bind(this);
    }

async login(req, res) {
        const { username, password } = req.body;
        console.log(`[AUTH] Tentative de connexion pour : ${username}`);

        const ADMIN_USER = process.env.ADMIN_USER || 'admin';

        const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH
            || (process.env.ADMIN_PASS ? bcrypt.hashSync(process.env.ADMIN_PASS, 10) : bcrypt.hashSync('ffbn2024', 10));

        const passSource = process.env.ADMIN_PASS_HASH ? 'ADMIN_PASS_HASH' : (process.env.ADMIN_PASS ? 'ADMIN_PASS' : 'default');
        console.log(`[AUTH] Utilisation de la source de mot de passe admin: ${passSource}`);

        if (username === ADMIN_USER && bcrypt.compareSync(password, ADMIN_PASS_HASH)) {
            console.log(`[AUTH] Connexion réussie pour : ${username}`);

            const token = jwt.sign(
                { role: 'admin', username: ADMIN_USER },
                process.env.JWT_SECRET || 'ffbn_super_secret_key_2024_change_me_in_prod',
                { expiresIn: '2h' }
            );

res.cookie('admin_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 2 * 60 * 60 * 1000
            });

            const welcomeMessages = [
                'Bienvenue dans votre espace administrateur FFBN! Vous êtes prêt à gérer la plateforme avec excellence. ',
                'Content de vous revoir! L\'espace d\'administration est maintenant accessible. Bonne gestion! ',
                'Bonjour! Accès administrateur accordé. Gérez actions, événements et statistiques en toute confiance. ',
                'Succès! Vous êtes connecté. L\'espace FFBN est entre vos mains. Excellentes modifications! '
            ];
            const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

return res.json({
                success: true,
                message: welcomeMessage,
                token
            });
        }

        console.warn(`[AUTH] Échec de connexion pour : ${username}`);
        res.status(401).json({
            success: false,
            message: 'Identifiant ou mot de passe incorrect'
        });
    }

    async getStatsRaw(req, res) {
        try {
            const data = await this.statsService._readData();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateStat(req, res) {
        try {
            const { id } = req.params;
            const result = await this.statsService.update(id, req.body);
            res.json({ success: !!result, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createStat(req, res) {
        try {
            const result = await this.statsService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteStat(req, res) {
        try {
            const { id } = req.params;
            const success = await this.statsService.delete(id);
            res.json({ success });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getActions(req, res) {
        try {
            const data = await this.actionService.getAllRaw();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createAction(req, res) {
        try {
            const result = await this.actionService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateAction(req, res) {
        try {
            const { id } = req.params;
            const result = await this.actionService.update(id, req.body);
            res.json({ success: !!result, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteAction(req, res) {
        try {
            const { id } = req.params;
            const success = await this.actionService.delete(id);
            res.json({ success });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getEvents(req, res) {
        try {
            const data = await this.eventService.getAllRaw();
            res.json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async createEvent(req, res) {
        try {
            const result = await this.eventService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateEvent(req, res) {
        try {
            const { id } = req.params;
            const result = await this.eventService.update(id, req.body);
            res.json({ success: !!result, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteEvent(req, res) {
        try {
            const { id } = req.params;
            const success = await this.eventService.delete(id);
            res.json({ success });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getMediaList(req, res) {
        try {
            const categories = ['hero', 'about', 'actions', 'members', 'identity', 'solidarity'];
            const mediaData = {};

            categories.forEach(cat => {
                const catPath = path.join(__dirname, '../..', 'client/public/images', cat);
                try {
                    if (fs.existsSync(catPath)) {
                        const files = fs.readdirSync(catPath).filter(f =>
                            /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
                        );
                        mediaData[cat] = files;
                    } else {
                        mediaData[cat] = [];
                    }
                } catch (err) {
                    console.error(`Error reading ${cat} category:`, err);
                    mediaData[cat] = [];
                }
            });

            res.json({ success: true, data: mediaData });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

async logout(req, res) {
        res.clearCookie('admin_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.json({ success: true, message: 'Déconnecté' });
    }
}

module.exports = AdminController;

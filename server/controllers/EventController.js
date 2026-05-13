const EventService = require('../services/EventService');

class EventController {
    constructor() {
        this.service = new EventService();
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.getUpcoming = this.getUpcoming.bind(this);
    }

async getAll(req, res) {
        try {
            const lang = req.language || 'fr';
            const events = await this.service.getAll(lang);
            res.json({ success: true, data: events });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

async getUpcoming(req, res) {
        try {
            const lang = req.language || req.i18n?.language || 'fr';
            console.log(`[EventController] getUpcoming - lang: ${lang}, req.language: ${req.language}`);
            const events = await this.service.getUpcoming(lang);
            res.json({ success: true, data: events });
        } catch (err) {
            console.error('[EventController] getUpcoming Error:', err);
            res.status(500).json({ success: false, message: err.message });
        }
    }

async getById(req, res, next) {
        try {
            const lang = req.language || 'fr';
            const id = parseInt(req.params.id, 10);
            const event = await this.service.getById(id, lang);

            if (!event) {
                const error = new Error(req.t('errors.notFound'));
                error.statusCode = 404;
                return next(error);
            }

            res.json({ success: true, data: event });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = EventController;

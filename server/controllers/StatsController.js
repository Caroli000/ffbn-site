const StatsService = require('../services/StatsService');

class StatsController {
    constructor() {
        this.service = new StatsService();
        this.getAll = this.getAll.bind(this);
    }

async getAll(req, res) {
        try {
            const lang = req.language || 'fr';
            const stats = await this.service.getAll(lang);
            res.json({ success: true, data: stats });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = StatsController;

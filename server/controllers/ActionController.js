const ActionService = require('../services/ActionService');

class ActionController {
    constructor() {
        this.service = new ActionService();

        this.getAll = this.getAll.bind(this);
    }

async getAll(req, res) {
        try {
            const lang = req.language || 'fr';
            const actions = await this.service.getAll(lang);
            res.json({ success: true, data: actions });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = ActionController;

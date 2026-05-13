const { validationResult } = require('express-validator');
const ContactService = require('../services/ContactService');

class ContactController {
    constructor() {
        this.service = new ContactService();
        this.create = this.create.bind(this);
    }

async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: req.t('errors.validationError'),
                errors: errors.array(),
            });
        }

        try {
            const { name, email, message } = req.body;
            const contact = await this.service.create({ name, email, message });
            res.status(201).json({
                success: true,
                message: req.t('success.contactSent'),
                data: contact.toJSON(),
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ContactController;

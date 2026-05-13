const { validationResult } = require('express-validator');
const NewsletterService = require('../services/NewsletterService');

class NewsletterController {
    constructor() {
        this.service = new NewsletterService();
        this.subscribe = this.subscribe.bind(this);
    }

subscribe(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: req.t('errors.validationError'),
                errors: errors.array(),
            });
        }

        try {
            const { email } = req.body;
            const { subscriber, isNew } = this.service.subscribe(email);

            res.status(isNew ? 201 : 200).json({
                success: true,
                message: req.t('success.newsletterSubscribed'),
                data: subscriber.toJSON(),
                isNew,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NewsletterController;

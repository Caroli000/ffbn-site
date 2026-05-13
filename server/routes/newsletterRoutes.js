const { Router } = require('express');
const { body } = require('express-validator');
const NewsletterController = require('../controllers/NewsletterController');

const router = Router();
const controller = new NewsletterController();

router.post(
    '/',
    [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('L\'email est requis')
            .isEmail()
            .withMessage('Email invalide')
            .normalizeEmail(),
    ],
    controller.subscribe
);

module.exports = router;

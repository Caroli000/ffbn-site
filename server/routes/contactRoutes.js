const { Router } = require('express');
const { body } = require('express-validator');
const ContactController = require('../controllers/ContactController');

const router = Router();
const controller = new ContactController();

router.post(
    '/',
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Le nom est requis')
            .isLength({ min: 2, max: 100 })
            .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
        body('email')
            .trim()
            .notEmpty()
            .withMessage('L\'email est requis')
            .isEmail()
            .withMessage('Email invalide')
            .normalizeEmail(),
        body('message')
            .trim()
            .notEmpty()
            .withMessage('Le message est requis')
            .isLength({ min: 10, max: 2000 })
            .withMessage('Le message doit contenir entre 10 et 2000 caractères'),
    ],
    controller.create
);

module.exports = router;

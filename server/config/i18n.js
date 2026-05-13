const i18next = require('i18next');
const middleware = require('i18next-http-middleware');

const resources = {
    fr: {
        translation: {
            welcome: 'Bienvenue sur l\'API FFBN',
            errors: {
                notFound: 'Ressource non trouvée',
                serverError: 'Erreur interne du serveur',
                validationError: 'Erreur de validation',
                invalidEmail: 'Adresse email invalide',
                requiredField: 'Le champ {{field}} est requis',
            },
            success: {
                contactSent: 'Votre message a été envoyé avec succès',
                newsletterSubscribed: 'Inscription à la newsletter réussie',
            },
        },
    },
    en: {
        translation: {
            welcome: 'Welcome to FFBN API',
            errors: {
                notFound: 'Resource not found',
                serverError: 'Internal server error',
                validationError: 'Validation error',
                invalidEmail: 'Invalid email address',
                requiredField: 'Field {{field}} is required',
            },
            success: {
                contactSent: 'Your message has been sent successfully',
                newsletterSubscribed: 'Newsletter subscription successful',
            },
        },
    },
};

const initI18n = () => {
    i18next.use(middleware.LanguageDetector).init({
        resources,
        fallbackLng: process.env.DEFAULT_LANGUAGE || 'fr',
        preload: ['fr', 'en'],
        detection: {
            order: ['header', 'querystring'],
            lookupHeader: 'accept-language',
            lookupQuerystring: 'lng',
        },
    });

    return i18next;
};

module.exports = { initI18n, i18nextMiddleware: middleware };

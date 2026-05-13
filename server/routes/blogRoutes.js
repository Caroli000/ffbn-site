const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');

router.get('/', (req, res) => {
    console.log('[BlogRoute] GET /api/blog');
    BlogController.getArticles(req, res);
});

router.get('/categories', (req, res) => {
    console.log('[BlogRoute] GET /api/blog/categories');
    BlogController.getCategories(req, res);
});

router.get('/search', (req, res) => {
    console.log('[BlogRoute] GET /api/blog/search', req.query.q);
    BlogController.searchArticles(req, res);
});

router.get('/:slug', (req, res) => {
    console.log('[BlogRoute] GET /api/blog/:slug', req.params.slug);
    BlogController.getArticleBySlug(req, res);
});

router.get('/:slug/related/:limit?', (req, res) => {
    console.log('[BlogRoute] GET /api/blog/:slug/related');
    BlogController.getRelatedArticles(req, res);
});

module.exports = router;

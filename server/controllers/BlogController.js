const blogArticles = require('../data/blogArticles');

class BlogController {
    
    getArticles(req, res) {
        try {
            const { lng = 'fr', category = null, limit = null } = req.query;
            
            let articles = blogArticles.map(article => ({
                id: article.id,
                slug: article.slug,
                title: lng === 'en' ? article.titleEn : article.titleFr,
                metaDescription: article.metaDescription,
                author: article.author,
                date: article.date,
                category: article.category,
                image: article.image,
                readingTime: article.readingTime,
                keywords: article.keywords
            }));

            if (category) {
                articles = articles.filter(a => a.category === category);
            }

            if (limit) {
                articles = articles.slice(0, parseInt(limit));
            }

            articles.sort((a, b) => new Date(b.date) - new Date(a.date));

            res.status(200).json({
                success: true,
                total: articles.length,
                articles
            });
        } catch (err) {
            console.error('[BlogController] Error getting articles:', err);
            res.status(500).json({ error: 'Failed to fetch articles' });
        }
    }

getArticleBySlug(req, res) {
        try {
            const { slug } = req.params;
            const { lng = 'fr' } = req.query;
            
            const article = blogArticles.find(a => a.slug === slug);
            
            if (!article) {
                return res.status(404).json({ 
                    error: 'Article not found',
                    slug 
                });
            }

            res.status(200).json({
                success: true,
                article: {
                    ...article,
                    title: lng === 'en' ? article.titleEn : article.titleFr
                }
            });
        } catch (err) {
            console.error('[BlogController] Error getting article:', err);
            res.status(500).json({ error: 'Failed to fetch article' });
        }
    }

getCategories(req, res) {
        try {
            const categories = [...new Set(blogArticles.map(a => a.category))];
            res.status(200).json({
                success: true,
                categories
            });
        } catch (err) {
            console.error('[BlogController] Error getting categories:', err);
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }

searchArticles(req, res) {
        try {
            const { q, lng = 'fr' } = req.query;
            
            if (!q || q.length < 3) {
                return res.status(400).json({ 
                    error: 'Query must be at least 3 characters' 
                });
            }

            const results = blogArticles.filter(article => {
                const searchTerm = q.toLowerCase();
                const title = lng === 'en' ? article.titleEn : article.titleFr;
                return (
                    title.toLowerCase().includes(searchTerm) ||
                    article.content.toLowerCase().includes(searchTerm) ||
                    article.keywords.some(k => k.toLowerCase().includes(searchTerm))
                );
            });

            res.status(200).json({
                success: true,
                query: q,
                results: results.length,
                articles: results.map(a => ({
                    id: a.id,
                    slug: a.slug,
                    title: lng === 'en' ? a.titleEn : a.titleFr,
                    metaDescription: a.metaDescription,
                    readingTime: a.readingTime
                }))
            });
        } catch (err) {
            console.error('[BlogController] Error searching articles:', err);
            res.status(500).json({ error: 'Search failed' });
        }
    }

getRelatedArticles(req, res) {
        try {
            const { slug, limit = 3 } = req.params;
            const { lng = 'fr' } = req.query;
            
            const article = blogArticles.find(a => a.slug === slug);
            if (!article) {
                return res.status(404).json({ error: 'Article not found' });
            }

            const related = blogArticles
                .filter(a => 
                    a.id !== article.id && 
                    a.category === article.category
                )
                .slice(0, limit)
                .map(a => ({
                    slug: a.slug,
                    title: lng === 'en' ? a.titleEn : a.titleFr,
                    image: a.image,
                    readingTime: a.readingTime
                }));

            res.status(200).json({
                success: true,
                relatedArticles: related
            });
        } catch (err) {
            console.error('[BlogController] Error getting related articles:', err);
            res.status(500).json({ error: 'Failed to fetch related articles' });
        }
    }

createArticle(req, res) {

        res.status(501).json({ 
            message: 'Not yet implemented - requires MongoDB setup' 
        });
    }

updateArticle(req, res) {

        res.status(501).json({ 
            message: 'Not yet implemented - requires MongoDB setup' 
        });
    }

deleteArticle(req, res) {

        res.status(501).json({ 
            message: 'Not yet implemented - requires MongoDB setup' 
        });
    }
}

module.exports = new BlogController();

const APP_VERSION = '1.1.0';

function performanceHeaders(req, res, next) {
    if (req.method === 'GET') {
        if (req.url.includes('/api/stats') || req.url.includes('/api/actions') || req.url.includes('/api/events')) {
            // Utiliser une version stable pour l'ETag au lieu de Date.now() qui change tout le temps
            res.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
            res.set('ETag', `"${APP_VERSION}"`);
        } else if (req.url.includes('/admin/')) {
            res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
        }
    }

    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-DNS-Prefetch-Control', 'on');
    res.set('X-UA-Compatible', 'IE=edge');

    next();
}

function compactJsonResponse(req, res, next) {
    const startTime = Date.now();
    const originalJson = res.json.bind(res);

    res.json = function(data) {
        // Combiner compactage et logging de performance
        const compacted = compactObject(data);
        const jsonString = JSON.stringify(compacted);
        
        const duration = Date.now() - startTime;
        if (duration > 200) {
            console.log(`⚠️  [LENT] ${req.method} ${req.url} - ${duration}ms`);
        }

        res.set('Content-Type', 'application/json; charset=utf-8');
        res.set('X-Response-Time', `${duration}ms`);
        res.set('X-JSON-Size', `${jsonString.length} bytes`);

        return res.send(jsonString);
    };

    next();
}

function compactObject(obj) {
    if (Array.isArray(obj)) return obj.map(compactObject);
    if (obj === null || typeof obj !== 'object') return obj;

    const compacted = {};
    for (const [key, value] of Object.entries(obj)) {
        // Enlever les champs internes Mongoose et les données sensibles
        if (key === '__v' || key === 'password') continue;

        if (typeof value === 'object') {
            compacted[key] = compactObject(value);
        } else {
            compacted[key] = value;
        }
    }
    return compacted;
}

function performanceLogging(req, res, next) {
    // Déjà intégré dans compactJsonResponse pour éviter les doubles surcharges
    next();
}

module.exports = {
    performanceHeaders,
    compactJsonResponse,
    performanceLogging,
    compactObject
};

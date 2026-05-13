

const cache = new Map();

function initCache() {
    setInterval(() => {
        const now = Date.now();
        for (const [key, value] of cache.entries()) {
            if (value.expiresAt < now) {
                cache.delete(key);
            }
        }
    }, 60000);
}

function cacheMiddleware(ttlSeconds = 300) {
    return (req, res, next) => {

        if (req.method !== 'GET') {
            return next();
        }

        const cacheKey = `${req.originalUrl}`;
        const cachedResponse = cache.get(cacheKey);

        if (cachedResponse && cachedResponse.expiresAt > Date.now()) {
            res.set('X-Cache', 'HIT');
            res.set('Cache-Control', `public, max-age=${ttlSeconds}`);
            return res.json(cachedResponse.data);
        }

        const originalJson = res.json.bind(res);
        res.json = function(data) {

            if (res.statusCode === 200 && data && typeof data === 'object') {
                cache.set(cacheKey, {
                    data: data,
                    expiresAt: Date.now() + (ttlSeconds * 1000)
                });
                res.set('X-Cache', 'MISS');
            }
            res.set('Cache-Control', `public, max-age=${ttlSeconds}`);
            return originalJson(data);
        };

        next();
    };
}

function invalidateCache(pattern = null) {
    if (!pattern) {
        cache.clear();
        console.log('✓ Cache complètement vidé');
        return;
    }

    const regex = new RegExp(pattern);
    let count = 0;
    for (const key of cache.keys()) {
        if (regex.test(key)) {
            cache.delete(key);
            count++;
        }
    }
    console.log(`✓ ${count} entrées du cache invalidées`);
}

function invalidateCacheOnMutation(pattern) {
    return (req, res, next) => {
        const originalJson = res.json.bind(res);
        res.json = function(data) {

            if (res.statusCode < 400) {
                invalidateCache(pattern);
            }
            return originalJson(data);
        };
        next();
    };
}

module.exports = {
    cacheMiddleware,
    invalidateCache,
    invalidateCacheOnMutation,
    initCache
};

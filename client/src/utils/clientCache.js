

const CACHE_PREFIX = 'ffbn_cache_';
const DEFAULT_TTL = 300000;

class ClientCache {
    constructor() {
        this.memoryCache = new Map();
        this.ttlMap = new Map();
    }

createKey(method, url) {
        return `${CACHE_PREFIX}${method}:${url}`;
    }

get(method, url) {
        const key = this.createKey(method, url);

        if (this.memoryCache.has(key)) {
            const cached = this.memoryCache.get(key);
            if (Date.now() < cached.expiresAt) {
                return cached.data;
            } else {
                this.memoryCache.delete(key);
                this.ttlMap.delete(key);
            }
        }

        try {
            const stored = localStorage.getItem(key);
            if (stored) {
                const { data, expiresAt } = JSON.parse(stored);
                if (Date.now() < expiresAt) {

                    this.memoryCache.set(key, { data, expiresAt });
                    this.ttlMap.set(key, setTimeout(() => {
                        this.memoryCache.delete(key);
                        this.ttlMap.delete(key);
                    }, expiresAt - Date.now()));
                    return data;
                } else {
                    localStorage.removeItem(key);
                }
            }
        } catch (e) {
            console.warn('Cache localStorage error:', e);
        }

        return null;
    }

set(method, url, data, ttl = DEFAULT_TTL) {
        const key = this.createKey(method, url);
        const expiresAt = Date.now() + ttl;

        this.memoryCache.set(key, { data, expiresAt });

        if (this.ttlMap.has(key)) {
            clearTimeout(this.ttlMap.get(key));
        }

        this.ttlMap.set(key, setTimeout(() => {
            this.memoryCache.delete(key);
            this.ttlMap.delete(key);
        }, ttl));

        try {
            localStorage.setItem(key, JSON.stringify({ data, expiresAt }));
        } catch (e) {
            console.warn('Cache localStorage error:', e);
        }
    }

invalidate(pattern = null) {
        if (!pattern) {

            this.memoryCache.clear();
            this.ttlMap.forEach(timeout => clearTimeout(timeout));
            this.ttlMap.clear();

            try {
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith(CACHE_PREFIX)) {
                        localStorage.removeItem(key);
                    }
                });
            } catch (e) {
                console.warn('Cache invalidation error:', e);
            }

            return;
        }

        const regex = new RegExp(pattern);
        const keysToDelete = [];

        for (const [key] of this.memoryCache) {
            if (regex.test(key)) {
                keysToDelete.push(key);
            }
        }

        keysToDelete.forEach(key => {
            this.memoryCache.delete(key);
            if (this.ttlMap.has(key)) {
                clearTimeout(this.ttlMap.get(key));
                this.ttlMap.delete(key);
            }
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('Cache removal error:', e);
            }
        });
    }

getStats() {
        return {
            memoryEntries: this.memoryCache.size,
            localStorageEntries: Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX)).length
        };
    }
}

const clientCache = new ClientCache();

export default clientCache;

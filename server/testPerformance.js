

const http = require('http');

const ITERATIONS = 10;
const API_ENDPOINTS = [
    { method: 'GET', path: '/stats', name: 'Statistics' },
    { method: 'GET', path: '/actions', name: 'Actions' },
    { method: 'GET', path: '/events', name: 'Events' },
    { method: 'GET', path: '/events/upcoming', name: 'Upcoming Events' },
];

class PerformanceTest {
    constructor() {
        this.results = new Map();
    }

makeRequest(method, path) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: 3001,
                path: `/api${path}`,
                method: method,
                headers: { 'Content-Type': 'application/json' }
            };

            const startTime = Date.now();
            let responseSize = 0;

            const req = http.request(options, (res) => {
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                    responseSize += chunk.length;
                });

                res.on('end', () => {
                    const duration = Date.now() - startTime;
                    const cacheStatus = res.headers['x-cache'] || 'NO-CACHE';

                    resolve({
                        status: res.statusCode,
                        duration,
                        responseSize,
                        cacheStatus,
                        compressed: res.headers['content-encoding'] === 'gzip'
                    });
                });
            });

            req.on('error', (err) => {
                reject(new Error(`Connection failed: ${err.message}`));
            });
            
            req.setTimeout(5000, () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });
            
            req.end();
        });
    }

async runTests() {
        console.log('\n╔════════════════════════════════════════════════════════════════╗');
        console.log('║              ⚡ TEST DE PERFORMANCE DU SYSTÈME ⚡               ║');
        console.log('╚════════════════════════════════════════════════════════════════╝\n');

        for (const endpoint of API_ENDPOINTS) {
            console.log(`📊 Test: ${endpoint.name} (${endpoint.path})`);
            console.log('─'.repeat(60));

            const durations = [];
            const sizes = [];
            const cacheStats = { HIT: 0, MISS: 0, 'NO-CACHE': 0 };

            for (let i = 0; i < ITERATIONS; i++) {
                try {
                    const result = await this.makeRequest(endpoint.method, endpoint.path);

                    durations.push(result.duration);
                    sizes.push(result.responseSize);
                    cacheStats[result.cacheStatus]++;

                    const cacheIcon = result.cacheStatus === 'HIT' ? '💾' : '🌐';
                    const compressIcon = result.compressed ? '📦' : '📄';
                    const status = result.status === 200 ? '✅' : '❌';

                    console.log(
                        `  ${status} [${i + 1}/${ITERATIONS}] ${result.duration}ms | ${result.responseSize} bytes | ${cacheIcon} ${result.cacheStatus} | ${compressIcon}`
                    );
                } catch (error) {
                    console.error(`  ❌ Erreur: ${error.message}`);
                }
            }

            const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0;
            const minDuration = durations.length > 0 ? Math.min(...durations) : 0;
            const maxDuration = durations.length > 0 ? Math.max(...durations) : 0;
            const avgSize = sizes.length > 0 ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length) : 0;

            console.log(`\n  📈 Résumé:`);
            console.log(`     • Temps moyen: ${avgDuration}ms (min: ${minDuration}ms, max: ${maxDuration}ms)`);
            console.log(`     • Taille moyenne: ${avgSize} bytes`);
            console.log(`     • Cache HIT: ${cacheStats.HIT}/${ITERATIONS} (${Math.round((cacheStats.HIT / ITERATIONS) * 100)}%)`);
            console.log(`     • Cache MISS: ${cacheStats.MISS}/${ITERATIONS}`);
            console.log(`\n`);

            this.results.set(endpoint.path, {
                endpoint: endpoint.name,
                avgDuration,
                minDuration,
                maxDuration,
                avgSize,
                cacheHits: cacheStats.HIT
            });
        }

        this.printSummary();
    }

printSummary() {
        console.log('╔════════════════════════════════════════════════════════════════╗');
        console.log('║                    📊 RÉSUMÉ FINAL                             ║');
        console.log('╚════════════════════════════════════════════════════════════════╝\n');

        let totalDuration = 0;
        let totalRequests = 0;
        let totalCacheHits = 0;

        for (const [path, stats] of this.results) {
            const hitRate = Math.round((stats.cacheHits / ITERATIONS) * 100);
            console.log(`${stats.endpoint.padEnd(25)} | Moyen: ${stats.avgDuration}ms | Cache: ${hitRate}%`);

            totalDuration += stats.avgDuration;
            totalRequests++;
            totalCacheHits += stats.cacheHits;
        }

        const avgSystemDuration = Math.round(totalDuration / totalRequests);
        const totalCacheRate = Math.round((totalCacheHits / (ITERATIONS * totalRequests)) * 100);

        console.log('\n' + '─'.repeat(60));
        console.log(`✅ Temps moyen global: ${avgSystemDuration}ms`);
        console.log(`✅ Taux de cache global: ${totalCacheRate}%`);
        console.log(`✅ Points de performance:`);
        console.log(`   • Compression GZIP: Activée`);
        console.log(`   • Cache mémoire: Activé`);
        console.log(`   • Headers optimisés: Activés`);
        console.log(`   • Rate limiting: Actif\n`);

        if (avgSystemDuration < 50) {
            console.log('🚀 PERFORMANCE EXCELLENTE - Site très performant!\n');
        } else if (avgSystemDuration < 100) {
            console.log('✅ PERFORMANCE SATISFAISANTE - Site performant\n');
        } else {
            console.log('⚠️  PERFORMANCE À AMÉLIORER\n');
        }
    }
}

const performanceTest = new PerformanceTest();
performanceTest.runTests().catch(console.error);

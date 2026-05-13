#!/usr/bin/env node

const http = require('http');

console.log('🔍 VÉRIFICATION PRÉ-DÉPLOIEMENT FFBN\n');
console.log('=' .repeat(50));

const tests = [
  { path: '/api/events', name: 'Events API' },
  { path: '/api/actions', name: 'Actions API' },
  { path: '/api/stats', name: 'Stats API' },
  { path: '/api/health', name: 'Health Check' },
];

let passed = 0;
let failed = 0;

async function testAPI(path, name) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'GET',
      timeout: 3000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ ${name.padEnd(20)} → ${res.statusCode} OK`);
          passed++;
        } else {
          console.log(`⚠️ ${name.padEnd(20)} → ${res.statusCode} (expected 200)`);
          failed++;
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${name.padEnd(20)} → CONNECTION ERROR`);
      failed++;
      resolve();
    });

    req.on('timeout', () => {
      console.log(`⏱️ ${name.padEnd(20)} → TIMEOUT`);
      failed++;
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('\n📡 Testing API endpoints...\n');
  
  for (const test of tests) {
    await testAPI(test.path, test.name);
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 RÉSULTATS: ${passed} ✅ / ${failed} ❌\n`);

  if (failed === 0 && passed > 0) {
    console.log('🎉 SITE PRÊT POUR DÉPLOIEMENT!\n');
    console.log('Instructions:');
    console.log('1. Créer compte Hostinger');
    console.log('2. Upload le dossier /client/dist via FTP');
    console.log('3. Configurer serveur backend (VPS)');
    console.log('4. Pointer DNS vers Hostinger');
    console.log('5. Activez SSL/TLS (gratuit)');
    console.log('\nDocumentation: RAPPORT_HEBERGEMENT_FFBN.md\n');
  } else {
    console.log('⚠️  Vérifiez les erreurs avant de déployer\n');
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests();

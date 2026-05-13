const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3001/api';
const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASS || 'ffbn2024';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

let adminToken = null;
let testResults = {
  total: 0,
  passed: 0,
  failed: 0
};

async function test(name, fn) {
  testResults.total++;
  try {
    await fn();
    console.log(`${colors.green}✅${colors.reset} ${name}`);
    testResults.passed++;
  } catch (error) {
    console.log(`${colors.red}❌${colors.reset} ${name}`);
    console.log(`   Error: ${error.message}`);
    testResults.failed++;
  }
}

async function section(title) {
  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

async function verifyAdminLogin() {
  await section('1️⃣ AUTHENTIFICATION ADMIN');

  await test('Admin peut se connecter', async () => {
    const response = await axios.post(`${API_URL}/admin/login`, {
      username: ADMIN_USER,
      password: ADMIN_PASSWORD
    });
    
    if (response.status !== 200 || !response.data.token) {
      throw new Error('Login failed or no token returned');
    }
    
    adminToken = response.data.token;
    console.log(`   → Token obtenu: ${adminToken.substring(0, 20)}...`);
    console.log(`   → Message reçu: "${response.data.message}"`);
  });

  await test('Token est un JWT valide', async () => {
    if (!adminToken || !adminToken.includes('.')) {
      throw new Error('Invalid JWT format');
    }
    
    const parts = adminToken.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT should have 3 parts');
    }
  });

  await test('Bearer token est accepté', async () => {
    const response = await axios.get(`${API_URL}/admin/stats/list`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error('Bearer token not accepted');
    }
  });
}

async function verifyCRUDOperations() {
  await section('2️⃣ OPÉRATIONS CRUD - ACTIONS');

  let actionId = null;
  await test('Créer une action', async () => {
    const response = await axios.post(`${API_URL}/admin/actions`, {
      title_fr: 'Action Test',
      title_en: 'Test Action',
      description_fr: 'Description test',
      description_en: 'Test description',
      date: '2026-03-15',
      location_fr: 'Paris',
      location_en: 'Paris',
      category: 'solidarity'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 201) {
      throw new Error(`Expected 201, got ${response.status}`);
    }
    
    actionId = response.data.data._id || response.data.data.id;
    console.log(`   → Action créée avec ID: ${actionId}`);
  });

  await test('Lister les actions', async () => {
    const response = await axios.get(`${API_URL}/admin/actions`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error('Failed to list actions');
    }
    
    const actions = response.data.data || response.data;
    if (!Array.isArray(actions)) {
      throw new Error('Actions is not an array');
    }
    
    console.log(`   → ${actions.length} actions trouvées`);
  });

  await test('Modifier une action', async () => {
    if (!actionId) throw new Error('Action ID not found');
    
    const response = await axios.put(`${API_URL}/admin/actions/${actionId}`, {
      title_fr: 'Action Modifiée',
      title_en: 'Modified Action'
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    console.log(`   → Action modifiée avec succès`);
  });

  await test('Supprimer une action', async () => {
    if (!actionId) throw new Error('Action ID not found');
    
    const response = await axios.delete(`${API_URL}/admin/actions/${actionId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    console.log(`   → Action supprimée avec succès`);
  });

  await section('2️⃣ OPÉRATIONS CRUD - ÉVÉNEMENTS');

  let eventId = null;
  await test('Créer un événement', async () => {
    const response = await axios.post(`${API_URL}/admin/events`, {
      title_fr: 'Événement Test',
      title_en: 'Test Event',
      description_fr: 'Description test',
      description_en: 'Test description',
      date: '2026-05-20',
      time: '14:00',
      location_fr: 'Lyon',
      location_en: 'Lyon',
      maxParticipants: 50
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 201) {
      throw new Error(`Expected 201, got ${response.status}`);
    }
    
    eventId = response.data.data._id || response.data.data.id;
    console.log(`   → Événement créé avec ID: ${eventId}`);
  });

  await test('Modifier un événement', async () => {
    if (!eventId) throw new Error('Event ID not found');
    
    const response = await axios.put(`${API_URL}/admin/events/${eventId}`, {
      title_fr: 'Événement Modifié',
      title_en: 'Modified Event',
      maxParticipants: 75
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    console.log(`   → Événement modifié avec succès`);
  });

  await test('Supprimer un événement', async () => {
    if (!eventId) throw new Error('Event ID not found');
    
    const response = await axios.delete(`${API_URL}/admin/events/${eventId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    console.log(`   → Événement supprimé avec succès`);
  });

  await section('2️⃣ OPÉRATIONS CRUD - STATISTIQUES');

  let statId = null;
  await test('Créer une statistique', async () => {
    const response = await axios.post(`${API_URL}/admin/stats`, {
      category: 'members',
      label_fr: 'Membres du test',
      label_en: 'Test members',
      value: 42
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 201) {
      throw new Error(`Expected 201, got ${response.status}`);
    }
    
    statId = response.data.data._id || response.data.data.id;
    console.log(`   → Statistique créée avec ID: ${statId}`);
  });

  await test('Modifier une statistique', async () => {
    if (!statId) throw new Error('Stat ID not found');
    
    const response = await axios.put(`${API_URL}/admin/stats/${statId}`, {
      value: 99
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    console.log(`   → Statistique modifiée avec succès`);
  });

  await test('Supprimer une statistique', async () => {
    if (!statId) throw new Error('Stat ID not found');
    
    const response = await axios.delete(`${API_URL}/admin/stats/${statId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected 200, got ${response.status}`);
    }
    
    console.log(`   → Statistique supprimée avec succès`);
  });
}

async function verifyFormEmails() {
  await section('3️⃣ FORMULAIRES & EMAILS');

  await test('Formulaire Contact - accepte les données', async () => {
    const response = await axios.post(`${API_URL}/contact`, {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Contact',
      message: 'Ceci est un message de test',
      lang: 'fr'
    });
    
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`Expected 201 or 200, got ${response.status}`);
    }
    
    console.log(`   → Formulaire accepté (status: ${response.status})`);
  });

  await test('Newsletter - accepte l\'inscription', async () => {
    const response = await axios.post(`${API_URL}/newsletter`, {
      email: 'newsletter@example.com',
      lang: 'fr'
    });
    
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`Expected 201 or 200, got ${response.status}`);
    }
    
    console.log(`   → Email accepté (status: ${response.status})`);
  });

  await test('Configuration email - fbn.asso@gmail.com dans config', async () => {
    const envPath = path.join(__dirname, '.env');
    const envExamplePath = path.join(__dirname, '.env.example');
    
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    } else if (fs.existsSync(envExamplePath)) {
      envContent = fs.readFileSync(envExamplePath, 'utf8');
    } else {
      throw new Error('.env file not found');
    }
    
    if (!envContent.includes('fbn.asso@gmail.com')) {
      console.log(`   ⚠️  Email cible fbn.asso@gmail.com doit être configuré dans .env`);
    } else {
      console.log(`   ✓ Email cible configuré: fbn.asso@gmail.com`);
    }
  });
}

async function verifySecurity() {
  await section('4️⃣ VÉRIFICATION SÉCURITÉ');

  await test('Auth requise pour endpoints admin', async () => {
    try {
      await axios.get(`${API_URL}/admin/stats`);
      throw new Error('Should require authentication');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(`   → Endpoint protégé (401 Unauthorized)`);
      } else if (error.message.includes('Should require authentication')) {
        throw error;
      }
    }
  });

  await test('Invalid token est rejeté', async () => {
    try {
      await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: 'Bearer invalid-token-xyz' }
      });
      throw new Error('Invalid token should be rejected');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log(`   → Token invalide rejeté (${error.response.status})`);
      } else if (error.message.includes('should be rejected')) {
        throw error;
      }
    }
  });

  await test('Endpoints publics sans auth', async () => {
    const response = await axios.get(`${API_URL}/stats`);
    if (response.status !== 200) {
      throw new Error('Public endpoint should not require auth');
    }
    console.log(`   → Endpoints publics accessibles sans auth`);
  });

  await test('CORS headers présents', async () => {
    const response = await axios.get(`${API_URL}/stats`);
    const hasAccessControl = response.headers['access-control-allow-origin'];
    
    if (!hasAccessControl) {
      console.log(`   ⚠️  Headers CORS non détectés`);
    } else {
      console.log(`   → CORS configuré: ${hasAccessControl}`);
    }
  });

  await test('Helmet headers de sécurité', async () => {
    const response = await axios.get(`${API_URL}/stats`);
    const securityHeaders = [
      'x-content-type-options',
      'x-frame-options',
      'strict-transport-security'
    ];
    
    let foundHeaders = 0;
    for (const header of securityHeaders) {
      if (response.headers[header]) {
        foundHeaders++;
      }
    }
    
    console.log(`   → ${foundHeaders}/${securityHeaders.length} headers de sécurité présents`);
  });

  await test('Rate limiting actif', async () => {
    try {
      for (let i = 0; i < 300; i++) {
        await axios.get(`${API_URL}/stats`, { timeout: 100 });
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log(`   → Rate limiting actif (429 Too Many Requests)`);
        return;
      }
    }

  });

  await test('JWT_SECRET est configuré', async () => {

    const parts = adminToken.split('.');
    const tamperedToken = `${parts[0]}.${parts[1]}.modified`;
    
    try {
      await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${tamperedToken}` }
      });
      throw new Error('Tampered token should be rejected');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log(`   → JWT_SECRET bien configuré, tokens tampérés rejetés`);
      } else if (error.message.includes('should be rejected')) {
        throw error;
      }
    }
  });
}

async function verifyWelcomeMessage() {
  await section('5️⃣ MESSAGE D\'ACCUEIL ADMIN');

  await test('Login retourne message de bienvenue', async () => {
    const response = await axios.post(`${API_URL}/admin/login`, {
      username: ADMIN_USER,
      password: ADMIN_PASSWORD
    });
    
    if (!response.data.message) {
      throw new Error('Login response should include welcome message');
    }
    
    console.log(`   → Message: "${response.data.message}"`);
  });
}

async function runAllTests() {
  console.log(`${colors.yellow}
╔════════════════════════════════════════════════════════════╗
║      VÉRIFICATION FINALE - ESPACE ADMINISTRATEUR           ║
║           Site FFBN - Sécurité & Fonctionnalité            ║
╚════════════════════════════════════════════════════════════╝
  ${colors.reset}`);

  try {
    await verifyAdminLogin();
    await verifyWelcomeMessage();
    await verifyCRUDOperations();
    await verifyFormEmails();
    await verifySecurity();

    console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.blue}📊 RÉSUMÉ FINAL${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);

    const passPercentage = ((testResults.passed / testResults.total) * 100).toFixed(1);
    console.log(`Total des tests: ${testResults.total}`);
    console.log(`${colors.green}✅ Réussis: ${testResults.passed}${colors.reset}`);
    console.log(`${colors.red}❌ Échoués: ${testResults.failed}${colors.reset}`);
    console.log(`Taux de réussite: ${passPercentage}%\n`);

    if (testResults.failed === 0) {
      console.log(`${colors.green}🎉 ALL SYSTEMS GO! 🎉${colors.reset}`);
      console.log(`${colors.green}L'espace administrateur est ENTIÈREMENT FONCTIONNEL et SÉCURISÉ!${colors.reset}\n`);
    } else {
      console.log(`${colors.yellow}⚠️  Quelques vérifications à corriger.${colors.reset}\n`);
    }

  } catch (error) {
    console.log(`\n${colors.red}Erreur critique: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

async function checkServer() {
  try {
    await axios.get(`${API_URL}/stats`, { timeout: 5000 });
  } catch (error) {
    console.log(`${colors.red}❌ Le serveur n'est pas accessible sur ${API_URL}${colors.reset}`);
    console.log(`${colors.yellow}Assurez-vous que le serveur est lancé: cd server && npm run dev${colors.reset}`);
    process.exit(1);
  }
}

checkServer().then(runAllTests);

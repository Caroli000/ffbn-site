
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function check(condition, message) {
  if (condition) {
    console.log(`[OK] ${message}`);
    return true;
  } else {
    console.log(`[FAIL] ${message}`);
    return false;
  }
}

function fileExists(filePath, description) {
  const exists = fs.existsSync(filePath);
  return check(exists, `${description}: ${path.basename(filePath)}`);
}

async function verifyStructure() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║     FINAL SYSTEM VERIFICATION - STRUCTURE      ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  let totalChecks = 0;
  let passedChecks = 0;

  console.log('--- Configuration Files ---');
  console.log('─'.repeat(50));

  const checks = [
    { file: 'c:\\Users\\user\\Documents\\Asso\\.gitignore', desc: 'Git ignore' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\.env', desc: '.env file (admin)' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\.env.example', desc: '.env.example' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\README.md', desc: 'README' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\CHANGELOG.md', desc: 'CHANGELOG' },
  ];

  for (const { file, desc } of checks) {
    totalChecks++;
    if (fileExists(file, desc)) passedChecks++;
  }

  console.log();

  console.log(`\n--- Backend Structure ---`);
  console.log('─'.repeat(50));

  const backendStructure = [
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\server.js', desc: 'Main server' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\package.json', desc: 'Package.json' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\config\\db.js', desc: 'DB config' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\config\\i18n.js', desc: 'i18n config' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\controllers\\AdminController.js', desc: 'Admin controller' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\controllers\\EventController.js', desc: 'Event controller' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\middlewares\\authMiddleware.js', desc: 'Auth middleware' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\routes\\eventRoutes.js', desc: 'Event routes' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\services\\EventService.js', desc: 'Event service' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\data\\events.json', desc: 'Events data' },
  ];

  for (const { file, desc } of backendStructure) {
    totalChecks++;
    if (fileExists(file, desc)) passedChecks++;
  }

  console.log();

  console.log(`\n--- Frontend Structure ---`);
  console.log('─'.repeat(50));

  const frontendStructure = [
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\package.json', desc: 'Package.json' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\vite.config.js', desc: 'Vite config' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\main.js', desc: 'Main entry' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\App.vue', desc: 'App component' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\router\\index.js', desc: 'Router config' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\i18n\\index.js', desc: 'i18n config' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\i18n\\locales\\fr.json', desc: 'French translations' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\i18n\\locales\\en.json', desc: 'English translations' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\views\\HomeView.vue', desc: 'Home page' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\views\\AdminDashboard.vue', desc: 'Admin dashboard' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\components\\EventsSection.vue', desc: 'Events component' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\client\\src\\composables\\useApi.js', desc: 'useApi hook' },
  ];

  for (const { file, desc } of frontendStructure) {
    totalChecks++;
    if (fileExists(file, desc)) passedChecks++;
  }

  console.log();

  console.log(`\n--- Feature Verification ---`);
  console.log('─'.repeat(50));

  totalChecks++;
  try {
    const eventControllerCode = fs.readFileSync('c:\\Users\\user\\Documents\\Asso\\server\\controllers\\EventController.js', 'utf8');
    if (eventControllerCode.includes('async getUpcoming')) {
      console.log(`[OK] EventController has async methods`);
      passedChecks++;
    } else {
      console.log(`[FAIL] EventController missing async methods`);
    }
  } catch (e) {
    console.log(`[FAIL] Cannot check EventController`);
  }

  totalChecks++;
  try {
    const adminControllerCode = fs.readFileSync('c:\\Users\\user\\Documents\\Asso\\server\\controllers\\AdminController.js', 'utf8');
    if (adminControllerCode.includes('getMediaList')) {
      console.log(`[OK] AdminController has media methods`);
      passedChecks++;
    } else {
      console.log(`[FAIL] AdminController missing media methods`);
    }
  } catch (e) {
    console.log(`[FAIL] Cannot check AdminController`);
  }

  totalChecks++;
  try {
    const authCode = fs.readFileSync('c:\\Users\\user\\Documents\\Asso\\server\\middlewares\\authMiddleware.js', 'utf8');
    if (authCode.includes('checkAdmin') && authCode.includes('jwt.verify')) {
      console.log(`[OK] Auth middleware with JWT verification`);
      passedChecks++;
    } else {
      console.log(`[FAIL] Auth middleware incomplete`);
    }
  } catch (e) {
    console.log(`[FAIL] Cannot check auth middleware`);
  }

  totalChecks++;
  try {
    const viteCode = fs.readFileSync('c:\\Users\\user\\Documents\\Asso\\client\\vite.config.js', 'utf8');
    if (viteCode.includes('/api') && viteCode.includes('onProxyReq')) {
      console.log(`[OK] Vite proxy configured with header forwarding`);
      passedChecks++;
    } else {
      console.log(`[FAIL] Vite proxy incomplete`);
    }
  } catch (e) {
    console.log(`[FAIL] Cannot check Vite config`);
  }

  totalChecks++;
  try {
    const eventServiceCode = fs.readFileSync('c:\\Users\\user\\Documents\\Asso\\server\\services\\EventService.js', 'utf8');
    if (eventServiceCode.includes('readyState') && eventServiceCode.includes('events.json')) {
      console.log(`[OK] Services have JSON fallback for MongoDB`);
      passedChecks++;
    } else {
      console.log(`[FAIL] Services missing JSON fallback`);
    }
  } catch (e) {
    console.log(`[FAIL] Cannot check event service`);
  }

  console.log();

  console.log(`\n--- Verification Test Files ---`);
  console.log('─'.repeat(50));

  const testFiles = [
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\verifySystem.js', desc: 'System verification test' },
    { file: 'c:\\Users\\user\\Documents\\Asso\\server\\verifyForms.js', desc: 'Forms verification test' },
  ];

  for (const { file, desc } of testFiles) {
    totalChecks++;
    if (fileExists(file, desc)) passedChecks++;
  }

  console.log();

  console.log('─'.repeat(50));
  const percentage = Math.round((passedChecks / totalChecks) * 100);
  const status = percentage === 100 ? 'READY FOR GITHUB' : 'REVIEW NEEDED';
  
  console.log(`\nFinal Results: ${passedChecks}/${totalChecks} checks passed (${percentage}%)`);
  console.log(`Status: ${status}\n`);

  if (percentage === 100) {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║    SYSTEM VERIFICATION COMPLETE              ║');
    console.log('║    Ready for GitHub publication!             ║');
    console.log('╚════════════════════════════════════════════════╝\n');
  }
}

verifyStructure().catch(console.error);

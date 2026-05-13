#!/usr/bin/env node

/**
 * 🚀 START.JS - Démarrage complet du projet
 * Lance le serveur backend + client frontend simultanément
 */

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const isWindows = os.platform() === 'win32';

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║              🚀 Démarrage du Projet FFBN                      ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Chemins
const serverPath = path.join(__dirname, 'server');
const clientPath = path.join(__dirname, 'client');

// Processes
let serverProcess = null;
let clientProcess = null;

/**
 * Lancer le serveur
 */
function startServer() {
  console.log('📌 Démarrage du serveur (port 3001)...');
  
  const cmd = isWindows ? 'npm.cmd' : 'npm';
  serverProcess = spawn(cmd, ['run', 'dev'], {
    cwd: serverPath,
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('error', (err) => {
    console.error('❌ Erreur serveur:', err);
  });

  serverProcess.on('exit', (code) => {
    console.log(`\n⚠️  Serveur arrêté (code: ${code})`);
  });
}

/**
 * Lancer le client après le serveur
 */
function startClient() {
  setTimeout(() => {
    console.log('\n📱 Démarrage du client (port 5173)...');
    
    const cmd = isWindows ? 'npm.cmd' : 'npm';
    clientProcess = spawn(cmd, ['run', 'dev'], {
      cwd: clientPath,
      stdio: 'inherit',
      shell: true
    });

    clientProcess.on('error', (err) => {
      console.error('❌ Erreur client:', err);
    });

    clientProcess.on('exit', (code) => {
      console.log(`\n⚠️  Client arrêté (code: ${code})`);
    });
  }, 3000); // Attendre 3s que le serveur démarre
}

/**
 * Cleanup on exit
 */
process.on('SIGINT', () => {
  console.log('\n\n🛑 Arrêt du projet...');
  
  if (serverProcess) {
    console.log('   → Arrêt du serveur...');
    serverProcess.kill();
  }
  
  if (clientProcess) {
    console.log('   → Arrêt du client...');
    clientProcess.kill();
  }
  
  setTimeout(() => {
    console.log('✅ Projet arrêté\n');
    process.exit(0);
  }, 1000);
});

/**
 * Afficher les instructions
 */
function printInstructions() {
  console.log('✅ Server:    http://localhost:3001');
  console.log('✅ Client:    http://localhost:5173');
  console.log('✅ API:       http://localhost:5173/api\n');
  console.log('ℹ️  Appuyez sur Ctrl+C pour arrêter\n');
}

// Démarrer
startServer();
startClient();

setTimeout(printInstructions, 5000);

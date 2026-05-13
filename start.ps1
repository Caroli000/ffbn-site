# 🚀 START.PS1 - Démarrage complet du projet (Windows)
# Lance le serveur backend + client frontend dans des fenêtres séparées

Write-Host @"

╔════════════════════════════════════════════════════════════════╗
║              🚀 Démarrage du Projet FFBN                      ║
╚════════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

$serverPath = Join-Path $PSScriptRoot "server"
$clientPath = Join-Path $PSScriptRoot "client"

# Démarrer le serveur dans une nouvelle fenêtre
Write-Host "📌 Démarrage du serveur (port 3001)..." -ForegroundColor Yellow
$serverScript = @"
cd "$serverPath"
npm run dev
"@

# Démarrer le client dans une nouvelle fenêtre
Write-Host "📱 Démarrage du client (port 5173)..." -ForegroundColor Yellow
$clientScript = @"
cd "$clientPath"
npm run dev
"@

# Créer les fichiers temporaires
$serverBat = [System.IO.Path]::GetTempPath() + "ffbn_server_$([System.Guid]::NewGuid()).bat"
$clientBat = [System.IO.Path]::GetTempPath() + "ffbn_client_$([System.Guid]::NewGuid()).bat"

# Convertir les scripts PowerShell en batch
@"
@echo off
cd "$serverPath"
npm run dev
pause
"@ | Out-File -Encoding ASCII -FilePath $serverBat

@"
@echo off
cd "$clientPath"
npm run dev
pause
"@ | Out-File -Encoding ASCII -FilePath $clientBat

# Lancer les processus
Start-Process $serverBat
Start-Process $clientBat

Write-Host @"

✅ Server:    http://localhost:3001
✅ Client:    http://localhost:5173
✅ API:       http://localhost:5173/api

ℹ️  Les deux fenêtres sont lancées. Fermez-les pour arrêter.

"@ -ForegroundColor Green

# Cleanup
Read-Host "Appuyez sur Entrée pour quitter..."
Remove-Item -Force $serverBat -ErrorAction SilentlyContinue
Remove-Item -Force $clientBat -ErrorAction SilentlyContinue

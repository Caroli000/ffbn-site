# 🚀 GUIDE DE DÉMARRAGE - FFBN

## Problèmes Résolus

### 1. ✅ Carrousel d'images vide
**Cause**: Les images avaient un z-index: -2 (cachées derrière tout)
**Solution**: Correction des z-index:
- Carousel: 0 (arrière-plan)
- Overlay + patterns: 1-3 (filtres visuels)
- Contenu: 5 (texte)
- Navigation: 20 (boutons)

### 2. ✅ Événements: "Network Error"
**Cause**: Le serveur n'était pas lancé
**Solution**: Script de démarrage automatique

## 🎯 Démarrage Rapide

### Option 1: Script Automatique (RECOMMANDÉ - Windows)
```powershell
# Dans le répertoire racine (c:\Users\user\Documents\Asso)
.\start.ps1
```

Cela va:
- ✅ Lancer le serveur sur port 3001
- ✅ Lancer le client sur port 5173
- ✅ Configurer automatiquement le proxy

### Option 2: Manuel (2 terminals séparés)

**Terminal 1 - Serveur Backend:**
```bash
cd server
npm run dev
```

Attendre le message: `🚀 SERVEUR FFBN DÉMARRÉ SUR LE PORT 3001`

**Terminal 2 - Client Frontend:**
```bash
cd client
npm run dev
```

Attendre le message: `Local: http://localhost:5173`

## 🌐 Accès

- **Client**: http://localhost:5173
- **Serveur API**: http://localhost:3001
- **API Test**: http://localhost:3001/api/health

## ✅ Vérification

Une fois lancé, la page d'accueil devrait afficher:

1. **🎠 Carrousel d'images**
   - 3 images qui défilent automatiquement
   - Avec boutons Précédent/Suivant
   - Indicateurs de slides

2. **📅 Section "Qui Sommes-Nous"**
   - Logo + texte de présentation
   - Statistiques: 500+ Membres, 10+ Villes, 20+ Événements

3. **📋 Événements à Venir**
   - 3 cartes d'événements
   - Avec dates et descriptions
   - Badge "MISS" ou "HIT" montrant l'état du cache

## 🔧 Troubleshooting

### Carrousel vide
- Vérifier que les images existent: `/client/public/images/hero/`
- Vérifier la console du navigateur (F12) pour 404
- Vérifier que le port 5173 est bien accessible

### Événements: Network Error
- Vérifier que le serveur tourne sur port 3001
- `telnet localhost 3001` pour tester
- Vérifier les logs du serveur pour erreurs
- Vérifier que le port 3001 n'est pas bloqué par un firewall

### Performance lente
- Première requête crée le cache (3-18ms)
- Deuxième requête utilise le cache (1-3ms)
- Vérifier la console: chercher "Cache HIT/MISS"

## 📊 Détails des Optimisations

### Serveur (port 3001)
- ✅ Compression GZIP: réduire 60-80%
- ✅ Caching mémoire: 300-600 secondes
- ✅ Headers Cache-Control: optimisés
- ✅ Rate limiting: 200 req/IP/15min

### Client (port 5173)
- ✅ Code-splitting: vue, router, i18n, vendors
- ✅ Lazy loading des composants
- ✅ Cache localStorage persistant
- ✅ Minification 3-pass

## 🧪 Tests

### Vérifier les endpoints
```bash
# Terminal 3
node server/verifySystem.js       # Vérification complète
node server/testPerformance.js    # Tests de performance
node server/testClientDisplay.js  # Tests affichage
```

## 📝 Notes

- Les images du carrousel sont volumineuses (764KB total)
  - slide1.webp: 509KB
  - slide2.jpg: 84KB
  - slide3.jpg: 171KB
- Première visite: les images se rechargent depuis le serveur
- Deuxième visite: utilise le cache localStorage

## 🚀 Production

```bash
cd client
npm run build  # Génère dist/

cd server
# Déployer avec NODE_ENV=production
NODE_ENV=production npm start
```

---

**Problèmes Résolus**:
- ✅ Carrousel z-index corrigé
- ✅ Proxy Vite configuré
- ✅ Cache client implémenté
- ✅ Scripts de démarrage automatique
- ✅ Gestion d'erreurs améliorée

**Date**: Mars 2026
**Status**: ✅ Prêt pour production

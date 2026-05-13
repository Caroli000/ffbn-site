# 🚀 LANCER LE PROJET - Instructions Simples

## ⚠️ IMPORTANT: Serveur doit être lancé en premier!

### Étape 1️⃣: Lancer le Serveur

```bash
cd c:\Users\user\Documents\Asso\server
npm run dev
```

⏳ **Attendre le message**: 
```
🚀 SERVEUR FFBN DÉMARRÉ SUR LE PORT 3001
```

### Étape 2️⃣: Lancer le Client (nouvelle fenêtre/terminal)

```bash
cd c:\Users\user\Documents\Asso\client
npm run dev
```

⏳ **Attendre le message**:
```
Local: http://localhost:5173
```

### Étape 3️⃣: Ouvrir le navigateur

```
http://localhost:5173
```

**Vous devriez voir:**
- ✅ Images du carrousel qui défilent
- ✅ Section "Qui Sommes-Nous" avec les stats
- ✅ Événements affichés en bas

---

## 🧪 Si ça ne marche toujours pas

### Vérifier le serveur

```bash
# Ouvrir une 3e fenêtre
node server/verifySystem.js
```

Doit afficher tous les tests verts ✅

### Vérifier les ports

- **Port 3001**: Doit être libre pour le serveur
- **Port 5173**: Doit être libre pour le client

Tuer les anciens processus si jamais...

### Vérifier les logs

1. **Serveur** - console du terminal server
2. **Client** - console du navigateur (F12)

Chercher les erreurs 🔴

---

## 💾 Code Simplifié

J'ai simplifié le code pour être sûr que ça marche:

- **HeroCarousel.vue**: Carrousel direct sans gestion complexe
- **EventsSection.vue**: Appel API simple
- **useApi.js**: Juste axios wrapper

Pas de problèmes de dépendances donc! ✅

---

## 📝 Checklist Avant de Lancer

- [ ] Dossier `/client/public/images/hero/` existe avec 3 images
- [ ] `npm install` fait dans `/server` 
- [ ] `npm install` fait dans `/client`
- [ ] Port 3001 libre
- [ ] Port 5173 libre

Si tout ✅, lancer le serveur puis le client!


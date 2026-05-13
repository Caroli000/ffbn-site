# 🌐 RAPPORT D'HÉBERGEMENT - FFBN

**Date:** 28 Février 2026  
**Site:** Association FFBN (Filles et Fils du Burundi dans le Nord)  
**Type:** Vue 3 + Express.js + MongoDB (fallback JSON)

---

## 📋 RECOMMANDATIONS D'HÉBERGEMENT

### 1. **HOSTINGER (Recommandé pour FFBN) ⭐⭐⭐⭐⭐**

#### Architecture Recommandée

```
Frontend (Vue 3 + Vite)
└─ Hostinger Premium Shared Hosting
   - Node.js support
   - SSL/TLS gratuit (Let's Encrypt)
   - 50GB SSD storage
   
Backend (Express.js)
└─ Hostinger Node.js Hosting (à part)
   - 2 vCPU
   - 2GB RAM
   - Staging gratuit

Base de Données
└─ MongoDB Atlas (Cloud - Gratuit pour petite utilisation)
   - 512MB stockage
   - 10k connexions simultanés
```

#### TARIFICATION HOSTINGER (2026)

| Plan | CPU | RAM | Stockage | Bande | Prix/Mois | Annuel |
|------|-----|-----|----------|-------|-----------|--------|
| **Partagé Basic** | Partagé | - | 50GB | Illimitée | 2,99€ | 35,88€ |
| **Partagé Plus** | Partagé | - | 100GB | Illimitée | 4,99€ | 59,88€ |
| **VPS Starter** | 1 vCPU | 2GB | 50GB SSD | 1TB | 11,99€ | 143,88€ |
| **VPS Pro** | 2 vCPU | 4GB | 100GB SSD | 2TB | 19,99€ | 239,88€ |
| **Node.js Cloud** | 2 vCPU | 2GB | 20GB | 1TB | 7,99€ | 95,88€ |

#### CONFIGURATION OPTIMALE POUR FFBN

**Option A: Budget Minimaliste (≈20€/mois)**
- Hostinger Shared Hosting Plus: 4,99€/mois
- MongoDB Atlas Cloud: Gratuit (5GB)
- CDN Cloudflare: Gratuit
- **Total: ~5€/mois**

**Option B: Production Stable (≈45€/mois)** ✅ **RECOMMANDÉ**
- Hostinger VPS Starter: 11,99€/mois (Node.js backend)
- Hostinger Shared Hosting Plus: 4,99€/mois (Frontend)
- MongoDB Atlas Scale: 9€/mois (Upgrade + backups)
- Cloudflare Pro: 20€/mois (Protection DDoS)
- **Total: ~45€/mois**

**Option C: Grand Public (≈100€/mois)**
- Hostinger VPS Pro: 19,99€/mois
- MongoDB Atlas M2: 57€/mois
- Cloudflare Business: 200€/mois
- Monitoring & Logs: 10€/mois
- **Total: ~100€/mois**

---

## 🔧 SETUP HOSTINGER POUR FFBN

### Étape 1: Inscription Hostinger

1. Accéder à [hostinger.fr](https://hostinger.fr)
2. Cliquer "Hébergement Web" > "Vue 3 / Node.js"
3. Choisir **Plan Plus** (100GB)
4. Domaine: `ffbn.fr` ou `ffbn-association.fr` (~10€/an)
5. Finaliser l'achat

### Étape 2: Configuration Frontend (Vue 3)

```bash
# 1. Via Hostinger hPanel
- Applications > Node.js
- Créer nouvelle app
- Runtime: Node.js 18+
- Port: 5173 (ou 3000)

# 2. Builder le projet
cd client
npm run build

# 3. Upload sur Hostinger
- FTP/SFTP vers /public_html/
- OU Git integration disponible
```

### Étape 3: Configuration Backend (Express)

```bash
# 1. VPS Node.js ou Dedicated Server
- Hostinger > VPS Starter
- Installer Node.js 18+
- Installer MongoDB Community

# 2. Upload projet backend
git clone https://github.com/votre-username/ffbn-server.git
cd ffbn-server
npm install
npm start

# 3. Configurer PM2 (Keep-alive)
npm install -g pm2
pm2 start server.js --name "ffbn-api"
pm2 startup
pm2 save
```

### Étape 4: Configuration Base de Données

#### Option A: MongoDB Atlas (Recommandé - Cloud)

```bash
1. Aller sur https://www.mongodb.com/cloud/atlas
2. Créer compte gratuit
3. Cluster M0 Free: 512MB
4. Whitelist IP Hostinger
5. Copier CONNECTION STRING:
   mongodb+srv://username:password@cluster.mongodb.net/ffbn
```

#### Option B: MongoDB Local (Hostinger VPS)

```bash
apt-get update
apt-get install -y mongodb-server
systemctl start mongod
systemctl enable mongod
```

### Étape 5: Variables d'Environnement

**Créer `.env.production` sur le serveur:**

```bash
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ffbn
JWT_SECRET=votre_secret_très_complexe_64chars
SMTP_USER=fbn.asso@gmail.com
SMTP_PASS=votre_mot_passe_app_google
SMTP_HOST=smtp.gmail.com
REACT_APP_API_URL=https://api.ffbn.fr
CORS_ORIGIN=https://ffbn.fr
```

### Étape 6: SSL/HTTPS (Gratuit)

```bash
# Hostinger inclut Let's Encrypt
# Auto-renouvelé tous les 90 jours
# Configurer dans Hostinger hPanel:
- Domaines > ffbn.fr
- SSL/TLS > Activer
```

---

## 🚀 DÉPLOIEMENT AVEC HOSTINGER

### Via Git (Recommandé)

```bash
# 1. Initialiser repo Git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/ffbn.git
git push -u origin main

# 2. SSH sur Hostinger
ssh root@votre_ip_hostinger

# 3. Cloner & déployer
cd /home/ffbn-app
git clone https://github.com/votre-username/ffbn.git .
npm install
npm run build
pm2 restart all
```

### Workflow CI/CD Simple

```bash
# Installer GitHub Actions
# Fichier: .github/workflows/deploy.yml

name: Deploy to Hostinger
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Hostinger
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/ffbn-app
            git pull origin main
            npm install
            npm run build
            pm2 restart all
```

---

## 🎯 CHECKLIST PRÉ-PRODUCTION

### Sécurité ✅
- [ ] HTTPS/SSL activé partout
- [ ] Headers de sécurité (Helmet.js)
- [ ] CORS configuré
- [ ] Rate limiting activé
- [ ] Validation input validée
- [ ] Secrets NOT dans Git
- [ ] Backups automatiques
- [ ] Monitoring DDoS (Cloudflare)

### Performance ✅
- [ ] Images optimisées (WebP)
- [ ] Caching headers configurés
- [ ] Gzip compression activé
- [ ] CDN Cloudflare mis en place
- [ ] Database indexée
- [ ] Monitoring uptime
- [ ] Load testing effectué

### Maintenance ✅
- [ ] Logs centralisés
- [ ] Alertes d'erreur (Sentry)
- [ ] Backups quotidiens
- [ ] Documentation déploiement
- [ ] Scripts de rollback
- [ ] Update policy pour dépendances
- [ ] Monitoring performance

---

## 💰 BUDGET ANNUEL ESTIMÉ

### Small (Startup)
```
Hostinger Shared: 60€/an
Domaine .fr: 10€/an
MongoDB Atlas: 0€/an (Free)
Cloudflare: 0€/an (Free)
─────────────────────
TOTAL: 70€/an (~6€/mois)
```

### Medium (Production) ⭐ Recommandé
```
Hostinger VPS: 144€/an (11.99€/mois)
Hostinger Shared: 60€/an
Domaine Premium: 20€/an
MongoDB Atlas: 108€/an (~9€/mois)
Cloudflare Pro: 240€/an (20€/mois)
─────────────────────
TOTAL: 572€/an (~48€/mois)
```

### Large (Enterprise)
```
Hostinger Dedicated: 500€/an
MongoDB Atlas M2: 684€/an
Cloudflare Business: 2400€/an
Support 24/7: 300€/an
─────────────────────
TOTAL: 3884€/an (~324€/mois)
```

---

## 📈 MONITORING & MAINTENANCE

### Outils Recommandés (GRATUIT/PAYANT)

| Outil | Fonction | Coût |
|-------|----------|------|
| **Uptime Robot** | Monitoring 24/7 | Gratuit |
| **Sentry** | Error tracking | $29/mois |
| **Datadog** | Logs & Analytics | $15/mois |
| **New Relic** | APM | Gratuit (basic) |
| **CloudFlare** | CDN & DDoS | Gratuit |

### Commandes SSH Essentielles

```bash
# Vérifier uptime serveur
uptime

# Vérifier utilisation disk
df -h

# Vérifier utilisation RAM
free -m

# Logs application
pm2 logs ffbn-api

# Restart application
pm2 restart ffbn-api

# Restarts auto-redémarrage
pm2 startup
pm2 save
```

---

## ✨ CONSEILS PARTICULIERS POUR HOSTINGER

### 1. **Utiliser cPanel (Hostinger)**
- Interface simple et puissante
- File Manager intégré
- Task Scheduler pour backups
- Redirects/Forwarding domaines

### 2. **Git Integration**
- Hostinger supporte Git natively
- Déploiement = `git push`
- Webhooks disponibles

### 3. **Node.js Hosting**
- Hostinger a optimisé pour Node.js
- Auto-restart sur crash
- Environment variables gérées via UI

### 4. **Support Technique**
- Chat 24/7 en français
- Email support
- Knowledge base riche
- Communauté active

### 5. **Restrictions à Connaître**
- ⚠️ Pas de WebSocket sur Shared
- ⚠️ Max 300s timeout (upgrade VPS)
- ⚠️ Max 256MB RAM par script (VPS+)
- ✅ Solution: Utiliser VPS pour WebSocket

---

## 🎯 TIMELINE RECOMMANDÉ

### Semaine 1: Setup
- [ ] Achat Hostinger + Domaine
- [ ] Configuration DNS
- [ ] SSL activation

### Semaine 2: Déploiement
- [ ] Frontend déployé
- [ ] Backend déployé
- [ ] MongoDB connectée

### Semaine 3: Optimisation
- [ ] CDN Cloudflare
- [ ] Monitoring Sentry
- [ ] Backups automatiques

### Semaine 4: Go-Live
- [ ] Tests finaux
- [ ] Documentation mise à jour
- [ ] Lancement public

---

## 🚨 RÉSUMÉ EXÉCUTIF

**Pour FFBN, je recommande:**

✅ **Hostinger VPS Starter** (11,99€/mois)
✅ **MongoDB Atlas** (9€/mois - gratuit au départ)
✅ **Cloudflare Pro** (20€/mois)
✅ **Domaine .fr** (10€/an)

**Total: ~50€/mois (~600€/an)**

**Avantages Hostinger:**
- Support français 24/7
- Interface simple (cPanel)
- Node.js optimisé
- Performance stable
- Certificat SSL gratuit
- Backups inclus
- Migration gratuite (incluse)

**Alternative si budget très limité:**
- **Vercel** (Frontend gratuit)
- **Railway.app** (Backend $5/mois)
- **MongoDB Atlas** (Gratuit)
- **Total: ~5-10€/mois**

---

**🎓 En tant qu'expert, Hostinger est parfait pour une association comme FFBN. C'est le meilleur rapport qualité-prix pour la France.**

---

**Document créé:** 28 Février 2026  
**Dernière mise à jour:** Production-Ready

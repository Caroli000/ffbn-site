# FFBN - Fédération des Étudiants Burundais

Site web et système d'administration pour la Fédération des Étudiants Burundais de France.

## 🌟 Fonctionnalités

### Frontend (Vue 3 + Vite)
- **Pages dynamiques** : Accueil, À propos, Actions, Événements, Découverte, Bénévolat, Contact
- **Multilingue** : Support du français et anglais (i18n)
- **Design responsive** : Optimisé pour tous les appareils
- **Formulaires** : Contact et newsletter
- **Galerie média** : Gestion des images par catégorie
- **Révélations** : Animations au scroll avec directives personnalisées
- **Admin secure** : Tableau de bord protégé avec JWT

### Backend (Express.js + Node.js)
- **API RESTful** : Endpoints pour stats, actions, événements, médias
- **Authentification JWT** : Bearer tokens avec cookies HttpOnly
- **Admin API** : CRUD complet pour tous les contenus
- **Gestion médias** : Upload, suppression avec multer
- **Base de données** : Support MongoDB + fallback JSON
- **Sécurité** : Helmet, rate limiting, CORS
- **Internationalization** : Réponses multilingues

## 🛠️ Stack Technique

### Frontend
- Vue 3
- Vite
- Vue Router
- Vue i18n
- Axios
- CSS Personnalisé

### Backend
- Express.js
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer
- CORS, Helmet
- Express Rate Limit

## 📋 Prérequis

- Node.js >= 16
- npm ou yarn
- MongoDB (optionnel - API fonctionne en mode dégradé avec JSON)

## 🚀 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/yourusername/ffbn-asso.git
cd ffbn-asso
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env  # Configurer les variables
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

## 🏃 Démarrage

### Mode développement

**Terminal 1 - API Server:**
```bash
cd server
npm run dev      # ou: node server.js
```
API disponible sur: http://localhost:3001

**Terminal 2 - Client Vite:**
```bash
cd client
npm run dev
```
Client disponible sur: http://localhost:5173

### Mode production
```bash
# Build frontend
cd client
npm run build

# Build backend (si applicable)
cd ../server
NODE_ENV=production npm start
```

## 📁 Structure du Projet

```
ffbn-asso/
├── client/                    # Frontend Vue 3 + Vite
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── views/            # Pages principales
│   │   ├── router/           # Configuration routing
│   │   ├── i18n/             # Traductions (FR/EN)
│   │   ├── composables/      # Hooks réutilisables
│   │   └── assets/           # Images, styles
│   └── public/               # Fichiers statiques
│
├── server/                    # Backend Express.js
│   ├── controllers/          # Logique métier
│   ├── services/             # Logique applicative
│   ├── models/               # Schémas MongoDB
│   ├── routes/               # Définition des routes
│   ├── middlewares/          # Auth, erreurs, i18n
│   ├── data/                 # Données JSON fallback
│   └── config/               # Configuration
│
└── .gitignore, README.md, package.json
```

## 🔐 Authentification Admin

### Identifiants par défaut
- **Email**: admin
- **Mot de passe**: ffbn2024

> ⚠️ **Important**: Changer les identifiants en production!

### Login
```bash
POST /api/admin/login
Body: { username: "admin", password: "ffbn2024" }
```

### Endpoints Admin (protégés par JWT)
- `GET /api/admin/stats/list` - Lister les stats
- `GET /api/admin/actions` - Lister les actions
- `GET /api/admin/events` - Lister les événements
- `GET /api/admin/media/list` - Lister les médias
- `POST /api/admin/actions` - Créer une action
- `PUT /api/admin/actions/:id` - Modifier une action
- `DELETE /api/admin/actions/:id` - Supprimer une action
- *(Même pattern pour events, stats)*

## 🌐 Endpoints Publics

### Stats
```bash
GET /api/stats
```

### Actions
```bash
GET /api/actions
```

### Événements
```bash
GET /api/events
GET /api/events/upcoming
GET /api/events/:id
```

### Contact
```bash
POST /api/contact
Body: { name, email, subject, message }
```

### Newsletter
```bash
POST /api/newsletter
Body: { email }
```

## 🔧 Configuration

### Variables d'environnement (.env)

**Server:**
```env
PORT=3001
NODE_ENV=development
ADMIN_USER=admin
ADMIN_PASS=ffbn2024
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
DATABASE_URL=mongodb://localhost:27017/ffbn
```

**Client:**
- Configuré automatiquement via vite.config.js
- Proxy API: http://localhost:3001

## 📊 Vérification Système

### Tests d'intégration
```bash
cd server
node verifySystem.js  # Teste tous les endpoints
node verifyForms.js   # Teste formulaires et features additionnelles
```

## 📚 Documentation Supplémentaire

### Frontend
- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vue i18n](https://vue-i18n.intlify.dev/)

### Backend
- [Express.js](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [JWT](https://jwt.io/)

## 🤝 Contribution

### Guidelines
1. Fork le repository
2. Créer une branch (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branch (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 License

ISC

## 👥 Contact

**Email**: ffbn.asso@gmail.com  
**Site**: www.ffbn-france.fr

---

**Dernière mise à jour**: 28 février 2026  
**Statut**: ✅ Production Ready

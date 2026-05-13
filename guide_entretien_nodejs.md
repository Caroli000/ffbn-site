# 🎯 Guide d'entretien — Backend Node.js du projet FFBN

## 📌 Vue d'ensemble du projet

C'est le backend d'un site associatif (**FFBN - Fédération Francophone de Basketball au Burundi**).

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MongoDB via Mongoose
- **Communication temps réel** : Socket.IO
- **Architecture** : REST API + MVC (Models, Controllers, Services, Routes)
- **Port** : `3001` (par défaut)
- **Frontend** : Vue.js (port `5173`)

---

## 🏗️ Architecture du projet

```
server/
├── server.js              ← Point d'entrée principal
├── config/
│   ├── db.js              ← Connexion MongoDB
│   └── i18n.js            ← Internationalisation (fr/en)
├── routes/                ← Définition des endpoints
├── controllers/           ← Logique de traitement des requêtes
├── services/              ← Logique métier (accès données)
├── models/                ← Schémas Mongoose (MongoDB)
└── middlewares/           ← Auth, cache, erreurs, performances
```

### Pattern utilisé : **Route → Controller → Service → Model**

```
Client HTTP
    ↓
Route (express Router)
    ↓
Middleware (auth, cache, rate limit)
    ↓
Controller (reçoit req/res, délègue)
    ↓
Service (logique métier, fallback JSON)
    ↓
Model Mongoose (MongoDB)
```

---

## 🔑 Les packages NPM clés — ce qu'il faut savoir

| Package | Rôle | Ce qu'on dit à l'entretien |
|---|---|---|
| `express` | Framework HTTP | Gère les routes, middlewares, req/res |
| `mongoose` | ODM MongoDB | Définit des schémas, fait les requêtes DB |
| `jsonwebtoken` (jwt) | Authentification | Crée et vérifie les tokens d'accès |
| `bcryptjs` | Sécurité mots de passe | Hash le mot de passe admin avant de le comparer |
| `cors` | Cross-Origin | Autorise le frontend Vue.js à appeler l'API |
| `helmet` | Sécurité HTTP | Ajoute des headers de sécurité (CSP, XSS...) |
| `express-rate-limit` | Anti-abus | Limite le nombre de requêtes par IP |
| `compression` | Performance | Compresse les réponses HTTP (gzip) |
| `cookie-parser` | Cookies | Lit le cookie `admin_token` dans les requêtes |
| `socket.io` | Temps réel | Chat en direct entre visiteurs et admins |
| `nodemailer` | Emails | Envoie les messages de contact via Gmail |
| `dotenv` | Variables d'env | Charge le fichier `.env` au démarrage |

---

## 🛡️ Authentification — JWT + Cookies httpOnly

**Flux de connexion :**
1. L'admin envoie `POST /api/admin/login` avec `{username, password}`
2. Le mot de passe est comparé avec `bcrypt.compareSync()`
3. Si OK → un **JWT** est signé avec `jwt.sign()` (expire en 2h)
4. Le token est mis dans un **cookie httpOnly** (`admin_token`)
5. Les routes protégées lisent ce cookie via le middleware `checkAdmin`

**Middleware `checkAdmin` (authMiddleware.js) :**
```js
// Cherche le token dans le cookie OU dans le header Authorization: Bearer xxx
const token = req.cookies.admin_token || headerToken;
const decoded = jwt.verify(token, process.env.JWT_SECRET);
if (decoded.role !== 'admin') → 403
req.user = decoded; // disponible dans le controller
next();
```

> **À retenir** : le cookie est `httpOnly` → JavaScript côté client ne peut pas y accéder → protection contre XSS.
> En production, il est aussi `secure` (HTTPS seulement) et `sameSite: 'none'`.

---

## 🔒 Sécurité — Rate Limiting

Deux limiteurs sont configurés :

| Limiteur | Fenêtre | Max requêtes | Route |
|---|---|---|---|
| `globalLimiter` | 15 min | **200** | Toutes les routes `/api` |
| `authLimiter` | 15 min | **10** | `/api/admin/login` uniquement |

> **Pourquoi deux ?** Pour protéger contre le brute-force sur le login (10 essais max) tout en laissant les routes publiques fonctionner normalement.

---

## ⚡ Cache en mémoire — cacheMiddleware

Un cache **en mémoire** (Map JavaScript) est implémenté **manuellement** sans Redis :

```js
const cache = new Map(); // clé = URL, valeur = { data, expiresAt }
```

**Comment ça marche :**
- `cacheMiddleware(ttlSeconds)` → vérifie si l'URL est en cache
  - **HIT** : retourne les données en cache directement (header `X-Cache: HIT`)
  - **MISS** : laisse passer la requête, stocke la réponse en cache
- `invalidateCacheOnMutation(pattern)` → vide le cache quand on fait un POST/PUT/DELETE
- `initCache()` → nettoie automatiquement les entrées expirées toutes les 60 secondes

**TTL utilisés :**
- `/api/actions`, `/api/events`, `/api/stats`, `/api/blog` → **600 secondes (10 min)**
- Routes admin → **300 secondes (5 min)**

---

## 📦 Modèles Mongoose (MongoDB)

### Event (exemple complet)
```js
const eventSchema = new mongoose.Schema({
    title: {
        fr: { type: String, required: true },
        en: { type: String, required: false }
    },
    date: { type: Date, required: true },
    description: { fr: String, en: String },
    location: String,
    imageUrl: String
}, { timestamps: true }); // ← ajoute createdAt et updatedAt automatiquement
```

> **Point important** : les titres et descriptions sont **bilingues** (fr/en) directement dans le schéma. Le service localise à la volée selon la langue demandée.

**Les 6 modèles :**
- `Event` — Événements de l'association
- `Action` — Actions menées (projets)
- `Stat` — Statistiques de l'asso (ex: nombre de membres)
- `Contact` — Messages de contact reçus
- `Newsletter` — Inscriptions à la newsletter
- `Chat` — Messages du chatbot IA

---

## 🔄 Pattern Service avec fallback JSON

**Concept clé** : si MongoDB n'est pas connecté, les services lisent des fichiers JSON locaux !

```js
async getAll(lang = 'fr') {
    if (mongoose.connection.readyState !== 1) {
        // Fallback : lit data/events.json
        const raw = await fs.readFile(file, 'utf8');
        return JSON.parse(raw);
    }
    // Cas normal : requête MongoDB
    return await Event.find().sort({ date: 1 });
}
```

> **Avantage** : le site fonctionne même sans base de données (mode dégradé). Très utile pour les démos ou tests sans MongoDB.

**Méthodes CRUD dans chaque service :**
- `getAll(lang)` — tous les documents, localisés
- `getAllRaw()` — tous les documents, bruts (pour l'admin)
- `getById(id, lang)` — un document
- `create(data)` — créer
- `update(id, data)` — modifier
- `delete(id)` — supprimer

---

## 🌐 Toutes les routes API

### Routes publiques
| Méthode | URL | Description |
|---|---|---|
| GET | `/api/events` | Tous les événements |
| GET | `/api/events/upcoming` | Événements à venir |
| GET | `/api/events/:id` | Un événement |
| GET | `/api/actions` | Toutes les actions |
| GET | `/api/stats` | Statistiques publiques |
| GET | `/api/blog` | Articles de blog |
| POST | `/api/contact` | Envoyer un message |
| POST | `/api/newsletter` | S'inscrire à la newsletter |
| POST | `/api/chat/message` | Envoyer un message au chatbot |
| GET | `/api/chat/history/:sessionId` | Historique de chat |
| GET | `/api/health` | État du serveur |

### Routes admin (🔐 JWT requis)
| Méthode | URL | Description |
|---|---|---|
| POST | `/api/admin/login` | Connexion |
| POST | `/api/admin/logout` | Déconnexion |
| GET/POST/PUT/DELETE | `/api/admin/events` | CRUD événements |
| GET/POST/PUT/DELETE | `/api/admin/actions` | CRUD actions |
| GET/POST/PUT/DELETE | `/api/admin/stats` | CRUD statistiques |
| GET/POST | `/api/admin/media/*` | Gestion des images |
| GET | `/api/admin/chat/list` | Liste des chats |
| POST | `/api/admin/chat/reply` | Répondre à un chat |

---

## 💬 Socket.IO — Chat temps réel

```js
const io = socketIo(server, {
    cors: { origin: 'http://localhost:5173' }
});

io.on('connection', (socket) => {
    socket.on('join', (sessionId) => {
        socket.join(sessionId); // Rejoint une "room" par session
    });
});
```

- Chaque visiteur a un `sessionId` unique
- L'admin peut répondre en temps réel dans la "room" du visiteur
- Le socket est accessible dans les controllers via `req.app.get('io')`

---

## 📧 Envoi d'emails — Nodemailer

```js
// MailService.js
nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});
```

- Les formulaires de **contact** et **newsletter** envoient des emails
- Destination : `ffbn.asso@gmail.com`
- Config via variables d'environnement `EMAIL_USER` et `EMAIL_PASS`

---

## 🌍 Internationalisation (i18n)

- Package : `i18next` + `i18next-http-middleware`
- Langues supportées : **français (fr)** et **anglais (en)**
- La langue est détectée depuis le header `Accept-Language`
- Les services reçoivent un paramètre `lang` pour localiser les réponses
- `req.t('errors.notFound')` → message d'erreur traduit

---

## 🔧 Variables d'environnement (.env)

| Variable | Utilisation |
|---|---|
| `MONGO_URI` | URL de connexion MongoDB |
| `JWT_SECRET` | Clé secrète pour signer les JWT |
| `ADMIN_USER` | Nom d'utilisateur admin |
| `ADMIN_PASS` | Mot de passe admin (en clair) |
| `ADMIN_PASS_HASH` | Mot de passe admin (déjà hashé) |
| `EMAIL_USER` | Email Gmail pour l'envoi |
| `EMAIL_PASS` | Mot de passe app Gmail |
| `CLIENT_URL` | URL du frontend Vue.js |
| `PORT` | Port du serveur (défaut: 3001) |
| `NODE_ENV` | `development` ou `production` |

---

## ❓ Questions d'entretien typiques & réponses

**Q: Comment fonctionne l'authentification ?**
> JWT stocké dans un cookie httpOnly. Le middleware `checkAdmin` vérifie le token à chaque requête protégée. Le cookie est httpOnly pour éviter les attaques XSS.

**Q: Comment avez-vous géré la performance ?**
> Cache en mémoire (Map) avec TTL de 5-10 min sur toutes les routes GET. Compression gzip via `compression`. Headers de performance. Rate limiting.

**Q: Qu'est-ce qu'un middleware Express ?**
> Une fonction `(req, res, next)` qui s'exécute entre la réception de la requête et l'envoi de la réponse. On les chaîne avec `next()`.

**Q: Pourquoi un fallback JSON si MongoDB est down ?**
> Résilience : le site reste accessible même sans base de données. On vérifie `mongoose.connection.readyState !== 1` avant chaque requête.

**Q: Comment fonctionne Socket.IO ici ?**
> Pour le chat en temps réel. Les visiteurs rejoignent une "room" avec leur sessionId. L'admin peut leur répondre directement dans cette room.

**Q: C'est quoi Mongoose ?**
> Un ODM (Object Document Mapper) pour MongoDB. Il permet de définir des schémas typés, de valider les données, et d'utiliser une API orientée objet pour les requêtes.

# 🎯 OPTIMISATION ON-PAGE SEO - FFBN

**Objectif:** Optimiser chaque page pour que Google la classe mieux  
**Temps:** 2-3h pour toutes les pages

---

## 📝 STRUCTURE DE PAGE IDÉALE

### Exemple: Page Homepage

```
┌─────────────────────────────────────────────┐
│  H1: "FFBN - Association Filles et Fils du  │
│  Burundi dans le Nord"                      │
│  (Unique, contient mots-clés)               │
├─────────────────────────────────────────────┤
│  P: "Découvrez notre association d'aide...  │
│  (Intro 100-150 mots, mots-clés naturels)   │
├─────────────────────────────────────────────┤
│  H2: "Qui Sommes-Nous?"                    │
│  P: Contenu (150-200 mots)                 │
├─────────────────────────────────────────────┤
│  H2: "Nos Actions"                         │
│  P: Contenu (150-200 mots)                 │
│  [IMAGES avec alt-text]                    │
├─────────────────────────────────────────────┤
│  H2: "Rejoignez-Nous"                      │
│  P: CTA avec lien vers /contact             │
└─────────────────────────────────────────────┘
```

**Règles importantes:**
- 1 seul `<h1>` par page
- Structure logique: `H1 → H2 → H3`
- Pas de sauts de niveaux (`H1 → H3` ❌)
- Contenu minimum 300 mots
- Lien interne vers 2-3 autres pages

---

## 🔑 MOTS-CLÉS PAR PAGE

### 1. Homepage
**Mots-clés principaux:**
```
- Association Burundi France
- FFBN
- Filles Fils Burundi
```

**Contenu recommandé:**
```html
<h1>FFBN - Association Filles et Fils du Burundi dans le Nord</h1>
<p>Bienvenue sur le site de FFBN, une association d'aide et de 
solidarité pour les Filles et Fils du Burundi en France. 
Découvrez nos actions, nos événements et comment vous pouvez 
nous soutenir.</p>

<h2>Qui Sommes-Nous?</h2>
<p>FFBN est une association à but non lucratif fondée en [ANNÉE]. 
Nous travaillons pour soutenir la communauté Burundaise en France 
et ses actions...</p>

<h2>Nos Trois Piliers</h2>
<h3>Action Sociale</h3>
<p>Description actions sociales FFBN...</p>

<h3>Événements Communautaires</h3>
<p>Nous organisons régulièrement des événements...</p>

<h3>Bénévolat</h3>
<p>Rejoignez nos bénévoles et participez à...</p>
```

---

### 2. Page About (`/about`)
**Mots-clés:**
```
- Histoire association Burundi
- Valeurs FFBN
- Team FFBN
- Mission association
```

**Structure:**
```html
<h1>À Propos de FFBN</h1>

<h2>Notre Histoire</h2>
<p>La FFBN a été fondée en [DATE] par [FONDATEURS]...
(300+ mots avec contexte Burundi)</p>

<h2>Notre Mission</h2>
<p>Notre mission est de [MISSION]... (contenu détaillé)</p>

<h2>Nos Valeurs</h2>
<h3>Solidarité</h3>
<h3>Entraide</h3>
<h3>Excellence</h3>

<h2>Notre Équipe</h2>
[Cartes team avec photos + noms + titres]

<h2>Statistiques d'Impact</h2>
- X membres
- Y événements/an
- Z bénéficiaires aidés
```

---

### 3. Page Actions (`/actions`)
**Mots-clés:**
```
- Actions FFBN Burundi
- Aide sociale Burundi
- Événements solidarité
```

**Structure:**
```html
<h1>Nos Actions de Solidarité</h1>

<p>Intro: Les actions de la FFBN visant à soutenir... (150+ mots)</p>

<h2>Action 1: Academic Support</h2>
<h3>Description</h3>
<p>Nous offrons des bourses et un soutien académique à... 
(200+ mots, story + impact)</p>

<h3>Comment Vous Pouvez Aider</h3>
<p>Vous pouvez contribuer en... (CTA)</p>
[IMAGE avec alt-text: "Bénévole aide académique FFBN"]

<h2>Action 2: Solidarity & Mutual Aid</h2>
[Même structure]

<h2>Action 3: Cultural Outreach</h2>
[Même structure]
```

---

### 4. Page Events (`/events`)
**Mots-clés:**
```
- Événements communauté Burundi
- Soirées FFBN
- Rencontres association
```

**Structure:**
```html
<h1>Événements FFBN</h1>

<p>Découvrez les événements que nous organisons pour 
renforcer les liens communautaires... (100+ mots)</p>

<h2>Événements à Venir</h2>
[Lister avec dates, descriptions, lien inscription]

<h2>Événements Passés</h2>
<p>Revivez nos précédents événements...</p>
[Archive d'articles/photos des événements]

<h2>Calendrier Annuel</h2>
[Afficher récurrence des événements]
```

---

### 5. Page Contact (`/contact`)
**Mots-clés:**
```
- Contact FFBN
- Nous contacter
- Support FFBN
```

**Structure:**
```html
<h1>Nous Contacter</h1>

<p>Avez-vous des questions? Voullez-vous nous aider ou vous engager? 
Contactez-nous via le formulaire ci-dessous. Nous vous répondrons 
dans les 48 heures.</p>

<h2>Informations de Contact</h2>
<p>Email: contact@ffbn.fr</p>
<p>Téléphone: +33-XXX-XXX-XXXX</p>
<p>Adresse: [Adresse complète]</p>

<h2>Formulaire de Contact</h2>
[Formulaire avec validations]

<h2>Nous Suivre</h2>
[Icônes réseaux sociaux]
```

---

## 🖼️ ALT-TEXTS POUR IMAGES

**Format:** `alt="[Description pertinente avec mots-clés]"`

### Bons exemples:
```html
<!-- Homepage Hero -->
<img src="hero.jpg" 
     alt="Groupe FFBN membres association Burundi France devant drapeau">

<!-- Action circles -->
<img src="action-1.jpg" 
     alt="Soutien académique FFBN bourse éducation Burundi">

<!-- Team photo -->
<img src="team.jpg" 
     alt="Team FFBN fondateurs association solidarité Burundi">

<!-- Event -->
<img src="event-2024.jpg" 
     alt="Soirée culturelle FFBN communauté Burundi Nord février 2024">
```

### Mauvais exemples:
```html
❌ <img src="image1.jpg" alt="image">
❌ <img src="photo.jpg" alt="">
❌ <img src="pic.png" alt="photo du logo">
```

---

## 📱 OPTIMISATION MOBILE

**Google privilégie mobile-first!**

### À Vérifier:
```
✅ Textes lisibles sans zoom
✅ Boutons > 44px x 44px
✅ Pas d'ads ou popups bloquantes
✅ Navigation simple (menu hamburger OK)
✅ Images responsive (img { max-width: 100% })
✅ Vitesse chargement < 2.5s
```

**Test:** https://search.google.com/test/mobile-friendly

---

## ⏱️ VITESSE PAGE (Core Web Vitals)

### Optimisations Rapides:
```javascript
// 1. Lazy-load images
<img src="image.jpg" loading="lazy" alt="...">

// 2. Compresser images
// Utiliser WebP format au lieu de JPG/PNG

// 3. Minifier CSS/JS
// Vite le fait automatiquement en production

// 4. Defer CSS non-critique
<link rel="preload" href="style.css" as="style">

// 5. Async scripts externes
<script src="analytics.js" async></script>
```

**Test:** https://pagespeedinsights.web.dev

---

## 🔗 LIENS INTERNES (TRÈS IMPORTANT!)

**Objectif:** Faire circuler l'autorité entre pages

### Stratégie:
```
Homepage
├─ À Propos
├─ Actions
│  └─ Lien vers Volunteering
├─ Events
│  └─ Lien vers Contact
└─ Contact

À Propos
├─ Lien vers homepage
├─ Lien vers Mission dans Actions
└─ Lien vers Team
```

### Exemple Code:
```html
<!-- Dans Actions page -->
<p>Envie de participer? 
   <a href="/volunteering">Rejoignez nos bénévoles</a>
</p>

<!-- Dans Events page -->
<p>Pour plus d'infos, 
   <a href="/contact">contactez-nous</a>
</p>

<!-- Dans Team section -->
<p>Découvrez 
   <a href="/about">l'histoire complète de notre association</a>
</p>
```

**Texte du lien:** Doit être descriptif (pas "Cliquez ici" ❌)

---

## 📝 CONTENU TEXTE: BEST PRACTICES

### Longueur minimale par page:
```
Homepage:  500-800 mots
About:    800-1200 mots
Action:   600-900 mots chacune
Events:   500-700 mots
Contact:  200-300 mots
Blog:    1000-1500 mots
```

### Intégration mots-clés:
```
Total mots: 500
Mot-clé principal: 2-3x (0.5-0.6%)
Mot-clé secondaire: 1-2x (0.2-0.4%)

Exemple: 
"FFBN est une association d'aide [MOT-CLÉ PRINCIPAL #1]
Nous travaillons pour les Filles et Fils du Burundi [VARIANTE #2]
Notre mission de solidarité Burundi [DÉRIVÉ #3]"
```

**Important:** Naturel avant tout! Pas de "keyword stuffing"

---

## 🎨 H-TAGS (Titres) STRATÉGIE

### Bonne Structure Vue:
```vue
<template>
  <main>
    <h1>{{ page_title }}</h1>
    <!-- Intro -->
    <p>Introduction...</p>
    
    <section v-for="section in sections">
      <h2>{{ section.title }}</h2>
      <p>{{ section.content }}</p>
      
      <h3 v-for="subsection in section.subsections">
        {{ subsection.title }}
      </h3>
      <p>{{ subsection.content }}</p>
    </section>
  </main>
</template>
```

### Règles H-Tags:
```
✅ H1: Une seule, inclure mot-clé principal
✅ H2: 2-5 par page, mots-clés secondaires
✅ H3: Sous-titres de H2, optionnel
❌ H4-H6: Généralement pas nécessaire pour SEO
❌ Sauter des niveaux: H1 → H3 (mauvais)
```

---

## 📊 SCHEMA MARKUP (Données Structurées)

### Ajouter dans `index.html` ou vue:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FFBN - Filles et Fils du Burundi",
  "url": "https://ffbn.fr",
  "logo": "https://ffbn.fr/logo.png",
  "description": "Association d'aide et de solidarité",
  "email": "contact@ffbn.fr",
  "contact": {
    "@type": "ContactPoint",
    "telephone": "+33-XXX-XXX-XXXX",
    "contactType": "Customer Support"
  },
  "sameAs": [
    "https://www.facebook.com/ffbn",
    "https://www.linkedin.com/company/ffbn"
  ]
}
</script>

<!-- Pour pages d'événements -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Soirée Culturelle FFBN",
  "startDate": "2026-03-15T19:00",
  "endDate": "2026-03-15T22:00",
  "location": {
    "@type": "Place",
    "name": "[Lieu]",
    "address": "[Adresse complète]"
  },
  "image": "https://ffbn.fr/event-image.jpg",
  "description": "Soirée culturelle FFBN...",
  "offers": {
    "@type": "Offer",
    "price": "10",
    "priceCurrency": "EUR"
  }
}
</script>
```

**Bénéfice:** Google affiche des rich snippets => +CTR

---

## ✨ CHECKLIST ON-PAGE COMPLET

### Par Page:
- [ ] H1 unique avec mot-clé principal
- [ ] H2/H3 structure logique
- [ ] 300+ mots minimum
- [ ] Meta description 155-160 char
- [ ] 2-3 mots-clés tout naturel
- [ ] Toutes images ont alt-text
- [ ] 2-3 liens internes
- [ ] Mobile responsive
- [ ] Vitesse < 2.5s
- [ ] Pas d'erreurs console
- [ ] CTA clair (bouton)
- [ ] Date publication visible

### Site Global:
- [ ] Sitemap.xml créé
- [ ] Robots.txt configuré
- [ ] Favicon ajouté
- [ ] Canonical tags corrects
- [ ] Open Graph meta tags
- [ ] Twitter card tags
- [ ] Schema markup principal

---

## 🚀 IMPLÉMENTATION (À FAIRE)

### Immédiatement:
```
[ ] Ajouter H1 homepage avec mot-clé
[ ] Vérifier meta descriptions
[ ] Ajouter alt-text aux images
[ ] Ajouter 2-3 liens internes par page
[ ] Vérifier longueur contenu (300+ mots)
```

### Cette semaine:
```
[ ] Appliquer à toutes les pages
[ ] Créer article blog test
[ ] Implémenter Schema markup
[ ] Tester avec PageSpeed
[ ] Vérifier mobile-friendly
```

### Ce mois:
```
[ ] Articles blog réguliers
[ ] Enrichir contenu pages
[ ] Monitoring rankings Google
[ ] Analyse Analytics data
```

---

## 📈 RÉSULTATS ATTENDUS

**Après ces optimisations on-page:**
```
+40-60% CTR (Click Through Rate) dans Google
+200-300% impressions Google
+100-200% trafic organique
Ranking ~ mois 2-3 pour mots-clés Tier 2
```

---

**📘 Pour plus:** Voir [GUIDE_SEO_COMPLET_FFBN.md](./GUIDE_SEO_COMPLET_FFBN.md)

_Créé le 28 Février 2026_

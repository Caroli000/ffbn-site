const fs = require('fs');
const path = require('path');

const blogArticles = [
    {
        id: 1,
        slug: "5-actions-locales-soutenir-burundi",
        titleFr: "5 Actions Locales de la FFBN Pour Soutenir le Burundi",
        titleEn: "5 Local Actions by FFBN to Support Burundi",
        metaDescription: "Découvrez les 5 actions principales de l'association FFBN",
        author: "FFBN Team",
        date: "2026-02-28",
        category: "Actions",
        image: "/images/actions-hero.jpg",
        content: "5 Actions de la FFBN: Soutien académique, Solidarité, Rayonnement culturel, Jeunesse, Plaidoyer",
        keywords: ["FFBN", "Actions sociales", "Burundi", "Solidarité"],
        readingTime: 8
    },
    {
        id: 2,
        slug: "comment-devenir-benevole-ffbn",
        titleFr: "Comment Devenir Bénévole à la FFBN",
        titleEn: "How to Become a Volunteer at FFBN",
        metaDescription: "Rejoignez notre équipe de bénévoles et participez à nos actions",
        author: "FFBN Team",
        date: "2026-02-27",
        category: "Volontariat",
        image: "/images/volunteer-hero.jpg",
        content: "Processus pour devenir bénévole: Contacter FFBN, Entretien, Formation, Première mission, Engagement continu",
        keywords: ["Bénévolat", "Volontariat", "FFBN", "S'engager"],
        readingTime: 10
    },
    {
        id: 3,
        slug: "histoire-solidarite-teemoignage-membre",
        titleFr: "Histoire De Solidarité: Témoignage D'Un Membre FFBN",
        titleEn: "Solidarity Story: Testimony from a Member",
        metaDescription: "Découvrez comment la FFBN a changé la vie d'une famille",
        author: "FFBN Team",
        date: "2026-02-26",
        category: "Témoignages",
        image: "/images/testimony-hero.jpg",
        content: "Témoignage inspirant d'impact social et transformation personnelle grâce aux programmes FFBN",
        keywords: ["Témoignage", "Impact social", "FFBN", "Solidarité"],
        readingTime: 12
    },
    {
        id: 4,
        slug: "evenement-ffbn-soiree-culturelle-fevrier",
        titleFr: "Événement FFBN: Soirée Culturelle de Février",
        titleEn: "FFBN Event: February Cultural Evening",
        metaDescription: "Revivez la soirée culturelle FFBN avec 450+ personnes",
        author: "FFBN Team",
        date: "2026-02-25",
        category: "Événements",
        image: "/images/event-hero.jpg",
        content: "Soirée culturelle réussie: danses traditionnelles, buffet burundais, performances artistiques et convivialité",
        keywords: ["Événement", "Soirée culturelle", "Burundi", "FFBN"],
        readingTime: 10
    },
    {
        id: 5,
        slug: "astuces-seo-association-google-visibilite",
        titleFr: "Comment Rendre Une Association Visible Sur Google",
        titleEn: "How to Make Your Association Visible on Google",
        metaDescription: "Guide SEO complet pour améliorer la visibilité de votre association",
        author: "FFBN Digital Team",
        date: "2026-02-24",
        category: "Ressources",
        image: "/images/seo-guide.jpg",
        content: "5 piliers du SEO pour associations: Google Search Console, Google Business, Meta tags, Contenu, Backlinks",
        keywords: ["SEO", "Google", "Visibilité", "Association"],
        readingTime: 14
    }
];

module.exports = blogArticles;

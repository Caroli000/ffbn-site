require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const Action = require('./models/Action');
const Event = require('./models/Event');
const Stat = require('./models/Stat');

async function seed() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error('❌ ERREUR : MONGO_URI n\'est pas défini dans le fichier .env');
            process.exit(1);
        }

        console.log('⏳ Connexion à MongoDB Atlas...');
        await mongoose.connect(uri);
        console.log('✅ Connecté à MongoDB.');

        const actionsPath = path.join(__dirname, 'data', 'actions.json');
        const actionsData = JSON.parse(await fs.readFile(actionsPath, 'utf8'));
        console.log(`📦 Importation de ${actionsData.length} actions...`);
        for (const item of actionsData) {

            const { id, ...data } = item;
            await Action.findOneAndUpdate({ 'title.fr': data.title.fr }, data, { upsert: true });
        }

        const eventsPath = path.join(__dirname, 'data', 'events.json');
        const eventsData = JSON.parse(await fs.readFile(eventsPath, 'utf8'));
        console.log(`📦 Importation de ${eventsData.length} événements...`);
        for (const item of eventsData) {
            const { id, ...data } = item;
            await Event.findOneAndUpdate({ 'title.fr': data.title.fr }, data, { upsert: true });
        }

        const statsPath = path.join(__dirname, 'data', 'stats.json');
        try {
            const statsData = JSON.parse(await fs.readFile(statsPath, 'utf8'));
            console.log(`📦 Importation de ${statsData.length} statistiques...`);
            for (const item of statsData) {
                const { id, ...data } = item;
                await Stat.findOneAndUpdate({ label: data.label }, data, { upsert: true });
            }
        } catch (e) {
            console.log('ℹ️ Pas de fichier stats.json ou fichier vide, skipping.');
        }

        console.log('\n🚀 MIGRATION TERMINÉE AVEC SUCCÈS !');
        console.log('Vos données sont maintenant sur MongoDB Atlas.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de la migration :', error.message);
        process.exit(1);
    }
}

seed();

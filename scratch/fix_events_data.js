const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'server', '.env') });

const Event = require('../server/models/Event');

async function fixEvents() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ffbn');
        console.log('Connected.');

        // Update existing events to future dates to ensure they show up in "Upcoming"
        const now = new Date();
        
        const events = await Event.find();
        console.log(`Found ${events.length} events.`);

        if (events.length === 0) {
            console.log('No events in DB. Creating 3 default events...');
            await Event.create([
                {
                    title: { fr: "Forum d'Orientation Universitaire", en: "University Orientation Forum" },
                    date: new Date(now.getFullYear(), now.getMonth() + 1, 15),
                    description: { fr: "Forum dédié aux nouveaux arrivants pour les guider dans leurs démarches académiques et administratives.", en: "Forum dedicated to newcomers..." },
                    location: "Lyon, France"
                },
                {
                    title: { fr: "Journée de Solidarité", en: "Solidarity Day" },
                    date: new Date(now.getFullYear(), now.getMonth() + 1, 25),
                    description: { fr: "Collecte de fonds et activités solidaires pour soutenir les étudiants en difficulté.", en: "Fundraising..." },
                    location: "Marseille, France"
                },
                {
                    title: { fr: "Soirée Culturelle FFBN", en: "FFBN Cultural Night" },
                    date: new Date(now.getFullYear(), now.getMonth() + 2, 10),
                    description: { fr: "Une soirée festive pour célébrer la culture burundaise.", en: "A festive evening..." },
                    location: "Lille, France"
                }
            ]);
        } else {
            // Update dates of existing ones
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                event.date = new Date(now.getFullYear(), now.getMonth() + 1, 15 + (i * 5));
                await event.save();
                console.log(`Updated event: ${event.title.fr}`);
            }
            
            // If less than 3, add some
            if (events.length < 3) {
                const toAdd = 3 - events.length;
                for (let i = 0; i < toAdd; i++) {
                    await Event.create({
                        title: { fr: `Nouvel Événement ${i+1}`, en: `New Event ${i+1}` },
                        date: new Date(now.getFullYear(), now.getMonth() + 2, 5 + (i * 10)),
                        description: { fr: "Description de l'événement.", en: "Event description." },
                        location: "Paris, France"
                    });
                }
            }
        }

        console.log('Done.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

fixEvents();

const Event = require('../models/Event');
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');

class EventService {
    
    async getAll(lang = 'fr') {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            const data = JSON.parse(raw);
            return data.map((event) => ({
                id: event.id,
                title: event.title[lang] || event.title.fr,
                date: event.date,
                description: event.description[lang] || event.description.fr,
                location: event.location,
                imageUrl: event.imageUrl,
                isUpcoming: new Date(event.date) > new Date(),
            }));
        }

        const events = await Event.find().sort({ date: 1 });
        return events.map((event) => this._localize(event, lang));
    }

async getAllRaw() {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            return JSON.parse(raw);
        }
        return await Event.find().sort({ date: 1 }).lean();
    }

async getUpcoming(lang = 'fr') {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            const data = JSON.parse(raw);
            return data
                .filter((e) => new Date(e.date) > new Date())
                .map((event) => ({
                    id: event.id,
                    title: event.title[lang] || event.title.fr,
                    date: event.date,
                    description: event.description[lang] || event.description.fr,
                    location: event.location,
                    imageUrl: event.imageUrl,
                    isUpcoming: true,
                }));
        }

        const events = await Event.find({ date: { $gt: new Date() } }).sort({ date: 1 });
        return events.map((event) => this._localize(event, lang));
    }

async getById(id, lang = 'fr') {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            const data = JSON.parse(raw);
            const event = data.find((e) => String(e.id) === String(id));
            if (!event) return null;
            return {
                id: event.id,
                title: event.title[lang] || event.title.fr,
                date: event.date,
                description: event.description[lang] || event.description.fr,
                location: event.location,
                imageUrl: event.imageUrl,
                isUpcoming: new Date(event.date) > new Date(),
            };
        }

        const event = await Event.findById(id);
        if (!event) return null;
        return this._localize(event, lang);
    }

async create(data) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            const events = JSON.parse(raw);

            const normalizedData = this._normalizeEventData(data);
            
            const newEvent = {
                id: Math.max(...events.map(e => e.id), 0) + 1,
                ...normalizedData,
                createdAt: new Date().toISOString()
            };
            
            events.push(newEvent);
            await fs.writeFile(file, JSON.stringify(events, null, 2));
            return newEvent;
        }
        const newEvent = new Event(data);
        await newEvent.save();
        return newEvent;
    }

async update(id, data) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            const events = JSON.parse(raw);
            
            const index = events.findIndex(e => String(e.id) === String(id));
            if (index === -1) return null;
            
            events[index] = { ...events[index], ...data, updatedAt: new Date().toISOString() };
            await fs.writeFile(file, JSON.stringify(events, null, 2));
            return events[index];
        }
        const updated = await Event.findByIdAndUpdate(id, data, { new: true });
        return updated;
    }

async delete(id) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'events.json');
            const raw = await fs.readFile(file, 'utf8');
            const events = JSON.parse(raw);
            
            const filteredEvents = events.filter(e => String(e.id) !== String(id));
            const wasDeleted = filteredEvents.length < events.length;
            
            if (wasDeleted) {
                await fs.writeFile(file, JSON.stringify(filteredEvents, null, 2));
            }
            
            return wasDeleted;
        }
        const result = await Event.findByIdAndDelete(id);
        return !!result;
    }

_normalizeEventData(data) {

        if (data.title_fr || data.title_en) {
            return {
                title: {
                    fr: data.title_fr || data.title || '',
                    en: data.title_en || data.title || ''
                },
                description: {
                    fr: data.description_fr || data.description || '',
                    en: data.description_en || data.description || ''
                },
                date: data.date,
                location: data.location_fr || data.location || '',
                maxParticipants: data.maxParticipants,
                imageUrl: data.imageUrl
            };
        }

        return data;
    }

_localize(event, lang) {
        return {
            id: event._id,
            title: event.title[lang] || event.title.fr,
            date: event.date,
            description: event.description[lang] || event.description.fr,
            location: event.location,
            imageUrl: event.imageUrl,
            isUpcoming: new Date(event.date) > new Date(),
        };
    }
}

module.exports = EventService;

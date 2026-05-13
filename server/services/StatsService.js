const Stat = require('../models/Stat');
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');

class StatsService {
    
    async getAll(lang = 'fr') {

        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'stats.json');
            const raw = await fs.readFile(file, 'utf8');
            const data = JSON.parse(raw);
            return data.map((stat) => ({
                id: stat.id,
                label: (typeof stat.label === 'object' ? stat.label[lang] : stat[`label_${lang}`]) || 
                       (stat.label?.fr || stat.label_fr || 'Sans titre'),
                value: stat.value,
                icon: stat.icon,
            }));
        }

        const stats = await Stat.find().sort({ createdAt: 1 });
        return stats.map((stat) => ({
            id: stat._id,
            label: (typeof stat.label === 'object' ? stat.label[lang] : stat[`label_${lang}`]) || 
                   (stat.label?.fr || stat.label_fr || 'Sans titre'),
            value: stat.value,
            icon: stat.icon,
        }));
    }

async _readData() {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'stats.json');
            const raw = await fs.readFile(file, 'utf8');
            return JSON.parse(raw);
        }
        return await Stat.find().sort({ createdAt: 1 }).lean();
    }

async update(id, data) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'stats.json');
            const raw = await fs.readFile(file, 'utf8');
            const stats = JSON.parse(raw);
            
            const index = stats.findIndex(s => String(s.id) === String(id));
            if (index === -1) return null;
            
            stats[index] = { ...stats[index], ...data, updatedAt: new Date().toISOString() };
            await fs.writeFile(file, JSON.stringify(stats, null, 2));
            return stats[index];
        }
        const updated = await Stat.findByIdAndUpdate(id, data, { new: true });
        return updated;
    }

async create(data) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'stats.json');
            const raw = await fs.readFile(file, 'utf8');
            const stats = JSON.parse(raw);
            
            const newStat = {
                id: Math.max(...stats.map(s => s.id), 0) + 1,
                ...data,
                createdAt: new Date().toISOString()
            };
            
            stats.push(newStat);
            await fs.writeFile(file, JSON.stringify(stats, null, 2));
            return newStat;
        }
        const newStat = new Stat(data);
        await newStat.save();
        return newStat;
    }

async delete(id) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'stats.json');
            const raw = await fs.readFile(file, 'utf8');
            const stats = JSON.parse(raw);
            
            const filteredStats = stats.filter(s => String(s.id) !== String(id));
            const wasDeleted = filteredStats.length < stats.length;
            
            if (wasDeleted) {
                await fs.writeFile(file, JSON.stringify(filteredStats, null, 2));
            }
            
            return wasDeleted;
        }
        const result = await Stat.findByIdAndDelete(id);
        return !!result;
    }
}

module.exports = StatsService;

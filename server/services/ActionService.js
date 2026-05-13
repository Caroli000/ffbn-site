const Action = require('../models/Action');
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');

class ActionService {
    
    async getAll(lang = 'fr') {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'actions.json');
            const raw = await fs.readFile(file, 'utf8');
            const data = JSON.parse(raw);
            return data.map((action) => ({
                id: action.id,
                icon: action.icon,
                title: action.title[lang] || action.title.fr,
                description: action.description[lang] || action.description.fr,
            }));
        }

        const actions = await Action.find().sort({ createdAt: -1 });
        return actions.map((action) => ({
            id: action._id,
            icon: action.icon,
            title: action.title[lang] || action.title.fr,
            description: action.description[lang] || action.description.fr,
        }));
    }

async getAllRaw() {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'actions.json');
            const raw = await fs.readFile(file, 'utf8');
            return JSON.parse(raw);
        }
        return await Action.find().sort({ createdAt: -1 }).lean();
    }

async getById(id, lang = 'fr') {
        if (mongoose.connection.readyState !== 1) {
            const file = path.join(__dirname, '..', 'data', 'actions.json');
            const raw = await fs.readFile(file, 'utf8');
            const data = JSON.parse(raw);
            const action = data.find((a) => String(a.id) === String(id));
            if (!action) return null;
            return {
                id: action.id,
                icon: action.icon,
                title: action.title[lang] || action.title.fr,
                description: action.description[lang] || action.description.fr,
            };
        }

        const action = await Action.findById(id);
        if (!action) return null;
        return {
            id: action._id,
            icon: action.icon,
            title: action.title[lang] || action.title.fr,
            description: action.description[lang] || action.description.fr,
        };
    }

async create(data) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'actions.json');
            const raw = await fs.readFile(file, 'utf8');
            const actions = JSON.parse(raw);
            
            const newAction = {
                id: Math.max(...actions.map(a => a.id), 0) + 1,
                ...data,
                createdAt: new Date().toISOString()
            };
            
            actions.push(newAction);
            await fs.writeFile(file, JSON.stringify(actions, null, 2));
            return newAction;
        }
        const newAction = new Action(data);
        await newAction.save();
        return newAction;
    }

async update(id, data) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'actions.json');
            const raw = await fs.readFile(file, 'utf8');
            const actions = JSON.parse(raw);
            
            const index = actions.findIndex(a => String(a.id) === String(id));
            if (index === -1) return null;
            
            actions[index] = { ...actions[index], ...data, updatedAt: new Date().toISOString() };
            await fs.writeFile(file, JSON.stringify(actions, null, 2));
            return actions[index];
        }
        const updated = await Action.findByIdAndUpdate(id, data, { new: true });
        return updated;
    }

async delete(id) {
        if (mongoose.connection.readyState !== 1) {

            const file = path.join(__dirname, '..', 'data', 'actions.json');
            const raw = await fs.readFile(file, 'utf8');
            const actions = JSON.parse(raw);
            
            const filteredActions = actions.filter(a => String(a.id) !== String(id));
            const wasDeleted = filteredActions.length < actions.length;
            
            if (wasDeleted) {
                await fs.writeFile(file, JSON.stringify(filteredActions, null, 2));
            }
            
            return wasDeleted;
        }
        const result = await Action.findByIdAndDelete(id);
        return !!result;
    }
}

module.exports = ActionService;

const Contact = require('../models/Contact');
const mailService = require('./MailService');

class ContactService {
    constructor() {
        this.contacts = [];
        this.nextId = 1;
    }

async create(data) {
        const contact = new Contact({
            id: this.nextId++,
            name: data.name,
            email: data.email,
            message: data.message,
            createdAt: new Date(),
        });

        this.contacts.push(contact);

        try {
            await mailService.sendContactEmail(data);
        } catch (err) {
            console.error('Email non envoyé, mais message enregistré:', err);

}

        return contact;
    }

getAll() {
        return this.contacts.map((c) => c.toJSON());
    }
}

module.exports = ContactService;

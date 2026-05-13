const Newsletter = require('../models/Newsletter');

class NewsletterService {
    constructor() {
        this.subscribers = [];
        this.nextId = 1;
    }

subscribe(email) {
        const existing = this.subscribers.find((s) => s.email === email);
        if (existing) {
            return { subscriber: existing, isNew: false };
        }

        const subscriber = new Newsletter({
            id: this.nextId++,
            email,
            subscribedAt: new Date(),
        });
        this.subscribers.push(subscriber);
        return { subscriber, isNew: true };
    }

getAll() {
        return this.subscribers.map((s) => s.toJSON());
    }

isSubscribed(email) {
        return this.subscribers.some((s) => s.email === email);
    }
}

module.exports = NewsletterService;

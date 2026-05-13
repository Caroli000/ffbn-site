
class Contact {
    constructor({ id = null, name, email, message, createdAt = new Date() }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = createdAt;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            message: this.message,
            createdAt: this.createdAt,
        };
    }
}

module.exports = Contact;

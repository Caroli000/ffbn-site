
class Newsletter {
    constructor({ id = null, email, subscribedAt = new Date() }) {
        this.id = id;
        this.email = email;
        this.subscribedAt = subscribedAt;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            subscribedAt: this.subscribedAt,
        };
    }
}

module.exports = Newsletter;

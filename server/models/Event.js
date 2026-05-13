const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        fr: { type: String, required: true, trim: true },
        en: { type: String, required: false, trim: true }
    },
    date: { type: Date, required: true },
    description: {
        fr: { type: String, required: true, trim: true },
        en: { type: String, required: false, trim: true }
    },
    location: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: false, default: null }
}, { timestamps: true });

eventSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.isUpcoming = new Date(ret.date) > new Date();
        delete ret._id;
    }
});

module.exports = mongoose.model('Event', eventSchema);

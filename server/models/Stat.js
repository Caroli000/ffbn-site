const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    label: {
        fr: { type: String, required: true, trim: true },
        en: { type: String, required: false, trim: true }
    },
    value: { type: String, required: true, trim: true },
    icon: { type: String, required: false, default: null }
}, { timestamps: true });

statSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Stat', statSchema);

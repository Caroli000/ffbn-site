const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    icon: { type: String, required: false, default: 'fas fa-star' },
    title: {
        fr: { type: String, required: true, trim: true },
        en: { type: String, required: false, trim: true }
    },
    description: {
        fr: { type: String, required: true, trim: true },
        en: { type: String, required: false, trim: true }
    }
}, { timestamps: true });

actionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Action', actionSchema);

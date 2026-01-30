const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = { Contact, Newsletter };

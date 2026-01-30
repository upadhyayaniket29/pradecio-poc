const { Contact, Newsletter } = require('../models/guest.model');

const submitContactForm = async (contactData) => {
    const contact = new Contact(contactData);
    return await contact.save();
};

const subscribeNewsletter = async (email) => {
    const existing = await Newsletter.findOne({ email });
    if (existing) throw new Error('Email already subscribed');

    const newsletter = new Newsletter({ email });
    return await newsletter.save();
};

module.exports = { submitContactForm, subscribeNewsletter };

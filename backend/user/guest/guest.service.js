const { Contact, Newsletter } = require('../models/guest.model');
const { sendNewsletterWelcomeEmail } = require('../utils/mailService');

const submitContactForm = async (contactData) => {
    const contact = new Contact(contactData);
    return await contact.save();
};

const subscribeNewsletter = async (email) => {
    const existing = await Newsletter.findOne({ email });
    if (existing) throw new Error('Email already subscribed');

    const newsletter = new Newsletter({ email });
    await newsletter.save();

    // Send welcome email asynchronously (don't block response)
    try {
        await sendNewsletterWelcomeEmail(email);
    } catch (error) {
        console.error('Failed to send newsletter welcome email:', error);
        // We don't throw here to ensure the subscription itself is still successful
    }

    return newsletter;
};

module.exports = { submitContactForm, subscribeNewsletter };

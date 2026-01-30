const guestService = require('./guest.service');
const { ApiResponse, ApiError } = require('../utils/apiResponse');

const contactController = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json(new ApiError(400, "All fields are required"));
        }
        const result = await guestService.submitContactForm({ name, email, message });
        res.status(201).json(new ApiResponse(201, result, "Message sent successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
};

const newsletterController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(new ApiError(400, "Email is required"));
        }
        const result = await guestService.subscribeNewsletter(email);
        res.status(201).json(new ApiResponse(201, result, "Subscribed successfully"));
    } catch (error) {
        const statusCode = error.message === 'Email already subscribed' ? 400 : 500;
        res.status(statusCode).json(new ApiError(statusCode, error.message));
    }
};

module.exports = { contactController, newsletterController };

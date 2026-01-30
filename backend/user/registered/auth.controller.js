const userService = require('./user.service');
const { ApiResponse, ApiError } = require('../utils/apiResponse');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json(new ApiError(400, "Name, email and password are required"));
        }
        const result = await userService.registerUser({ name, email, password });
        res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
    } catch (error) {
        const statusCode = error.message === 'User already exists' ? 400 : 500;
        res.status(statusCode).json(new ApiError(statusCode, error.message));
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Email and password are required"));
        }
        const result = await userService.loginUser(email, password);
        res.status(200).json(new ApiResponse(200, result, "Login successful"));
    } catch (error) {
        const statusCode = error.message === 'Invalid credentials' ? 401 : 500;
        res.status(statusCode).json(new ApiError(statusCode, error.message));
    }
};

const { sendResetEmail } = require('../utils/mailService');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json(new ApiError(400, "Email is required"));
        }
        const resetToken = await userService.requestPasswordReset(email);

        try {
            await sendResetEmail(email, resetToken);
            res.status(200).json(new ApiResponse(200, null, "Password reset instructions sent to your email."));
        } catch (emailError) {
            console.error('Email send error:', emailError);
            // Even if email fails, we don't want to expose too much to the user, 
            // but for now let's notify them if they are testing locally.
            res.status(500).json(new ApiError(500, "Failed to send reset email. Please check your EMAIL_USER and EMAIL_PASS config."));
        }
    } catch (error) {
        res.status(400).json(new ApiError(400, error.message));
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json(new ApiError(400, "Token and new password are required"));
        }
        await userService.resetPassword(token, newPassword);
        res.status(200).json(new ApiResponse(200, null, "Password has been reset successfully"));
    } catch (error) {
        res.status(400).json(new ApiError(400, error.message));
    }
};

module.exports = { signup, login, forgotPassword, resetPassword };

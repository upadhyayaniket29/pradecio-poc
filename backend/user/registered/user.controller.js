const userService = require('./user.service');
const { ApiResponse, ApiError } = require('../utils/apiResponse');

const getProfile = async (req, res) => {
    try {
        const result = await userService.getUserProfile(req.user.id);
        res.status(200).json(new ApiResponse(200, result, "Profile fetched successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await userService.updateUserProfile(req.user.id, { name });
        res.status(200).json(new ApiResponse(200, result, "Profile updated successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
};

const enroll = async (req, res) => {
    try {
        const { plan, price, duration } = req.body;
        const result = await userService.enrollUser(req.user.id, { plan, price, duration });
        res.status(200).json(new ApiResponse(200, result, "Enrolled successfully"));
    } catch (error) {
        res.status(500).json(new ApiError(500, error.message));
    }
};

module.exports = { getProfile, updateProfile, enroll };

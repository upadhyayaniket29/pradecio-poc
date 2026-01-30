const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const registerUser = async (userData) => {
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const user = new User({ name, email, password });
    return await user.save();
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            planStatus: user.planStatus,
            planDuration: user.planDuration,
            enrolledAt: user.enrolledAt
        }
    };
};

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User with this email does not exist');

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();
    return resetToken;
};

const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) throw new Error('Password reset token is invalid or has expired');

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    return user;
};

const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User not found');
    return user;
};

const updateUserProfile = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
};

const enrollUser = async (userId, planData) => {
    const { plan, price, duration } = planData;
    const user = await User.findByIdAndUpdate(
        userId,
        {
            plan,
            planStatus: 'active',
            planDuration: duration,
            enrolledAt: Date.now()
        },
        { new: true }
    ).select('-password');

    if (!user) throw new Error('User not found');
    return user;
};

module.exports = { registerUser, loginUser, requestPasswordReset, resetPassword, getUserProfile, updateUserProfile, enrollUser };

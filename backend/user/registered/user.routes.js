const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, enroll } = require('./user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/enroll', authMiddleware, enroll);

module.exports = router;

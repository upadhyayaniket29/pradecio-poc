const express = require('express');
const router = express.Router();

const guestRoutes = require('./guest/guest.routes');
const authRoutes = require('./registered/auth.routes');
const userRoutes = require('./registered/user.routes');

// Mount Modules
router.use('/guest', guestRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;

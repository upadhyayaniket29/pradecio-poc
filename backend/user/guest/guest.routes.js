const express = require('express');
const router = express.Router();
const { contactController, newsletterController } = require('./guest.controller');
const guestMiddleware = require('../middlewares/guest.middleware');

router.post('/contact', guestMiddleware, contactController);
router.post('/newsletter', guestMiddleware, newsletterController);

module.exports = router;

// Basic guest middleware for any future public validation/limitations
const guestMiddleware = (req, res, next) => {
    next();
};

module.exports = guestMiddleware;

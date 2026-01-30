const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Consolidated User Backend is running with Professional Architecture');
});

// Mounting the complete user module
app.use('/api', require('./user.routes'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
    .then(() => console.log('MongoDB connected for Unified User Backend'))
    .catch(err => {
        console.error('MongoDB connection error details:');
        if (err.code === 'ECONNREFUSED' || err.name === 'MongooseServerSelectionError') {
            console.error('CRITICAL: Could not connect to MongoDB. Please check your IP Whitelist in Atlas.');
        }
        console.error('Error:', err.message);
    });

app.listen(PORT, () => {
    console.log(`Unified User Backend listening on port ${PORT}`);
});

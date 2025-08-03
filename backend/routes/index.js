// This mounts all route groups
const express = require('express');
const router = express.Router();

// Import route groups
const apiRoutes = require('./api');

// Mount routes
router.use('/api', apiRoutes);

// Add other route groups here if needed (e.g., auth, admin)
// router.use('/auth', authRoutes);

module.exports = router;
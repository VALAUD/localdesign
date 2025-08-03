// This combines all API routes into one router
const express = require('express');
const router = express.Router();

// Import route files
const enumsRoutes = require('./enums');
const sellersRoutes = require('./sellers');

// Mount routes
router.use('/enums', enumsRoutes);
router.use('/sellers', sellersRoutes);

module.exports = router;
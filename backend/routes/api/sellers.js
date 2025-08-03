const express = require('express');
const router = express.Router();
const sellersController = require('../../controllers/sellersController');

router.get('/', sellersController.getSellers);

module.exports = router;
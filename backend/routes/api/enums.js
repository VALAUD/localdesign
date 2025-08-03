const express = require('express');
const router = express.Router();
const enumsController = require('../../controllers/enumsController');

router.get('/style_types', enumsController.getStyleTypes);
router.get('/service_types', enumsController.getServiceTypes);

module.exports = router;
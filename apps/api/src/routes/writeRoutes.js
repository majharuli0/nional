const express = require('express');
const router = express.Router();
const writeController = require('../controllers/writeController');

// POST /api/write/generate
router.post('/generate', writeController.generate);

module.exports = router;

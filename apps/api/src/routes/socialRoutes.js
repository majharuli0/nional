const express = require('express');
const router = express.Router();
const { generateSocialContent } = require('../controllers/socialController');

router.post('/generate', generateSocialContent);

module.exports = router;

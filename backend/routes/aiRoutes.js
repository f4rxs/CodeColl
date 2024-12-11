const express = require('express');
const { getCodeSuggestionController } = require('../src/AI/aiController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/code-suggestion', auth, getCodeSuggestionController);

module.exports = router;
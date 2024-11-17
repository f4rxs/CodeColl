const
    runCodeController
        = require('../src/Judge0/judge0Controler');
const express = require('express');
const router = express.Router();
//POST ROUTES
router.post('/run',runCodeController);

module.exports = router;


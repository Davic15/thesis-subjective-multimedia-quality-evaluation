const express = require('express');

const testController = require('../controllers/test');

const router = express.Router()

router.get('/test', testController.getStimuli);

module.exports = router;
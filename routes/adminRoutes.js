const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/upload', adminController.uploadStimuli);


module.exports = router;
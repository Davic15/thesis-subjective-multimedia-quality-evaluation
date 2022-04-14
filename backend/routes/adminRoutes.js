const express = require('express');

const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post(
    '/postUploadStimuli',
    [
        body('questionsNormal').notEmpty().withMessage('Please type at least one question.'),
        body('questionsSanity').notEmpty().withMessage('Please type the sanity question.')
    ],
    adminController.postUploadStimuli
);


module.exports = router;
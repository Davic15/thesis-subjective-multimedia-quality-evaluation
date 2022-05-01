const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin');
const router = express.Router();

router.post(
    '/postAddStimulus',
    [
        body('url').notEmpty().isURL().withMessage('Please provide an url with an image.'),
        body('type').notEmpty().withMessage('Please enter stimulus type for this image.'),
        body('sanity').isBoolean().withMessage('Please provide a correct option.')
    ],
    adminController.postAddStimulus
);

router.post(
    '/postAddQuestion',
    [
        body('question').notEmpty().withMessage('Please prove a valid question.')
    ],
    adminController.postAddQuestion
);

module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin');
const router = express.Router();

router.post(
    '/postAddStimulus',
    [
        body('url').notEmpty().isURL().withMessage('Please provide an url with an image.'),
        body('type').notEmpty().isArray().withMessage('Please enter stimulus type for this image.'),
        body('sanity').isBoolean().withMessage('Please provide a correct option.')
    ],
    adminController.postAddStimulus
);

router.post(
    '/postAddQuestion',
    [
        body('question').notEmpty().withMessage('Please provide a valid question.')
    ],
    adminController.postAddQuestion
);

router.post(
    '/postTypesStimulus',
    [
        body('typeStimulus').notEmpty().isArray().withMessage('Please prive a type/types por each stimulus.')
    ],
    adminController.postTypesStimulus
);

module.exports = router;
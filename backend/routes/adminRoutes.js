const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin');
const router = express.Router();

router.post(
    '/postAddStimulus',
    [
        body('url').notEmpty().isURL().withMessage('Please provide an url with an image.'),
        body('typeId').notEmpty().withMessage('Please enter stimulus type for this image.')
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
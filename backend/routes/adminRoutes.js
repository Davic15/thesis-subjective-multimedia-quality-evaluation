const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin');
const router = express.Router();

//* It save a new stimulus.
router.post(
    '/postAddStimulus',
    [
        body('url').notEmpty().isURL().withMessage('Please provide an url with an image.'),
        body('typeId').notEmpty().withMessage('Please enter stimulus type for this image.')
    ],
    adminController.postAddStimulus
);

//* It saved question to be used with the stimulus.
router.post(
    '/postAddQuestion',
    [
        body('question').notEmpty().withMessage('Please provide a valid question.')
    ],
    adminController.postAddQuestion
);

//* It saved the array with types to be used with the stimulus.
router.post(
    '/postTypesStimulus',
    [
        body('typeStimulus').notEmpty().isArray().withMessage('Please prive a type/types por each stimulus.')
    ],
    adminController.postTypesStimulus
);

module.exports = router;
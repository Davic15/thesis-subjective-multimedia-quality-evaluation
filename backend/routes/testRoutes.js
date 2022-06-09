const express = require('express');
const { body, query } = require('express-validator');
const testController = require('../controllers/test');
const isAuth = require('../middleware/is-auth');
const router = express.Router()

//For the future, add an extra secuity checking if the email is valid. https://github.com/mfbx9da4/deep-email-validator

//* Just for testing purposes.
router.get('/getStimuliTest', isAuth, testController.getStimuli);

//* Save the information for every new user who enters the system.
router.post(
    '/postUserInformation', 
    [
        body('email').trim().normalizeEmail().isEmail().notEmpty().withMessage('Please provide a valid email address.'),
        body('age').trim().isNumeric().notEmpty().withMessage('Please provide a valid age.'),
        body('gender').trim().isString().notEmpty().withMessage('Please provide a valid gender.')
    ],
    testController.postUserInformation
);

//* It privides the next/next stimulus/stimuli to work with.
router.get('/getNextItems', isAuth,
    [
        query('userId').trim().notEmpty().withMessage('Please provide a valid userId.'),
        query('numStimulus').trim().notEmpty().isInt({ min: 1, max: 2}).withMessage('Please provided a number of stimuli to get from the database.'),
        query('typeStimulus').trim().notEmpty().withMessage('Please provided a set of types to find')
    ],
    testController.getNextItems
);

module.exports = router;
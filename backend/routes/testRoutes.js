const express = require('express');
const { body, query } = require('express-validator');
const testController = require('../controllers/test');
const isAuth = require('../middleware/is-auth');
const router = express.Router()

//router.get('/getStimuliTest', isAuth, testController.getStimuli);
router.get('/getStimuliTest', isAuth, testController.getStimuli);



router.post(
    '/postUserInformation', 
    [
        body('email').trim().normalizeEmail().isEmail().notEmpty().withMessage('Please provide a valid email address.'),
        body('age').trim().isNumeric().notEmpty().withMessage('Please provide a valid age.'),
        body('gender').trim().isString().notEmpty().withMessage('Please provide a valid gender.')
    ],
    testController.postUserInformation
);

//router.post('/postAnswers', testController.postAnswers);


//router.get('/getNextItems', isAuth, testController.getNextItems);
//router.get('/getNextItems/:userId', isAuth, testController.getNextItems);
router.get('/getNextItems', isAuth,
    [
        query('userId').trim().notEmpty().withMessage('Please provide a valid userId.'),
        query('numStimulus').trim().notEmpty().isInt({ min: 1, max: 2}).withMessage('Please provided a number of stimuli to get from the database.'),
        query('typeStimulus').trim().notEmpty().withMessage('Please provided a set of types to find')
    ],
    testController.getNextItems
);



module.exports = router;
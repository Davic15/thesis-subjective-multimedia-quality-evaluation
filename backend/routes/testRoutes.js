const express = require('express');
const { body } = require('express-validator');
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
router.get('/getNextItems/:userId', isAuth, testController.getNextItems);



module.exports = router;
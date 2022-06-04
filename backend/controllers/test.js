
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Stimuli = require('../models/stimulus');
const User = require('../models/user');
const Response = require('../models/response');
const Answer = require('../models/answer');

const objectId = mongoose.Types.ObjectId;

//* Get all stimuli array (testing)
exports.getStimuli = (req, res, next) => {
    console.log('Get Stimuli');
    Stimuli.find()
    .then(stimuli => {
        if(stimuli.length === 0) {
            const error = new Error('No stimuli on the database. Please contact the administrator.');
            error.statusCode = 404;
            throw error; 
        }
        console.log(stimuli);
        res.status(200).json({
            message: 'Fetched stimuli successfully.',
            stimuli: stimuli
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

/**
 * postUserInformation method
 * * It saves user basic information. The email should be unique otherwise an error will be thrown.
 */
exports.postUserInformation = (req, res, next) => {
    console.log('Post user information');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const email = req.body.email;
    const age = req.body.age;
    const gender = req.body.gender;

    User.findOne({ email: email })
    .then(userFound => {
        if(userFound) {
            const error = new Error('User already exists in the database.');
            error.statusCode = 409;
            throw error;
        }
        const user = new User ({
            email: email,
            gender: gender,
            age: age
        });
        return user.save();
    })
    .then(user => {
        console.log('User information saved!');
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'secret', { expiresIn: '1h'} );

        res.status(201).json({ 
            message: 'User information saved!',
            email: user.email,
            userId: user._id,
            token: token
        });
        //res.status(200).json({ token: token, userId: user._id.toString() })
        console.log(token)
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//* Get the stimuli to display. (Random)
exports.getNextItems = (req, res, next) => {
    // 1) check if this is the first time that user runs the application
    //  1.1) Check in the table Answer if the user has already a answer saved
    // use the user id as parameter (after register to check if in the table answer we have that user_id)
    console.log("Get Next Items");
    /*Answer.aggregate([{
        $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "_id",
            as: "newArray"
        }
    }]);*/
    const userId = req.params.userId;
    console.log(userId);

    /*const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const userId = req.params.userId;

    Answer.findOne({ user_id: userId })
    .then(userFound => {
        if(userFound) {
            const error = new Error('User has some data in the table Answer.');
            error.statusCode = 409;
            throw error;
        }*/
        /*const user = new User ({
            email: email,
            gender: gender,
            age: age
        });*/
        /*return ;
    })*/


    // 2) If so, pick and response with two stimuli (same tipe)
    // 3) else response with a new stimulus (or two new stimuli)
    // Hints: Check in the table answer if the user has
}


















/*
exports.postAnswers = (req, res, next) => {
    console.log('Entering post Answer');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.')
        error.statusCode = 422;
        throw error;
    }
    const userId = objectId(req.body.userId);
    const stimuliId = objectId(req.body.stimuliId);
    const answerNormal = req.body.answerNormal;
    const answerSanity = req.body.answerSanity;

    const response = new Response({
        user_id: userId,
        stimuli_id: stimuliId,
        answer_normal: answerNormal || 'N/A',
        answer_sanity: answerSanity || 'N/A'
    });

    Stimuli.findById(stimuliId)
    .then(stimuli => {
        if (!stimuli) {
            const error = new Error('Could not find that stimuli in the database.');
            error.statusCode = 404;
            throw error;
        }
        return response.save()
    })
    .then(response => {
        console.log(response)
        res.status(200).json({ 
            message: 'Response saved!',
            responseId: response._id
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })

}*/
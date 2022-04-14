const path = require('path');

const { validationResult } = require('express-validator');

const Stimuli = require('../models/stimuli');

exports.postUploadStimuli = (req, res, next) => {
    console.log('Entering upload Stimuli method.');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (req.files.length === 0) {
        const error = new Error('No stimuli provided.');
        throw error;
    }
    if (req.files.length === 1) {
        const error = new Error('A stimuli is missing, or a wrong type of file was provided.');
        throw error;
    }

    const stimuliPath = req.files.map( file => (file.path))
    const questionsNormal = req.body.questionsNormal;
    const questionsSanity = req.body.questionsSanity;

    const stimuli = new Stimuli({
        path: stimuliPath,
        questions_normal: questionsNormal,
        questions_sanity: questionsSanity
    })

    stimuli.save()
    .then(result => {
        res.status(201).json({
            message: 'Stimuli uploaded successfuly'
        });
        console.log(result);
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
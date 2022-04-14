const path = require('path');

const Stimuli = require('../models/stimuli');

exports.uploadStimuli = (req, res, next) => {
    console.log('Entering upload Stimuli method.');
    if (req.files.length === 0) {
        const error = new Error('No stimuli provided.');
        throw error;
    }
    if (req.files.length === 1) {
        const error = new Error('A stimuli is missing, or a wrong type of file was provided.');
        throw error;
    }

    const stimuliPath = req.files.map( file => (file.filename))
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
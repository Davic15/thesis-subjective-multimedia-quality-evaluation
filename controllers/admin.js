const path = require('path');

const Stimuli = require('../models/stimuli');

exports.uploadStimuli = (req, res, next) => {
    console.log(req.files)
    if (req.files.length === 0) {
        const error = new Error('No stimuli provided.');
        throw error;
    }
    if (req.files.length === 1) {
        const error = new Error('A stimuli is missing.');
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
            message: 'Stimuli uploaded successfuly',
            action: 'Upload stimuli'
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

const Stimuli = require('../models/stimuli');

exports.getStimuli = (req, res, next) => {
    console.log('Get Stimuli');
    Stimuli.find()
    .then(stimuli => {
        if(stimuli.length === 0) {
            const error = new Error('No stimuli on the database. Please get in touch with the administrator');
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
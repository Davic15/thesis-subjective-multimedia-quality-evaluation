
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Stimulus = require('../models/stimulus');
const User = require('../models/user');
const Response = require('../models/response');
const Answer = require('../models/answer');
const Type = require('../models/type');
const Test = require('../models/test');

const objectId = mongoose.Types.ObjectId;

//* Get all stimuli array (testing)
exports.getStimuli = async (req, res, next) => {
    console.log('Get Stimuli');
    try {
        const stimuli = await Stimulus.find();
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
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * postUserInformation method
 * * It saves user basic information. The email should be unique otherwise an error will be thrown.
 */
exports.postUserInformation = async (req, res, next) => {
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
    
    try{
        const userFound = await User.findOne({ email: email});
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
        await user.save();
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
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//* Get the stimuli to display. (Random)
exports.getNextItems = (req, res, next) => {
    // 1) check if this is the first time that user runs the application (to send 2 stimuli)
    //  1.1) Check in the table Answer if the user has already a answer saved
    // use the user id as parameter (after register to check if in the table answer we have that user_id)
    console.log("Get Next Items");
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const userId = objectId(req.query.userId);
    const numStimulus = req.query.numStimulus;
    const typeStimulus = req.query.typeStimulus.split(',');
    let randomFirstTime;
    Answer.findOne({ user_id: userId })
    .then(userFound => {
        
        if(userFound) {
            console.log("User found on the database");
            // Get the previous types and generate new random types to display
        } else {
            console.log("New user");
            // Find some types (randomly) to display. Check the type table.
            Type.aggregate([{ $sample: { size: 1 } }])
            .then(typeRandom => {
                if(typeRandom.length === 0){
                    const error = new Error('No types on the database. Please contact the administrator.');
                    error.statusCode = 404;
                    throw error;
                }
                console.log(typeRandom);
                /*res.status(200).json({
                    typeRandom: typeRandom
                })*/
                return typeRandom;
            })
            .then((x) => {
                let valor = JSON.parse(x);
                randomFirstTime = valor;
                return valor;
            })
            .catch(err => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
        }
        console.log("aqui"+randomFirstTime)
        Stimulus.aggregate([
            { $sample:{ size: parseInt(numStimulus) } },
            { $set: { exclude: false } },
            {
                $lookup: {
                    from: 'types',
                    localField: '_id',
                    foreignField: 'type_id',
                    pipeline: [{
                        $match: {
                            type_text: {
                                $in: [typeStimulus]
                            } 
                        },
                    }],
                    as: 'setStimuli',
                },    
            },
            {
                $lookup: {
                    from: 'questions',
                    localField: "question_id",
                    foreignField: "_id",
                    as: "questionStimulus"
                }
            },
            { $unwind: '$questionStimulus' },
            {
                $lookup: {
                    from: 'types',
                    localField: "type_id",
                    foreignField: "_id",
                    as: "typeStimulus"
                }
            },
            { $unwind: '$typeStimulus' },
        ])
        .then(stimulus => {
            if(stimulus.length === 0) {
                const error = new Error('There is a problem getting data. Please contact the administrator.');
                error.statusCode = 404;
                throw error;
            }
            //console.log(stimulus);
            res.status(200).json({
                message: 'Fetched first stimulus',
                stimulus: stimulus
            })
            //firstStimulus = stimulus;
            //console.log(JSON.stringify(firstStimulus[0]._id))
            return stimulus;
        })
        .then(res => {
            console.log(JSON.stringify(res))
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Stimulus = require('../models/stimulus');
const Question = require('../models/question');
const Type = require('../models/type');

const objectId = mongoose.Types.ObjectId;

//* Add Stimulus
exports.postAddStimulus = (req, res, next) => {
    console.log('Entering Add Stimulus method.');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const questionId = objectId(req.body.questionId);
    const url = req.body.url;
    //const type = req.body.type.split(' ');
    const type = req.body.type;
    //const sanity = req.body.sanity;
    console.log(type);
    console.log(req.body);

    Question.findById(questionId)
    .then(question => {
        if(!question) {
            const error = new Error ('Could not find a question.');
            error.statusCode = 404;
            throw Error;
        }        
        const stimulus = new Stimulus({
            url: url,
            question_id: questionId,
            type_id: type
        });
        return stimulus.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Stimulus uploaded successfully!',
            stimulusId: result._id
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};


//* Add questions
exports.postAddQuestion = (req, res, next) => {
    console.log('Entering Add question method.');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const questionBody = req.body.question;
    const question = new Question({
        text_question: questionBody
    });

    question.save()
    .then(question => {
        res.status(201).json({
            message: 'Question added successfully.',
            questionId: question._id
        })
        console.log(question);
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.postTypesStimulus = (req, res, next) => {
    console.log("Entering add Type per Stimulus");
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw Error;
    }
    const typeText = req.body.typeStimulus.toString().split(',');
    console.log(typeText)
    const type = new Type({
        type_text: typeText
    });
    type.save()
    .then(type => {
        res.status(201).json({
            message: 'Type added successfully',
            typeId: type._id
        })
        console.log(type);
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}
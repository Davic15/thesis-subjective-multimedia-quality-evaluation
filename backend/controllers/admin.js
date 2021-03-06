const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Stimulus = require('../models/stimulus');
const Question = require('../models/question');
const Type = require('../models/type');

const objectId = mongoose.Types.ObjectId;

//* Add Stimulus
exports.postAddStimulus = async (req, res, next) => {
    console.log('Entering Add Stimulus method.');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const questionId = objectId(req.body.questionId);
    const url = req.body.url;
    const typeId = objectId(req.body.typeId);
    try {
        const question = await Question.findById(questionId);
        if(!question) {
            const error = new Error ('Could not find a question.');
            error.statusCode = 404;
            throw error;
        }
        const stimulus = new Stimulus({
            url: url,
            question_id: questionId,
            type_id: typeId
        });
        await stimulus.save();
        res.status(200).json({
            message: 'Stimulus created successfully!',
            stimulusId: stimulus._id
        });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


//* Add questions
exports.postAddQuestion = async (req, res, next) => {
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
    try {
        await question.save();
        res.status(201).json({
            message: 'Question added successfully.',
            questionId: question._id
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//* Add Types
exports.postTypesStimulus = async (req, res, next) => {
    console.log("Entering add Type per Stimulus");
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }
    const typeText = req.body.typeStimulus.toString().split(',');
    const type = new Type({
        type_text: typeText
    });
    try {
        await type.save();
        res.status(201).json({
            message: 'Type added successfully',
            typeId: type._id
        })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
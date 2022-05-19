const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stimulusSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        require: true
    },
    type_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Type',
            require: true
        }
    ]
});

module.exports = mongoose.model('Stimulus', stimulusSchema);
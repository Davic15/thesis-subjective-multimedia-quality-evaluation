const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stimulusSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    type: [
        {
            type: String,
            required: true
        }
    ],
    sanity: {
        type: Boolean,
        require: true
    },
});

module.exports = mongoose.model('stimulus', stimulusSchema);
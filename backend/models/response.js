const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        require: true
    },
    response_choice: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Response', responseSchema);
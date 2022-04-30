const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    stimulus_1_id: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        require: true
    },
    stimulus_2_id: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        require: true
    },
    response_id: {
        type: Schema.Types.ObjectId,
        ref: 'Response',
        require: true
    },
    answer_number: {
        type: Number,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);
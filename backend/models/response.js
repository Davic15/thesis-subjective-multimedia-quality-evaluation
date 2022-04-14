const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    stimuli_id: {
        type: Schema.Types.ObjectId,
        ref: 'Stimuli',
        require: true
    },
    answer_normal: [
        {
            type: String,
            require: true
        }
    ],
    answer_sanity: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Response', responseSchema);
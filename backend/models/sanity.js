const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sanitySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    stimulus_id: {
        type: Schema.Types.ObjectId,
        ref: 'Stimulus',
        require: true
    },
    answer_option: {
        type: String,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Sanity', sanitySchema);
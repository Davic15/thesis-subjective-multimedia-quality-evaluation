const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sanityQuestionForStimulusSchema = new Schema({
    stimulus_id: {
        type: Schema.Types.ObjectId,
        ref: 'Stimulus',
        require: true
    },
    sanity_question_string: {
        type: String,
        require: true,
    },
    option_one: {
        type: String,
        require: true
    },
    option_two: {
        type: String,
        require: true
    },
    option_three: {
        type: String,
        require: true
    },
    correct_option: {
        type: String,
        require: true
    }
})
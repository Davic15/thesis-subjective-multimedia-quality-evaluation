const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    stimulus_1_id: {
        type: Schema.Types.ObjectId,
        ref: 'Stimulus',
        require: true
    },
    stimulus_2_id: {
        type: Schema.Types.ObjectId,
        ref: 'Stimulus',
        require: true
    },
    order_number: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Test', testSchema);
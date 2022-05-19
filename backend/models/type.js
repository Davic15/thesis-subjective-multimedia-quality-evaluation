const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    stimulus_type: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Type', typeSchema);
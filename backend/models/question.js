const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text_question: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Question', questionSchema);
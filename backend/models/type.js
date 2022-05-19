const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    type_text: [
        {
            type: String,
            require: true
        }
    ]
});

module.exports = mongoose.model('Type', typeSchema);
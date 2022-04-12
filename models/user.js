const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    about: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
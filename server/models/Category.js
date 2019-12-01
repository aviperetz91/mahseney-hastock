const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);
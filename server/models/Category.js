const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
    title: String,
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);
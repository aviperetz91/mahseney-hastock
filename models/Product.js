const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// Create Schema
const ProductSchema = new mongoose.Schema({
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    shipping: {
        required: false,
        type: Boolean
    }

}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);
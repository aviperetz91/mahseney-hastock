const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// Create Schema
const ProductSchema = new mongoose.Schema({
    category: {
        type: ObjectId,
        ref: "Category",
    },
    title: String,
    photo: {
        data: Buffer,
        contentType: String
    },
    description: String,
    price: Number,
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    shipping: Boolean,
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);
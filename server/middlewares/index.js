const expressJwt = require('express-jwt');  // For authorization check

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        req.category = category;
        next();
    });
};

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product;
            next();
        });
};

exports.requireLogin = expressJwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }

    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        })
    }

    next();
}


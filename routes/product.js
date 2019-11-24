const express = require('express');
const router = express.Router();
const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');

// Load Middlewares
const { userById, productById, requireLogin, isAuth, isAdmin } = require('../middlewares');

// Load Input Validation
const validateProductInput = require('../validation/product');

// Load Category model
const Product = require('../models/Product');


// @route   GET api/product/:productId
// @desc    Get spesific product
// @access  Public
router.get('/product/:productId', (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
});


// @route   POST api/product/create/:userId
// @desc    Create product
// @access  Private
router.post('/product/create/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            errors.email = 'Image size should be less than 1MB';
            return res.status(400).json(errors);
        }

        const { errors, isValid } = validateProductInput(fields);

        // Check validation
        if(!isValid) {
            return res.status(400).json(errors);
        }

        let product = new Product(fields);
        
        // Check if there is a photo
        if(files.photo) {
            // Limits the image size to 1 MB
            if(files.photo.size > 1000000) {
                errors.email = 'Image could not be uploaded';
                return res.status(400).json(errors);
            }
            // Get access to file system in order to add the path to the product object
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type
        } 
        
        product.save()
            .then(product => res.json(product))
            .catch(err =>  console.log(err))
    })

});


// @route   PUT api/product/:productId/:userId
// @desc    Update product
// @access  Private
router.put('/product/:productId/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            errors.email = 'Image size should be less than 1MB';
            return res.status(400).json(errors);
        }

        const { errors, isValid } = validateProductInput(fields);

        // Check validation
        if(!isValid) {
            return res.status(400).json(errors);
        }

        let product = req.product;

        // Replacing product fields with the new fields
        product = _.extend(product, fields);

        // Check if there is a photo
        if(files.photo) {
            // Limits the image size to 1 MB
            if(files.photo.size > 1000000) {
                errors.email = 'Image could not be uploaded';
                return res.status(400).json(errors);
            }
            // Get access to file system in order to add the path to the product object
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type
        } 
        
        product.save()
            .then(product => res.json(product))
            .catch(err =>  console.log(err))

    })
});


// @route   DELETE api/product/:productId/:userId
// @desc    Delete product
// @access  Private
router.delete('/product/:productId/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    const product = req.product;
    product.remove()
        .then(product => res.json({ 
            msg: `Product ${product.title} deleted`
         }))
        .catch(err => console.log(err));
});


// ********** Sell / Arrival **********
// by sell = /products?sortBy=sold&order=desc&limit=4
// by arrival = /products?sortBy=createdAt&order=desc&limit=4
// if no params are sent, then all products are returned

// @route   GET api/products
// @desc    Get list of products by sell / by arrival
// @access  Public
router.get('/products', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 6;

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err) {
                return res.status(400).json({ error: 'Products not found' });
            }
            res.json(products);
        })
})


// ********** Related Products **********
// it will find the products based on the req product category,
// other products that has the same category will be returned

// @route   GET api/products/related/:productId
// @desc    Get list of related products
// @access  Public
router.get('/products/related/:productId', (req, res) => {
    let limit = req.query.limit ? + req.query.limit : 6;

    // Not include the current product
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id title')
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({ error: 'Products not found' });
        }
        // console.log(products);
        res.json(products);
    })
})

router.param('productId', productById);
router.param('userId', userById);


module.exports = router;


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
            errors.photo = 'העלאת התמונה לא התאפשרה';
            return res.status(400).json(errors);
        }
        
        const { errors, isValid } = validateProductInput(fields, files);

        // Check validation
        if(!isValid) {
            return res.status(400).json(errors);
        }
        
        let product = new Product(fields);
       
        // Check if there is a photo
        if(files.photo) {
            // Limits the image size to 1 MB
            if(files.photo.size > 500000) {
                errors.photo = 'התמונה צריכה להיות בגודל של עד 500kb';
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
    let limit = req.query.limit ? +req.query.limit : undefined;

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
        res.json(products);
    })
})


// @route   GET api/products/categories
// @desc    Get all categories that are used in the product model
// @access  Public
router.get('/products/categories', (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if(err) {
            return res.status(400).json({ error: 'Categories not found' });
        }
        res.json(categories);
    })
})


// ********** List products by user selection **********
// implementation of product search is in react frontend.
// show categories in checkbox and price range in radio buttons.
// as the user clicks on those checkbox and radio buttons
// it will make api request and show the products to users based on what he select

// @route   POST api/products/by/choice
// @desc    List of products by user choice
// @access  Public
router.post('/products/by/selection', (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? +req.body.limit : 100;
    let skip = +req.body.skip;
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
})


// @route   GET api/product/photo/:productId
// @desc    Get product's photo
// @access  Public
router.get('/product/photo/:productId', (req, res, next) => {
    if(req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
})


router.param('productId', productById);
router.param('userId', userById);


module.exports = router;


const express = require('express');
const router = express.Router();

// Load Middlewares
const { userById, productById, requireLogin, isAuth, isAdmin } = require('../middlewares');

// Load Input Validation
const validateProductInput = require('../validation/product');

// Load Category model
const Product = require('../models/Product');


// @route   POST api/product/create/:userId
// @desc    Create product
// @access  Private
router.post('/product/create/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }


});


// @route   PUT api/product/:productId/:userId
// @desc    Update product
// @access  Private
router.put('/product/:productId/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

});


// @route   DELETE api/product/:productId/:userId
// @desc    Delete product
// @access  Private
router.delete('/product/:productId/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    
});


router.param('productId', productById);
router.param('userId', userById);


module.exports = router;


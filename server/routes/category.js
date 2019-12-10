const express = require('express');
const router = express.Router();

// Load Middlewares
const { userById, categoryById, requireLogin, isAuth, isAdmin } = require('../middlewares');

// Load Input Validation
const validateCategoryInput = require('../validation/category');

// Load Category model
const Category = require('../models/Category');


// @route   GET api/categories
// @desc    Get list of categories
// @access  Public
router.get('/categories', (req, res) => {
    Category.find().exec((err, allCategories) => {
        if(err) {
            return res.status(400).json({
                error: 'Somthing went wrong!'
            })
        }

        res.json(allCategories)
    })
});


// @route   GET api/category/:categoryId
// @desc    Get spesific category
// @access  Public
router.get('/category/:categoryId', (req, res) => {
    return res.json(req.category);
});


// @route   POST api/category/create/:userId
// @desc    Create category
// @access  Private
router.post('/category/create/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const title = req.body.title;

    Category.findOne({title})
        .then(category => {
            if(category) {
                errors.title = "כבר קיימת קטגוריה בשם זה"
                return res.status(400).json(errors);
            }
            else {
                const category = new Category(req.body);
                category.save()
                .then(category => res.json(category))
                .catch(err => console.log(err));
            }
        })
});


// @route   PUT api/category/:categoryId/:userId
// @desc    Update category
// @access  Private
router.put('/category/:categoryId/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const category = req.category;
    category.title = req.body.title;
    category.save()
        .then(category => res.json(category))
        .catch(err => console.log(err));
});


// @route   DELETE api/category/:categoryId/:userId
// @desc    Delete category
// @access  Private
router.delete('/category/:categoryId/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    const category = req.category;
    category.remove()
        .then(category => res.json({ 
            msg: `Category ${category.title} deleted`
         }))
        .catch(err => console.log(err));
});


router.param('categoryId', categoryById);
router.param('userId', userById);


module.exports = router;

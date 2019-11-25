const express = require('express');
const router = express.Router();

// Load middlewares
const { userById, requireLogin, isAuth, isAdmin } = require('../middlewares');

// Load User model
const User = require('../models/User');


// @route   GET api/secret/userId
// @desc    Get user
// @access  Private
router.get('/secret/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    return res.json(req.profile);
});


// @route   GET api/secret/userId
// @desc    Allow the users to see their profile 
// @access  Private
router.get('/user/:userId', requireLogin, isAuth, (req, res) => {
    // the hased password will NOT send with the object
    req.profile.password = undefined;
    return res.json(req.profile);
})


// @route   GET api/secret/userId
// @desc    Allow the users to update their profile 
// @access  Private
router.put('/user/:userId', requireLogin, isAuth, (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true }, 
        (err, foundUser) => {
            if(err) {
                return res.status(400).json({ error: 'You are not authorized to perform this action' })
            }

        // the hased password will NOT send with the object
        foundUser.password = undefined;
        res.json(foundUser);
    })
})

router.param('userId', userById);


module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); // to generate signed token

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../Validation/login');

// Load User model
const User = require('../models/User');


// @route   GET api/test
// @desc    Tests auth route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth Works' }));


// @route   GET api/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});


// @route   POST api/login
// @desc    Login user / Returning JWT
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // generate a signed token with user id and secret
                        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

                        // persist the token as 't' in cookie with expiry date
                        res.cookie("t", token, { expire: new Date() + 9999 });

                        // return response with user and token to frontend client
                        const { _id, name, email, role } = user;
                        return res.json({ token, user: { _id, email, name, role } }); 
                    }
                    else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        })
});


// @route   GET api/logout
// @desc    Logout user
// @access  Public
router.get('/logout', (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Logout success" });
})

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); // to generate signed token

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../Validation/login');

// Load User model
const User = require('../models/User');


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
                errors.email = 'האימייל שהזנת כבר קיים במערכת';
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
                errors.email = 'משתמש לא נמצא';
                return res.status(404).json(errors);
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // generate a signed token with user details and secret
                        jwt.sign(
                            { _id: user._id, name: user.name, email: user.email, history: user.history, role: user.role },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    }
                    else {
                        errors.password = 'הסיסמא אינה נכונה';
                        return res.status(400).json(errors);
                    }
                })
        })
});


module.exports = router;
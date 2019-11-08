const express = require('express');
const router = express.Router();

// @route   GET api/cart/test
// @desc    Tests cart route
// @access  Public
router.get('/cart/test', (req, res) => res.json({ msg: 'Cart Works' }));

module.exports = router;

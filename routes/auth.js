const express = require('express');
const router = express.Router();

// @route   GET api/test
// @desc    Tests auth route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth Works' }));

module.exports = router;
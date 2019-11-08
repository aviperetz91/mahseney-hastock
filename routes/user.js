const express = require('express');
const router = express.Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/user/test', (req, res) => res.json({ msg: 'User Works' }));

module.exports = router;

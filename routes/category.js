const express = require('express');
const router = express.Router();

// @route   GET api/category/test
// @desc    Tests category route
// @access  Public
router.get('/category/test', (req, res) => res.json({ msg: 'Category Works' }));

module.exports = router;

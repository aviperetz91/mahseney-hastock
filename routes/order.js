const express = require('express');
const router = express.Router();

// @route   GET api/orders/test
// @desc    Tests orders route
// @access  Public
router.get('/order/test', (req, res) => res.json({ msg: 'Order Works' }));

module.exports = router;

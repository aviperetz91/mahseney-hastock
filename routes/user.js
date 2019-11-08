const express = require('express');
const router = express.Router();
const { userById, requireLogin, isAuth, isAdmin } = require('../middlewares');


router.param('userId', userById);

// @route   GET api/test/userId
// @desc    Tests route
// @access  Private
router.get('/test/:userId', requireLogin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

module.exports = router;

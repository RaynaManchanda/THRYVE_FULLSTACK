const express = require('express');
const router = express.Router();
const User = require('../models/User');

// show login page
router.get('/', (req, res) => {
    res.render('login');
});

// save login input into DB
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Save the login data
        await User.create({ email, password });

        console.log("Saved to database:", email, password);

        // redirect back to dashboard like before
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.send("Error saving data");
    }
});

module.exports = router;

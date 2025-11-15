const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('index', { 
        active: 'home', 
        title: 'Home' 
    });
});

// Dashboard Page
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { 
        active: 'dashboard', 
        title: 'Dashboard' 
    });
});

module.exports = router;

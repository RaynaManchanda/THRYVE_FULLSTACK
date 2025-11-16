const express = require('express');
const router = express.Router();

// Home Page
router.get('/index', (req, res) => {
    res.render('index', { 
        active: 'index', 
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

// Logout Page
router.get('/login', (req, res) => {
    res.render('login', { 
        active: 'login', 
        title: 'Login' 
    });
});


const express = require('express');
const router = express.Router();

const recoveryController = require('../controllers/recoveryController');

// Recovery Page
router.get('/', (req, res) => {
    recoveryController.index(req, res);
});

module.exports = router;

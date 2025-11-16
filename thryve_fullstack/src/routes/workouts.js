const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');

// Get all workouts
router.get('/', workoutController.getAll);

// Create new workout
router.post('/', workoutController.create);

// Update workout
router.post('/update/:id', workoutController.update);

// Delete workout
router.get('/delete/:id', workoutController.remove);

// Start workout page
router.get('/start-workout', (req, res) => {
    res.render('start-workout', { 
        active: 'start', 
        title: 'Start Workout' 
    });
});

module.exports = router;

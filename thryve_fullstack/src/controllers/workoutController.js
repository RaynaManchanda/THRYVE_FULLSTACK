const Workout = require('../models/Workout');

// Show dashboard with workouts
exports.getAll = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 }).limit(100);
    res.render('dashboard', { 
        active: 'dashboard', 
        title: 'Dashboard', 
        workouts 
    });
};

// Create new workout
exports.create = async (req, res) => {
    await Workout.create(req.body);
    res.redirect('/workouts');
};

// Update workout
exports.update = async (req, res) => {
    await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/workouts');
};

// Delete workout
exports.remove = async (req, res) => {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/workouts');
};

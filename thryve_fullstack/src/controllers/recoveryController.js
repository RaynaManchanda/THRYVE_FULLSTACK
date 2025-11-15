const Sleep = require('../models/Sleep');

exports.index = async (req, res) => {
    const sleeps = await Sleep.find().sort({ date: -1 }).limit(20);
    res.render('recovery', { 
        active: 'recovery', 
        title: 'Recovery',
        sleeps 
    });
};

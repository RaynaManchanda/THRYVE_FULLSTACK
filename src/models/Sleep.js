const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SleepSchema = new Schema({
    date: { type: Date, default: Date.now },
    durationMinutes: Number,
    quality: String,
    stages: Object
});

module.exports = mongoose.model('Sleep', SleepSchema);

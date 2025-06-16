const mongoose = require('mongoose');

const droneUsageSchema = new mongoose.Schema({
    droneID: { type: String, required: true, unique: true },
    remaining: { type: Number, required: true }
});

const DroneUsage = mongoose.model('DroneUsage', droneUsageSchema);
module.exports = DroneUsage;
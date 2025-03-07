// Team Model
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
        default: 0, // Optional: default value for priority
    },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
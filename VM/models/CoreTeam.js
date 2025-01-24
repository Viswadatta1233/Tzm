const mongoose = require('mongoose');

const coreTeamSchema = new mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.model('CoreTeam', coreTeamSchema);
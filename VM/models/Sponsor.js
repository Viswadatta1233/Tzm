const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Sponsor', sponsorSchema);
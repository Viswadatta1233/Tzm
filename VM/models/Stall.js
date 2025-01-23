const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    position: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Stall', stallSchema);

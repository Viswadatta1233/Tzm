const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tzId: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }, // Added name field
    branch: { type: String,default:''},
    year: { type: Number, required: true },
    phone: { type: String},
    club: { type: String},
    role: { type: String, enum: ['Volunteer', 'Core Team', 'Admin']},
    photo: { type: String ,default:''},
    creditScore: { type: Number, default: 0 },
    original:{ type: String}
});

module.exports = mongoose.model('User', userSchema);

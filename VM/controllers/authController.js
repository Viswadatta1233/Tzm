/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
};

// Helper function to generate a password
const generatePassword = () => {
    return `TZP${Math.floor(1000 + Math.random() * 9000)}`; // Example: TZP1234
};

// Add a new user (only for admins)
// Add a new user (only for admins)
exports.addUser = async (req, res) => {
    const { name, branch, year, phone, club, role, photo } = req.body;
    console.log(req.body);

    try {
        const tzId = `TZ25V${Date.now() % 100000}`; // Generate unique tzId
        const password = generatePassword(); 
        const original = password;
        console.log(password); 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure year is stored as a number
        let numericYear;
        if (typeof year === "number") {
            numericYear = year; // Directly use if it's a number
        } else if (typeof year === "string") {
            numericYear = parseInt(year.match(/\d+/)?.[0]); // Extract number if it's a string
        }

        if (isNaN(numericYear)) {
            return res.status(400).json({ message: "Invalid year format. Year should be a number." });
        }

        const user = new User({
            tzId,
            name,
            password: hashedPassword,
            branch,
            year: numericYear, // Store as number
            phone,
            club,
            role,
            photo, // Save photo URL from request
            original
        });

        console.log(user);
        await user.save();

        res.status(201).json({
            message: 'User added successfully',
            tzId,
            password: `Generated password is: ${password}`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Login user and set JWT in cookie
exports.loginUser = async (req, res) => {
    const { tzId, password } = req.body;
    try {
        const user = await User.findOne({ tzId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a token
        const token = generateToken(user._id);

        // // Set token in a cookie
        // res.cookie(process.env.COOKIE_NAME, token, {
        //     httpOnly: true,
        //     maxAge: 3600000, // 1 hour
        // });

        res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout user by clearing the cookie
exports.logoutUser = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({ message: 'Logged out successfully' });
};

// Upload photo
exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        console.log(req.file);

        // Update user's photo field in the database
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { photo: req.file.path },
            { new: true }
        );
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        console.log(user.photo)
        res.status(200).json({ message: 'Photo uploaded successfully', photo: user.photo });
    } catch (error) {
        res.status(500).json({ message: 'Server error now' });
    }
};
exports.viewVolunteers = async (req, res) => {
    try {
        // Fetch all users with the role of 'Volunteer'
        const volunteers = await User.find({ role: 'Volunteer' }); 

        if (volunteers.length === 0) {
            return res.status(404).json({ message: 'No volunteers found' });
        }

        res.status(200).json({
            message: 'Volunteers retrieved successfully',
            count: volunteers.length,
            volunteers,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.updateVolunteer = async (req, res) => {
    try {
        const { tzId } = req.params;
        const updates = req.body; // Fields to update

        // Find and update the volunteer
        const updatedVolunteer = await User.findOneAndUpdate(
            { tzId, role: 'Volunteer' },
            updates,
            { new: true, runValidators: true } // Return the updated document
        ).select('-password'); // Exclude password from response

        if (!updatedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json({
            message: 'Volunteer updated successfully',
            volunteer: updatedVolunteer,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.deleteVolunteer = async (req, res) => {
    try {
        const { tzId } = req.params;

        // Find and delete the volunteer
        const deletedVolunteer = await User.findOneAndDelete({ tzId, role: 'Volunteer' });

        if (!deletedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteVolunteers = async (req, res) => {
    try {
        const result = await User.deleteMany({ role: "Volunteer" });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No Volunteers found to delete." });
        }

        res.status(200).json({
            message: `${result.deletedCount} Volunteer(s) deleted successfully.`,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

/* eslint-disable no-undef */
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: '*', // Allow all origins
    // git // Allow credentials (cookies, etc.)
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stalls', require('./routes/stallRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/sponsors', require('./routes/sponsorRoutes'));
app.use('/api/coreteam', require('./routes/coreTeamRoutes'));
app.use('/api/messages', messageRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} and hi`);
});

// routes/coreTeamRoutes.js
const express = require('express');
const router = express.Router();
const { createCoreTeam, getCoreTeam, updateCoreTeam, deleteCoreTeam } = require('../controllers/coreTeamController');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new core team member
router.post('/', authenticate, createCoreTeam);

// Get all core team members
router.get('/', authenticate, getCoreTeam);

// Update a core team member
router.put('/:id', authenticate, updateCoreTeam);

// Delete a core team member
router.delete('/:id', authenticate, deleteCoreTeam);

module.exports = router;

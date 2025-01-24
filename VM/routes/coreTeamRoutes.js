// routes/coreTeamRoutes.js
const express = require('express');
const router = express.Router();
const { createCoreTeam, getCoreTeam, updateCoreTeam, deleteCoreTeam } = require('../controllers/coreTeamController');
// const { authenticate } = require('../middleware/authMiddleware');

// Create a new core team member
router.post('/', createCoreTeam);

// Get all core team members
router.get('/',getCoreTeam);

// Update a core team member
router.put('/:id', updateCoreTeam);

// Delete a core team member
router.delete('/:id', deleteCoreTeam);

module.exports = router;

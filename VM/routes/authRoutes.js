/* eslint-disable no-undef */
const express = require('express');
const { addUser, loginUser, logoutUser, uploadPhoto,viewVolunteers,updateVolunteer,deleteVolunteer,deleteVolunteers} = require('../controllers/authController');
const { authenticate, isAuthorized } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post('/add', addUser); // Allow Admins and Coordinators
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);
router.post('/upload-photo', upload.single('photo'), uploadPhoto);
router.get('/volunteers',viewVolunteers);
router.put('/volunteers/:tzId', updateVolunteer);
router.delete('/volunteers/:tzId',deleteVolunteer);


router.delete('/deleteall', deleteVolunteers);

module.exports = router;

/* eslint-disable no-undef */
const express = require('express');
const { addUser, loginUser, logoutUser, uploadPhoto,viewVolunteers,updateVolunteer,deleteVolunteer} = require('../controllers/authController');
const { authenticate, isAuthorized } = require('../middlewares/authMiddleware');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post('/add', authenticate, isAuthorized, addUser); // Allow Admins and Coordinators
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);
router.post('/upload-photo', authenticate, upload.single('photo'), uploadPhoto);
router.get('/volunteers', authenticate,isAuthorized,viewVolunteers);
router.put('/volunteers/:tzId',updateVolunteer);
router.delete('/volunteers/:tzId', deleteVolunteer);

module.exports = router;

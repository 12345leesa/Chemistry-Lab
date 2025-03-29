const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    protect, 
    getUserProfile,
    updateUserProfile
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
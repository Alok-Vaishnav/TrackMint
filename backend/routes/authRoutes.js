const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/**
 * Authentication Routes
 */

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// POST /api/auth/logout - Logout user
router.post('/logout', authController.logout);

// GET /api/auth/me - Get current user (protected)
router.get('/me', verifyToken, authController.getMe);

module.exports = router;

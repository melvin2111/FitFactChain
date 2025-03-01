const express = require('express');
const {
  registerUser,
  loginUser,
  registerDoctor,
  loginDoctor,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// User routes
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);

// Doctor routes
router.post('/doctors/register', registerDoctor);
router.post('/doctors/login', loginDoctor);

// Protected route
router.get('/me', protect, getMe);

module.exports = router;
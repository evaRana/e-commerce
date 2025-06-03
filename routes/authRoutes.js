const express = require('express');
const { login, register,sendOtp, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/send-otp', sendOtp);

router.post('/reset-password', resetPassword);
module.exports = router;

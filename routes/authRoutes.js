const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signUp);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-otp', authController.resendOTP);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forget-password', authController.forgetPassword); 
router.post('/reset-password', authController.resetPassword);


module.exports = router;
const { where } = require('sequelize');
const { User } = require('../models');
const verificationEmailService = require('../services/verificationEmailService');
const passwordResetService = require('../services/passwordResetService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const signUp = async (req, res) => {
    const { name, email, address, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exist' });
        }
        const otp = generateOTP();
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            address,
            password: hashedPassword,
            emailVerificationOTP: otp 
        });
        await verificationEmailService.sendVerificationEmail(email, otp, name);
        res.status(201).json({ message: 'User registered successfully. Verification email sent' });
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.emailVerificationOTP !== otp) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }
        user.emailVerificationOTP = null;
        await user.save();
        user.isEmailVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully. You can now sign in.' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Failed to verify email' });
    }
};

const resendOTP = async (req,res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({error:'User not found'});   
        }
        const newOTP = generateOTP();
        user.emailVerificationOTP = newOTP;
        await user.save();
        await verificationEmailService.sendVerificationEmail(email,newOTP,user.name);
        res.status(200).json({message: 'New OTP sent successfully'})
    } catch (error) {
        console.error('Error resending OTP:',error);
        res.status(500).json({error:'Failed to resend OTP'})
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (!user.isEmailVerified) {
            return res.status(403).json({ error: 'Email not verified' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: `Welcome back, ${user.name}` });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully.', success: true });
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const otp = generateOTP(); 
        user.resetPasswordOTP = otp;
        await user.save();
        await passwordResetService.sendResetPasswordEmail(email, otp, user.name);
        res.status(200).json({ message: 'Reset password OTP sent successfully' });
    } catch (error) {
        console.error('Error sending reset password OTP:', error);
        res.status(500).json({ error: 'Failed to send reset password OTP' });
    }
};

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ where: { email, resetPasswordOTP: otp } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordOTP = null; 
        await user.save();
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};


module.exports = { signUp, verifyEmail, resendOTP, login, logout, forgetPassword, resetPassword};

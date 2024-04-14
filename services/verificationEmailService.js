const emailService = require('./emailService');

const sendVerificationEmail = async (to, otp, userName) => {
  try {
    const message = `
    Dear ${userName},
  
    We're excited to have you join our platform!
  
    Please use the following OTP to verify your email address. Remember, it expires in one minute.
  
    OTP: ${otp}
  
    If you didn't request this OTP, you can safely ignore this email.
  
    Thank you for choosing our platform!
  
    Regards,
    royalRide.
  `;
    await emailService.sendEmail(to, 'Email Verification', message);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error; 
  }
};
module.exports = { sendVerificationEmail };


const emailService = require('./emailService');

const sendResetPasswordEmail = async (to, otp, userName) => {
  try {
    const message = `
      Dear ${userName},
  
      You have requested to reset your password.
  
      Please use the following OTP to reset your password. Remember, it expires in one minute.
  
      OTP: ${otp}
  
      If you didn't request this OTP, you can safely ignore this email.
  
      Thank you.
  
      Regards,
      royalRide.
    `;
    await emailService.sendEmail(to, 'Password Reset OTP', message);
    console.log('Password reset OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
    throw error; 
  }
};

module.exports = { sendResetPasswordEmail };

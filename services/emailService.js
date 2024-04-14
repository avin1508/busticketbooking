const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path'); 

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text
    });
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendEmailWithAttachment = async (to, subject, text, attachmentFileName) => {
  try {
    const pathToAttachment = path.join(__dirname, '..', 'tickets', attachmentFileName); 
    const attachment = fs.readFileSync(pathToAttachment);

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      attachments: [
        {
          filename: attachmentFileName,
          content: attachment, 
        },
      ],
    });
    console.log('Email with attachment sent successfully.');
  } catch (error) {
    console.error('Error sending email with attachment:', error);
    throw error;
  }
};

module.exports = { sendEmail, sendEmailWithAttachment };

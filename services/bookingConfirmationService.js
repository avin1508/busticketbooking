const emailService = require('../services/emailService');
const generateTicketPDF = require('../services/generateTicketPDF');

const sendBookingConfirmation = async (to, userName, bookingDetails) => {
  try {
    const pdfFileName = 'ticket.pdf';

    const filePath = await generateTicketPDF(pdfFileName, bookingDetails);

    const message = `
      Dear ${userName},

      Your ticket has been successfully booked. Please find the attached ticket PDF for details.

      Thank you for choosing our service.

      Regards,
      royalRider
    `;

    await emailService.sendEmailWithAttachment(to, 'Ticket Booking Confirmation', message, pdfFileName, filePath);
    console.log('Booking confirmation email with PDF attachment sent successfully.');
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
};

module.exports = { sendBookingConfirmation };

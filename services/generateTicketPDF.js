const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateTicketPDF = (fileName, ticketDetails) => {
    try {
        const filePath = path.join(__dirname, '..', 'tickets', fileName);

        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(filePath));

        const startX = 50;
        const endX = 550;
        const startY = 50;
        const endY = 750;
        const lineGap = 20;
        const columnGap = 250;
        const lineWidth = 1;

        doc.font('Helvetica-Bold').fontSize(18).text('royalRider Bus Ticket', { align: 'center' }).moveDown(0.5);
        
        doc.moveTo(startX, startY + lineGap).lineTo(endX, startY + lineGap).lineWidth(lineWidth).stroke();
        doc.font('Helvetica').fontSize(10)
            .text(`Date: ${ticketDetails.journeyDate}`, startX, startY + 2 * lineGap)
            .text(`Time: ${ticketDetails.journeyTime}`, startX + columnGap, startY + 2 * lineGap)
            .text(`Bus Number: ${ticketDetails.busNumber}`, startX, startY + 3 * lineGap)
            .text(`Seat Number: ${ticketDetails.seatNumber}`, startX + columnGap, startY + 3 * lineGap)
            .text(`Boarding Point: ${ticketDetails.boardingPoint}`, startX, startY + 4 * lineGap)
            .text(`Ending Point: ${ticketDetails.endingPoint}`, startX + columnGap, startY + 4 * lineGap)
            .moveDown(1);

        doc.font('Helvetica').fontSize(10).text('Additional Information:', startX, startY + 6 * lineGap);
        doc.fontSize(10).text('- This ticket is valid for the specified journey only.', startX, startY + 7 * lineGap);
        doc.fontSize(10).text('- Please arrive at the boarding point at least 30 minutes before departure.', startX, startY + 8 * lineGap);

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};

module.exports = generateTicketPDF;

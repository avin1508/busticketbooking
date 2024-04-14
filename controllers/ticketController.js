const { Booking, User } = require('../models');
const bookingConfirmation = require('../services/bookingConfirmationService');

const bookTicket = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { journeyDate, journeyTime, busNumber, seatNumber, boardingPoint, endingPoint } = req.body;
        const formattedJourneyTime = formatJourneyTime(journeyTime);
        const booking = await Booking.create({
            journeyDate,
            journeyTime: formattedJourneyTime,
            busNumber,
            seatNumber,
            boardingPoint,
            endingPoint,
            userId
        });

        const user = await User.findByPk(userId);
        await bookingConfirmation.sendBookingConfirmation(user.email, user.name, booking);
        res.status(200).json({ message: 'Ticket booked successfully' });
    } catch (error) {
        console.error('Error booking ticket:', error);
        res.status(500).json({ error: 'Failed to book ticket' });
    }
};
const formatJourneyTime = (journeyTime) => {
    try {
        const [hours, minutes] = journeyTime.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return date.toISOString().substring(11, 19);
    } catch (error) {
        console.error('Error formatting journeyTime:', error);
        throw new Error('Invalid journeyTime format');
    }
};

module.exports = { bookTicket };

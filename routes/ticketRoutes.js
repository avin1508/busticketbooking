const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyToken = require('../middleware/verifyToken')

// Route for booking a ticket
router.post('/user/:userId/book',verifyToken, ticketController.bookTicket);

module.exports = router;

const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Import cookie-parser

const authRoutes = require('./routes/authRoutes'); // Import the authRoutes
const ticketRoutes = require('./routes/ticketRoutes'); // Import the ticketRoutes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes); // Add ticketRoutes

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});

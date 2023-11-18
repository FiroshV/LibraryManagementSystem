// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const bookRoutes = require('./routes/bookRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes'); 
const bookManagementRoutes = require('./routes/bookManagementRoutes'); 
const Checkout = require('./models/checkout');
const User = require('./models/user');
const cron = require('node-cron');
require('dotenv').config();


const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));


// Middleware
app.use(express.json());

// Routes
app.use('/library', userRoutes);
app.use('/library', bookRoutes);
app.use('/library', checkoutRoutes); 
app.use('/library', bookManagementRoutes); 

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System');
});

// This cron will execute at midnight (00:00) everyday
cron.schedule('0 0 * * *', async () => {
    try {
        const overdueCheckouts = await Checkout.find({ 
            status: 'issued',
            expectedReturnDate: { $lt: new Date() } // expectedReturnDate is earlier than today
        });

        for (const checkout of overdueCheckouts) {
            await User.findByIdAndUpdate(checkout.userId, { $inc: { lateReturnFine: 10 } });
        }
    } catch (error) {
        console.error('CRON job error:', error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Set your timezone
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

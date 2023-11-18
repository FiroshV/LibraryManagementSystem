const Checkout = require('../models/checkout'); 

exports.checkoutBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.userId;

        // Define the number of days for expected return, e.g., 14 days from the checkout date
        const returnPeriod = 14; 

        const checkoutDate = new Date();

        // Constants for time calculations
        const MILLISECONDS_PER_SECOND = 1000;
        const SECONDS_PER_MINUTE = 60;
        const MINUTES_PER_HOUR = 60;
        const HOURS_PER_DAY = 24;

        // Calculate the number of milliseconds in the return period
        const returnPeriodInMilliseconds = returnPeriod * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

        // Calculate the expected return date
        const expectedReturnDate = new Date(checkoutDate.getTime() + returnPeriodInMilliseconds);


        const newCheckout = new Checkout({
            bookId: bookId,
            userId: userId,
            checkoutDate: checkoutDate,
            expectedReturnDate: expectedReturnDate, 
            status: 'issued'
        });

        await newCheckout.save();
        res.status(201).send('Book checked out successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.userId; 

        const checkoutRecord = await Checkout.findOne({ bookId: bookId, userId: userId, status: 'issued' });
        if (!checkoutRecord) {
            return res.status(404).send('No active checkout record found for this book and user');
        }

        checkoutRecord.actualReturnDate = new Date();
        checkoutRecord.status = 'returned';
        await checkoutRecord.save();

        res.send('Book returned successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


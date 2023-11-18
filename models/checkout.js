const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    expectedReturnDate: {
        type: Date,
        required: true
    },
    actualReturnDate: Date,
    status: {
        type: String,
        enum: ['issued', 'returned'],
        required: true
    }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;

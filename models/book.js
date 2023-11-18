const mongoose = require('mongoose');

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: String, // Genre is not marked as required
    publishedDate: {
        type: Date,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0 
    },
    totalCopies: {
        type: Number,
        required: true,
        min: 0 
    }
});

// Create the model from the schema and export it
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

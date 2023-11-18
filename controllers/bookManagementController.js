// bookManagementController.js
const Book = require('../models/book'); // Adjust the path as per your project structure

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a book entirely
exports.updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
        
        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Partially update a book's details
exports.patchBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

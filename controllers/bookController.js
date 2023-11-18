const Book = require('../models/book'); 

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.json(book);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
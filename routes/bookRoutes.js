const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); 
const {verifyToken} = require('../middleware/authMiddleware'); 

router.get('/books', verifyToken, bookController.getBooks);
router.get('/books/:bookId', verifyToken, bookController.getBookById);

module.exports = router;

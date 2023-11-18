const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController'); 
const {verifyToken} = require('../middleware/authMiddleware'); 

router.post('/checkout/:bookId', verifyToken, checkoutController.checkoutBook);
router.post('/checkout/return-book/:bookId', verifyToken, checkoutController.returnBook);

module.exports = router;

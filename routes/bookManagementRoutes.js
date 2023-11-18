const express = require('express');
const router = express.Router();
const bookManagementController = require('../controllers/bookManagementController'); 
const {verifyToken,isAdmin} = require('../middleware/authMiddleware');

router.post('/book', verifyToken, isAdmin, bookManagementController.addBook);
router.put('/:bookId', verifyToken, isAdmin, bookManagementController.updateBook);
router.patch('/:bookId', verifyToken, isAdmin, bookManagementController.patchBook);

module.exports = router;

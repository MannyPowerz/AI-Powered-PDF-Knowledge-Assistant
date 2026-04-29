const upload = require('../middleware/upload');
const verifyPdfContent = require('../middleware/validatePdf');
const handlePdfUpload = require('../controllers/pdfController');

const express = require('express');
const router = express.Router();

router.post('/upload', upload.single('document') , verifyPdfContent, handlePdfUpload);

module.exports = router;
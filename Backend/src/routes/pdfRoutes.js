const upload = require('../middleware/upload');
const verifyPdfContent = require('../middleware/validatePdf');
const { uploadController } = require('../controllers/pdfController');

const express = require('express');
const router = express.Router();

router.post('/upload', upload.single('document') , verifyPdfContent, uploadController);

module.exports = router;
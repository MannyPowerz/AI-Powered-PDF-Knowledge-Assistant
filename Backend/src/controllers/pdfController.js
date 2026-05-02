const { handlePdfService } = require('../services/pdfService');
const { chunkingService } = require('../services/chunkService');
const { vectorizeChunks } = require('../services/embeddingService');

const uploadController = async (req, res, next) => {
    try {
        
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: "No PDF data received." });
        }

        // Call the service with ONLY the buffer
        const pdfData = await handlePdfService(req.file.buffer);
        const chunkedData = await chunkingService(pdfData.text);
        const embedding = await vectorizeChunks(chunkedData);
        
        res.status(201).json({
            status: "Success",
            documentId: "stub-id-replace-later",
            filename: req.file.originalname
        });
    } catch (error) {
        if (error.message === 'PDF_PARSING_FAILED') {
            return res.status(422).json({ error: "The PDF is corrupt or unreadable." });
        }
        next(error);
    }
}

module.exports = {uploadController};
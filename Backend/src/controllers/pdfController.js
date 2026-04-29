const handlePdfUpload = async (req, res) => {
    try {
        
        // Here is where you'd call your future ervice
       
        
        res.status(201).json({
            status: "Success",
            documentId: "stub-id-replace-later",
            filename: req.file.originalname
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error during processing." });
    }
}

module.exports = {handlePdfUpload} ;
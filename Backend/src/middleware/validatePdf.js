const verifyPdfContent = (req, res, next) => {
  // If Multer didn't find a file, skip to the next (or handle error)
  if (!req.file || !req.file.buffer) {
    return res.status(400).send("No file data found.");
  }

  // PDF hex: 25 50 44 46 (which is "%PDF" in ASCII)
  const header = req.file.buffer.toString('hex', 0, 4);
  const pdfMagicBytes = "25504446";

  if (header !== pdfMagicBytes) {
    return res.status(400).send("Security Error: File content does not match PDF signature.");
  }

  next(); // Everything is genuine, move to the route handler
};

// --- Usage in your route ---
// app.post('/upload', upload.single('document'), verifyPdfContent, (req, res) => {
//   res.send("File is a genuine PDF and safe to process.");
// });
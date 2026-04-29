const multer = require('multer');

const storage = multer.memoryStorage()

// Limit file size (e.g., 12MB)
const limits = {
  fileSize: 12 * 1024 * 1024, // 12MB in bytes
};

const fileFilter = (req, file, cb) => {
// 1. Check the file's 'identity' card (mimetype)
  if (file.mimetype === 'application/pdf') {
    // 2. Everything is fine, pass 'true'
    cb(null, true);
  } else {
    // 3. Stop the upload, pass an error and 'false'
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({
     storage: storage,
     limits: limits,
     fileFilter: fileFilter
})

module.exports = upload;
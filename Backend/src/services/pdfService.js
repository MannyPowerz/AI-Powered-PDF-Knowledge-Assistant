const pdf = require('pdf-parse');

{Buffer} fileBuffer

const handlePdfService = async (fileBuffer) => {
    // 1. Defend the function
  if (!fileBuffer || fileBuffer.length === 0) {
    throw new Error('INVALID_BUFFER');
  }

  try {
    // 2. Process the buffer
    // pdf-parse returns a promise that resolves to an object with text, metadata, etc.
    const data =  await pdf(fileBuffer);

    // 3. Transformation logic (Don't just dump the whole object)
    return {
      text: data.text,
      info: data.info,
      pages: data.numpages,
      version: data.version
    };
    
  } catch (error) {
    // Log the actual error for debugging, throw a clean one for the controller
    console.error('PDF Parse Error:', error);
    throw new Error('PDF_PARSING_FAILED');
  }
}

module.exports = { handlePdfService };
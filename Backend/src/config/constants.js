module.exports = {
  // Chunking
  CHUNK_SIZE: 650,        
  CHUNK_OVERLAP: 100,     
  BATCH_SIZE : 32,
  TOP_K: 6,

  // Multer
  MAX_FILE_SIZE: 12 * 1024 * 1024,

  // LanceDB
  DB_PATH: './data/lancedb',
  TABLE_NAME: 'pdf_vectors',

  // Groq
  GROQ_MODEL: 'llama-3.3-70b',

  // Embedding
  EMBEDDING_MODEL: 'BAAI/bge-m3',
  DIMENSION: 1024
};
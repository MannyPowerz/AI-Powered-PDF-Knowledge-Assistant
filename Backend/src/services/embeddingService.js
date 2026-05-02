const { EMBEDDING_MODEL, BATCH_SIZE } = require('../config/constants');

let extractor = null;

const vectorizeChunks = async (chunkedData) => {
    const {pipeline} = await import('@huggingface/transformers');

    if (!extractor) {
        extractor = await pipeline('feature-extraction', EMBEDDING_MODEL )
    }

    const results = [];

    for (let i = 0; i < chunkedData.length; i += BATCH_SIZE) {
        // 1. Slice a small batch of text chunks
        const batchChunks = chunkedData.slice(i, i + BATCH_SIZE);

        const embeddingOutput = await extractor(batchChunks, {
            pooling: 'mean',
            normalize: true 
        });

        batchChunks.forEach((text, index) => {
            results.push({
                text: text,
                vector: Array.from(embeddingOutput[index].data) ,
                metadata: { source: 'pdf_upload' }
            });
        })
    }
    return results;
}

module.exports = {vectorizeChunks};
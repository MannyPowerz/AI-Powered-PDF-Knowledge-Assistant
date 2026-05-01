const { CHUNK_SIZE, CHUNK_OVERLAP } = require('../config/constants');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');

const chunkingService = async (text) => {

    if (!text) {
         throw new Error('NO_TEXT_PROVIDED');
    }

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: CHUNK_SIZE,
        chunkOverlap: CHUNK_OVERLAP 
    })

    const outputChunks = await splitter.splitText(text);

    return outputChunks
};


module.exports = {chunkingService};
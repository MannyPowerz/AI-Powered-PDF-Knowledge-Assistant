const { vectorizeChunks } = require('./embeddingService');
const { searchVectors } = require('./storageServices');
const { Groq } = require('groq-sdk'); 

const { GROQ_MODEL, TEMPERATURE} = require('../config/constants') 


const answerPrompt = async (query) => {
    
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    
    try{
        const queryVector = await vectorizeChunks([query]);
        const matches = await searchVectors(queryVector[0].vector);

        if (!matches || matches.length === 0) {
            return "I couldn't find any relevant details in the uploaded document context to address your query.";
        }

        const contextText = matches.map( (match) => match.text.trim() ).join('\n\n');

        const systemPrompt = `You are a precise document assistant answering questions based solely on the provided PDF context below.

            Rules:
                1. Only answer using the text facts provided in the Context block.
                2. If the answer is not present in the context, explicitly say: "I cannot find the answer in the uploaded document."
                3. Do not make up facts, assumptions, or utilize outside knowledge.

            Context from PDF: ${contextText}`;


        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query }
            ],
            model: GROQ_MODEL, 
            temperature: TEMPERATURE,        
            max_tokens: 1024
        });

        const answer = chatCompletion.choices[0]?.message?.content || "Failed to generate answer.";

        return answer

    }
    catch (error) {
        console.error('Error within QueryService processing:', error);
        throw new Error(`Query pipeline failed: ${error.message}`);
    }
}

module.exports = { answerPrompt }
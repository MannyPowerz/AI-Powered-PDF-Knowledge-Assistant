const { answerPrompt } = require('../services/queryService');

const queryController = async (req, res, next) => {
    try {

        const { question } = req.body;

        if (!question) {
                return res.status(400).json({ 
                    success: false,
                    error: "No query was prompted." 
                });
        }

        const answer = await answerPrompt(question)

        return res.status(200).json({
            success: true,
            answer: answer
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {queryController}
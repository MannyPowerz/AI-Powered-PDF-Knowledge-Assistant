const { queryService } = require('../services/queryService');

const queryController = async (req, res) => {
    try {
        if (!req.body) {
                return res.status(400).json({ error: "No query was prompted." });
        }    

        const queryData = await queryService(req.body)


    } catch (error) {
        
    }
}

module.exports = {queryController}
const { getCodeSuggestion } = require('../AI/aiService');

const getCodeSuggestionController = async (req, res) => {
    const { inputText, language } = req.body;

    if (!inputText || !language) {
        return res.status(400).json({ error: "Input text and language are required." });
    }

    try {
        const suggestion = await getCodeSuggestion(inputText, language);
        res.status(200).json({ suggestion });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch code suggestion." });
    }
};

module.exports = { getCodeSuggestionController };

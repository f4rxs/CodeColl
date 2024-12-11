const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getCodeSuggestion = async (inputText, language) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant that provides code suggestions." },
                { role: "user", content: `Provide a code suggestion for the following ${language} code:\n\n${inputText}` }
            ],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content; 
    } catch (error) {
        console.error("Error fetching code suggestion:", error);
        throw error;
    }
};

module.exports = { getCodeSuggestion };

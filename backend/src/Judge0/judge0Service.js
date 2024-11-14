const axios = require('axios');

const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST;

const runCode = async (source_code, language_id) => {
    try {
        const response = await axios.post(
            `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
            {
                "language_id": language_id,
                "source_code": source_code
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': JUDGE0_API_KEY,
                    'x-rapidapi-host': JUDGE0_API_HOST,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Judge0 API error:", error.response?.data || error.message);
        throw new Error('Failed to execute code');
    }
};

module.exports = runCode;

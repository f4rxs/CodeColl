import axios from 'axios';
import httpCommon from "../http-common";

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';

const runCode = async (code, language) => {
    try {
        const response = await axios.post(`http://localhost:5000/judge0/run`, {
            "language_id": language, // Judge0 uses numeric IDs for languages
            "source_code": code,
            "stdin": '', // If needed, you can pass input here
            "expected_output": '', // You can optionally pass expected output for comparison
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        
        console.log('Resonse:', response)
        const submissionId = response.data.result.token; // Judge0 returns a submission token

        // Now, check the status of the code execution
        const result = await getResult(submissionId);
        console.log('getting result', submissionId)
        return result;
    } catch (error) {
        console.error('Error running code:', error);
        throw new Error('Failed to run code');
    }
};

// const getResult = async (submissionId) => {
//     try {
//         const result = await axios.get(`${JUDGE0_API_URL}/submissions/${submissionId}`);
//         return result.data; // Returns the result of the code execution
//     } catch (error) {
//         console.error('Error fetching result:', error);
//         throw new Error('Failed to fetch result');
//     }
// };

const getResult = async (submissionId) => {
    try {
        const result = await axios.get(
            `${JUDGE0_API_URL}/submissions/${submissionId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-key': '7555c1304fmsh5a611fa10fe28b8p1dbd09jsn358d4ef364a2',  
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                },
            }
        );
        return result.data; 
    } catch (error) {
        console.error('Error fetching result:', error);
        throw new Error('Failed to fetch result');
    }
};

export { runCode };

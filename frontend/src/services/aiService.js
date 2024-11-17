// import axios from 'axios';
//this feature gonna be set for the final
// const OPENAI_API_KEY = "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";
// const OPENAI_API_URL = "https://api.openai.com/v1/completions";

// export const getCodeSuggestion = async (inputText, language) => {
//     try {
//         // Use the updated GPT-3.5 model or GPT-4
//         const response = await axios.post(
//             OPENAI_API_URL,
//             {
//                 model: "text-davinci-003", 
//                 prompt: inputText,
//                 max_tokens: 200,
//                 temperature: 0.5
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${OPENAI_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data.choices[0].text;
        
//     } catch (error) {
//         console.error("Error fetching code suggestion:", error);
//         throw error;
//     }
// };

// export default getCodeSuggestion;

import OpenAI from "openai";

const openai = new OpenAI({apiKey: '', dangerouslyAllowBrowser: true});


export const getCodeSuggestion = async (inputText, language) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
          });
        
        return completion.choices[0];
        
    } catch (error) {
        console.error("Error fetching code suggestion:", error);
        throw error;
    }
};

export default getCodeSuggestion;

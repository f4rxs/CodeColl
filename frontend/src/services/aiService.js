import httpCommon from "../http-common";
import { getToken } from '../utils/utils';


const getCodeSuggestion = async (inputText, language) => {
    try {
        const response = await httpCommon.post('/ai/code-suggestion', {
            inputText,
            language
        }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data.suggestion;
    } catch (error) {
        console.error("Error fetching code suggestion:", error);
        throw error;
    }
};

export default getCodeSuggestion;
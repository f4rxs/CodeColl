import httpCommon from "../http-common";
import { getToken } from '../utils/utils';

// Send a new message in a chat session
const sendMessage = (data) => {
    return httpCommon.post('/chats', data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get all chat messages by session ID
const getChatBySession = (sessionId) => {
    return httpCommon.get(`/chats/session/${sessionId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Get all chat messages for a specific user in a session
const getChatsByUserSession = (sessionId, userId) => {
    return httpCommon.get(`/chats/session/${sessionId}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// Export all functions as a service object
const chatService = {
    sendMessage,
    getChatBySession,
    getChatsByUserSession
};

export default chatService;

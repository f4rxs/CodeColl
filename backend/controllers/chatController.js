const {
    sendMessage,
    getChatBySession,
    getChatsByUserSession
} = require('../services/chatService');


const sendMessageController = async (req, res) => {
    const { session_id, user_id, message } = req.body;
    try {
        const chatMessage = await sendMessage({ session_id, user_id, message });
        res.status(201).json({ message: 'Message sent' }, chatMessage);

    } catch (error) {
        res.status(500).json({ message: 'Error in sending message', error: error.message });

    }
};

const getChatBySessionController = async (req, res) => {
    const { session_id } = req.params;
    try {
        const chats = await getChatBySession(session_id);
        res.status(200).json({ chats });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat messages', error: error.message });
    }
};

const getChatByUserInSessionController = async (req, res) => {
    const { session_id, user_id } = req.params;
    try {
        const chats = await getChatsByUserSession(session_id, user_id);
        res.status(200).json({ chats });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat messages for user', error: error.message });
    }
};

module.exports = {
    sendMessageController,
    getChatBySessionController,
    getChatByUserInSessionController
};
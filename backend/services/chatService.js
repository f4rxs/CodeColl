const Chat = require('../models/mongodb/chat');
const CollaborationSession = require('../models/mongodb/collaborationSession');
const User = require('../models/postgresql/user');


const sendMessage = async (messageData) => {
    const { session_id, user_id } = messageData;

    const session = await CollaborationSession.findById(session_id);
    if (!session) {
        throw new Error(`Session with ID ${session_id} does not exist`);
    }

    const user = await User.findByPk(user_id);
    if (!user) {
        throw new Error(`User with ID ${user_id} does not exist`);
    }

    try {
        const message = new Chat(messageData);
        return await message.save();
    } catch (error) {
        throw new Error(`Error sending message: ${error.message}`);
    }
};


const getChatBySession = async (sessionId) => {
    try {
        const chats = await Chat.find({ session_id: sessionId }).sort({ created_at: 1 });
        return chats;
    } catch (error) {
        throw new Error(`Error fetching chats for session ${sessionId}: ${error.message}`);
    }
};


const getChatsByUserSession = async (sessionId, userId) => {
    try {
        const chats = await Chat.find({ session_id: sessionId, user_id: userId }).sort({ created_at: 1 });
        return chats;

    } catch (error) {
        throw new Error(`Error in fetching chats for user ${userId} for the session ${sessionId}`);
    }
};


module.exports = {
    sendMessage,
    getChatBySession,
    getChatsByUserSession
}
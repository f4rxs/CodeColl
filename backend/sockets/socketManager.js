const onlineUsers = new Map();
const chatService = require('../src/Chat/chatService');
const collaborationSessionService = require('../src/CollaborationSession/collaborationSessionService');
module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;


    const broadcastOnlineUsers = () => {
      const users = Array.from(onlineUsers.keys());
      io.emit('onlineUsers', users); 
    };



    if (userId) {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ${socket.id}`);
      broadcastOnlineUsers();
    } else {
      console.warn(`Socket ${socket.id} connected without userId`);
    }

    // Join a collaboration session room
    socket.on('joinSession', async ({ sessionId, userId }) => {
      try {
        socket.join(sessionId); // Join the room
        console.log(`User ${userId} joined session ${sessionId}`);
          

        //adding the user to the session
        await collaborationSessionService.addUserToSession(sessionId, userId)

        // Notify others in the session
        socket.to(sessionId).emit('userJoined', { userId });

        // Fetch active users and broadcast
        const session = await collaborationSessionService.getSessionById(sessionId);
        io.to(sessionId).emit('activeUsers', session.active_users);
      } catch (error) {
        console.error('Error joining session:', error);
      }
    });

    // Handle chat messages
    socket.on('sendMessage', async (messageData) => {
      try {
        const message = await chatService.sendMessage(messageData);
        console.log('Message received on server: ', messageData);
        io.to(messageData.session_id).emit('newMessage', message); // Broadcast to all in the room
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    // Leave session
    socket.on('leaveSession', async({ sessionId, userId }) => {
      try {
        // Emit to the backend to remove the user from the session
        await collaborationSessionService.removeUserFromSession(sessionId, userId);
        
        // Leave the room in socket.io
        socket.leave(sessionId);
        console.log(`User ${userId} left session ${sessionId}`);
        
        // Notify others in the session about the user leaving
        socket.to(sessionId).emit('userLeft', { userId });

        // Fetch active users and broadcast
        const session = await collaborationSessionService.getActiveSessionsByProject(sessionId);
        io.to(sessionId).emit('activeUsers', session.active_users);
    } catch (error) {
        console.error('Error leaving session:', error);
    }
    });

    socket.on('disconnect', () => {
      const disconnectedUser = [...onlineUsers.entries()].find(([userId, socketId]) => socketId === socket.id);
      if (disconnectedUser) {
        const [userId] = disconnectedUser;
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        broadcastOnlineUsers();
      } else {
        console.log(`Socket ${socket.id} disconnected but no userId was associated.`);
      }
    });

    
  });
};

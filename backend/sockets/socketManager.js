const onlineUsers = new Map();

module.exports = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    const broadcastOnlineUsers = () => {
      const users = Array.from(onlineUsers.keys());
      io.emit('onlineUsers', users); // Broadcast online users to all clients
    };
    if (userId) {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ${socket.id}`);
      broadcastOnlineUsers();
    } else {
      console.warn(`Socket ${socket.id} connected without userId`);
    }

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

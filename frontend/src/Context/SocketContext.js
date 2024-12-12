import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userId = loggedUser?.id;

    if (!userId) {
      console.warn('User is not authenticated. Skipping socket connection.');
      return;
    }

    // Initialize socket connection
    const socketInstance = io('http://localhost:5000', {
      query: { userId }, // Pass userId as a query parameter
    });

    setSocket(socketInstance);

    // Handle socket events
    socketInstance.on('connect', () => console.log('Socket.IO connected:', socketInstance.id));

    socketInstance.on('onlineUsers', (users) => {
      console.log('Online users:', users);
      setOnlineUsers(users);
    });

    // Handle new messages
    socketInstance.on('newMessage', (message) => {
      console.log('New message received: ', message);
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on('disconnect', () => console.log('Socket.IO disconnected'));


    

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Emit join session event
  const joinSession = (sessionId) => {
    if (socket) {
      const userId = JSON.parse(localStorage.getItem('loggedUser')).id;
      socket.emit('joinSession', { sessionId, userId });
    } else {
      console.warn('Socket not initialized. Unable to join session.');
    }
  };


  // Emit leave session event
  const leaveSession = (sessionId) => {
    if (socket) {
      const userId = JSON.parse(localStorage.getItem('loggedUser')).id;
      socket.emit('leaveSession', { sessionId, userId });
    } else {
      console.warn('Socket not initialized. Unable to leave session.');
    }
  };

  // Emit send message event
  const sendMessage = (sessionId, message) => {
    if (socket) {
      const userId = JSON.parse(localStorage.getItem('loggedUser')).id;
      socket.emit('sendMessage', { session_id: sessionId, user_id: userId, message });
    } else {
      console.warn('Socket not initialized. Unable to send message.');
    }
  };

  return (
    <SocketContext.Provider value={{ onlineUsers, messages, joinSession, leaveSession ,sendMessage, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };

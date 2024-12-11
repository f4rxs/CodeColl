import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userId = loggedUser?.id;

    if (!userId) {
      console.warn('User is not authenticated. Skipping socket connection.');
      return;
    }

    const socket = io('http://localhost:5000', {
      query: { userId }, // Pass userId as a query parameter
    });

    socket.on('connect', () => console.log('Socket.IO connected:', socket.id));

    socket.on('onlineUsers', (users) => {
      console.log('Online users:', users);
      setOnlineUsers(users);
    });

    socket.on('disconnect', () => console.log('Socket.IO disconnected'));

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={{ onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };

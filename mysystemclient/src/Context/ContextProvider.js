// src/context/SocketContext.js
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  // useEffect(() => {
    socketRef.current = io('http://localhost:5000'); // Your backend URL

  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

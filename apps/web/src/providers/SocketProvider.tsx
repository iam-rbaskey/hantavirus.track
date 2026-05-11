'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextProps>({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000';
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });

    socketInstance.on('connect', () => setIsConnected(true));
    socketInstance.on('disconnect', () => setIsConnected(false));

    // Listen for global invalidation events from the backend
    socketInstance.on('dashboard-updated', () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    });
    
    socketInstance.on('countries-updated', () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    });

    socketInstance.on('news-updated', () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [queryClient]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

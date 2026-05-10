import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { logger } from '../utils/logger';

export let io: SocketServer;

export const initSockets = (server: HttpServer) => {
  io = new SocketServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    logger.info(`[Socket] Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
      logger.info(`[Socket] Client disconnected: ${socket.id}`);
    });
  });
};

export const emitEvent = (event: string, payload: any) => {
  if (io) {
    io.emit(event, payload);
    logger.info(`Emitted realtime event: ${event}`);
  }
};

import dotenv from 'dotenv';
dotenv.config();

import { server, app } from './app';

const PORT = process.env.PORT || 3000;

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`[Server] Core backend running on port ${PORT}`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('[Server] Shutting down gracefully...');
    server.close(() => {
      console.log('[Server] Closed remaining connections.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();

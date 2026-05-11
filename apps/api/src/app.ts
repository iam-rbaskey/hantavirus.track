import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { httpLogger } from './middlewares/logger.middleware';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { metricsMiddleware, metricsRoute } from './middlewares/metrics.middleware';
import { initSockets } from './sockets';
import routes from './routes';
import healthRoutes from './health/health.routes';

export const app = express();
export const server = createServer(app);

// Initialize Socket.IO Foundation
initSockets(server);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Metrics and request logging
app.use(metricsMiddleware);
app.use(httpLogger);

// System endpoints
app.use('/health', healthRoutes);
app.get('/metrics', metricsRoute);

// Mount versioned modular API routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

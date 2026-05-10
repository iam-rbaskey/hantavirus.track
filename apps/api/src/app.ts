import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { httpLogger } from './middlewares/logger.middleware';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import routes from './routes';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(httpLogger);

// Healthcheck
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount modular API routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

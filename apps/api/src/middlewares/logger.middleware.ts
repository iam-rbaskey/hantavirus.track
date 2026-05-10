import pinoHttp from 'pino-http';
import { logger } from '../utils/logger';

export const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessMessage: function (req, res) {
    return `${req.method} ${req.url} completed with status ${res.statusCode}`;
  },
  customErrorMessage: function (req, res, err) {
    return `${req.method} ${req.url} failed with status ${res.statusCode}: ${err.message}`;
  },
});

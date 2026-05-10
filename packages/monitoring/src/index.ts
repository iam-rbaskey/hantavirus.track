import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();

collectDefaultMetrics({ register });

// Custom metrics
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});
register.registerMetric(httpRequestDurationMicroseconds);

export const ingestionJobDuration = new client.Histogram({
  name: 'ingestion_job_duration_seconds',
  help: 'Duration of ingestion jobs in seconds',
  labelNames: ['job_name', 'status']
});
register.registerMetric(ingestionJobDuration);

export { register };

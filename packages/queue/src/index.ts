import { Queue, Worker, QueueEvents, Job } from 'bullmq';
import { redis } from '@hanta/redis';

export const createQueue = (name: string) => {
  return new Queue(name, { connection: redis });
};

export const createWorker = (name: string, processor: (job: Job) => Promise<any>, options = {}) => {
  return new Worker(name, processor, { connection: redis, ...options });
};

export const createQueueEvents = (name: string) => {
  return new QueueEvents(name, { connection: redis });
};

// Standard queues
export const QUEUES = {
  INGESTION: 'ingestion-queue',
  NOTIFICATIONS: 'notifications-queue'
};

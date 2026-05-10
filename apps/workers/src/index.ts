import { createWorker, QUEUES } from '@hanta/queue';
import { initSchedulers } from './schedulers/cronScheduler';
import { ingestionProcessor } from './processors/ingestionProcessor';
import { logger } from './logging/logger';

logger.info('🚀 Starting Distributed Queue Workers & Schedulers...');

// 1. Initialize BullMQ Worker
createWorker(QUEUES.INGESTION, ingestionProcessor, { concurrency: 5 });

// 2. Initialize Cron Schedulers
initSchedulers();

logger.info('✅ System successfully bound to Redis queues.');

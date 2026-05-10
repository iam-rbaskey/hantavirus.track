import cron from 'node-cron';
import { createQueue, QUEUES } from '@hanta/queue';
import { logger } from '../logging/logger';

export const initSchedulers = () => {
  const ingestionQueue = createQueue(QUEUES.INGESTION);

  // Summary: Every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    logger.info('Enqueueing SUMMARY ingestion job');
    ingestionQueue.add('ingest-summary', {}, { removeOnComplete: true });
  });

  // Countries: Every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    logger.info('Enqueueing COUNTRIES ingestion job');
    ingestionQueue.add('ingest-countries', {}, { removeOnComplete: true });
  });

  // News: Every 2 minutes
  cron.schedule('*/2 * * * *', () => {
    logger.info('Enqueueing NEWS ingestion job');
    ingestionQueue.add('ingest-news', {}, { removeOnComplete: true });
  });

  // Timeline: Every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    logger.info('Enqueueing TIMELINE ingestion job');
    ingestionQueue.add('ingest-timeline', {}, { removeOnComplete: true });
  });

  // Sources: Every 24 hours (Midnight)
  cron.schedule('0 0 * * *', () => {
    logger.info('Enqueueing SOURCES ingestion job');
    ingestionQueue.add('ingest-sources', {}, { removeOnComplete: true });
  });
};

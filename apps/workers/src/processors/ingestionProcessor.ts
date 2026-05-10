import { Job } from 'bullmq';
import { logger } from '../logging/logger';
import { SummaryCollector } from '../collectors/hantaOne/summary.collector';
import { CountriesCollector } from '../collectors/hantaOne/countries.collector';
import { NewsCollector } from '../collectors/hantaOne/news.collector';
import { TimelineCollector } from '../collectors/hantaOne/timeline.collector';
import { HantaOneNormalizers } from '../normalizers/hantaOne.normalizers';
import { Validators, GlobalMetricsSchema, CountrySchema, OutbreakSchema, NewsSchema, TimelineSchema } from '../validators/hantaOne.validators';
import { DbService } from '../services/dbService';
import { redis } from '@hanta/redis';

const invalidateCache = async (pattern: string) => {
  const keys = await redis.keys(pattern);
  if (keys.length) await redis.del(...keys);
};

export const ingestionProcessor = async (job: Job) => {
  logger.info(`Processing job ${job.name} (ID: ${job.id})`);
  const dbService = new DbService();
  const sourceId = await dbService.getOrCreateSource('Hantavirus.one', 'AGGREGATOR', 'https://hantavirus.one');

  try {
    switch (job.name) {
      case 'ingest-summary': {
        const raw = await new SummaryCollector().fetch();
        if (raw) {
          const norm = HantaOneNormalizers.normalizeGlobalMetrics(raw, sourceId);
          const valid = Validators.validate(GlobalMetricsSchema, norm, 'GlobalMetrics');
          if (valid) {
             await dbService.upsertGlobalMetrics(valid);
             await invalidateCache('*dashboard*'); 
          }
        }
        break;
      }
      case 'ingest-countries': {
        const rawArray = await new CountriesCollector().fetch();
        for (const raw of rawArray) {
          const country = Validators.validate(CountrySchema, HantaOneNormalizers.normalizeCountry(raw), 'Country');
          const outbreak = Validators.validate(OutbreakSchema, HantaOneNormalizers.normalizeOutbreak(raw, sourceId), 'Outbreak');
          if (country && outbreak) await dbService.upsertCountryAndOutbreak(country, outbreak);
        }
        await invalidateCache('*countries*');
        break;
      }
      case 'ingest-news': {
        const rawArray = await new NewsCollector().fetch();
        for (const raw of rawArray) {
          const norm = HantaOneNormalizers.normalizeNews(raw, sourceId);
          if (!norm.url.startsWith('http')) norm.url = 'https://hantavirus.one';
          const valid = Validators.validate(NewsSchema, norm, 'News');
          if (valid) await dbService.insertNews(valid);
        }
        await invalidateCache('*news*');
        break;
      }
      case 'ingest-timeline': {
        const rawArray = await new TimelineCollector().fetch();
        for (const raw of rawArray) {
          const valid = Validators.validate(TimelineSchema, HantaOneNormalizers.normalizeTimeline(raw, sourceId), 'TimelineEvent');
          if (valid) await dbService.insertTimeline(valid);
        }
        await invalidateCache('*timeline*');
        break;
      }
      default:
        logger.warn(`Unknown job name: ${job.name}`);
    }
  } catch (error) {
    logger.error({ error }, `Job ${job.name} failed`);
    throw error;
  }
};

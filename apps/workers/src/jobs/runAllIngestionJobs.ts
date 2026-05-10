import dotenv from 'dotenv';
dotenv.config();

import { logger } from '../logging/logger';
import { SummaryCollector } from '../collectors/hantaOne/summary.collector';
import { CountriesCollector } from '../collectors/hantaOne/countries.collector';
import { NewsCollector } from '../collectors/hantaOne/news.collector';
import { TimelineCollector } from '../collectors/hantaOne/timeline.collector';

import { HantaOneNormalizers } from '../normalizers/hantaOne.normalizers';
import { 
  Validators, 
  GlobalMetricsSchema, 
  CountrySchema, 
  OutbreakSchema, 
  NewsSchema, 
  TimelineSchema 
} from '../validators/hantaOne.validators';

import { DbService } from '../services/dbService';

async function runAllIngestionJobs() {
  logger.info('🚀 Starting Multi-Endpoint Ingestion Orchestrator...');
  
  const dbService = new DbService();
  const sourceId = await dbService.getOrCreateSource('Hantavirus.one', 'AGGREGATOR', 'https://hantavirus.one');

  // Job 1: Global Summary
  logger.info('Executing Job 1: Global Summary...');
  const summaryRaw = await new SummaryCollector().fetch();
  if (summaryRaw) {
    const normalizedSummary = HantaOneNormalizers.normalizeGlobalMetrics(summaryRaw, sourceId);
    const validSummary = Validators.validate(GlobalMetricsSchema, normalizedSummary, 'GlobalMetrics');
    if (validSummary) await dbService.upsertGlobalMetrics(validSummary);
  }

  // Job 2: Countries & Outbreaks
  logger.info('Executing Job 2: Countries...');
  const countriesRaw = await new CountriesCollector().fetch();
  for (const raw of countriesRaw) {
    const normalizedCountry = HantaOneNormalizers.normalizeCountry(raw);
    const validCountry = Validators.validate(CountrySchema, normalizedCountry, 'Country');
    
    const normalizedOutbreak = HantaOneNormalizers.normalizeOutbreak(raw, sourceId);
    const validOutbreak = Validators.validate(OutbreakSchema, normalizedOutbreak, 'Outbreak');

    if (validCountry && validOutbreak) {
      await dbService.upsertCountryAndOutbreak(validCountry, validOutbreak);
    }
  }

  // Job 3: News
  logger.info('Executing Job 3: News...');
  const newsRaw = await new NewsCollector().fetch();
  for (const raw of newsRaw) {
    const normalizedNews = HantaOneNormalizers.normalizeNews(raw, sourceId);
    // Fallback valid URL if API gives broken URLs to pass zod
    if (!normalizedNews.url.startsWith('http')) normalizedNews.url = 'https://hantavirus.one'; 
    const validNews = Validators.validate(NewsSchema, normalizedNews, 'News');
    if (validNews) await dbService.insertNews(validNews);
  }

  // Job 4: Timeline Events
  logger.info('Executing Job 4: Timeline...');
  const timelineRaw = await new TimelineCollector().fetch();
  for (const raw of timelineRaw) {
    const normalizedTimeline = HantaOneNormalizers.normalizeTimeline(raw, sourceId);
    const validTimeline = Validators.validate(TimelineSchema, normalizedTimeline, 'TimelineEvent');
    if (validTimeline) await dbService.insertTimeline(validTimeline);
  }

  logger.info('✅ All Ingestion Jobs Completed.');
}

// Execute orchestrator
runAllIngestionJobs()
  .then(() => process.exit(0))
  .catch((err) => {
    logger.fatal({ err }, 'Orchestrator failed with a fatal error.');
    process.exit(1);
  });

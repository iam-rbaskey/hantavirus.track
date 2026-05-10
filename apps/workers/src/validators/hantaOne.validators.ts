import { z } from 'zod';
import { logger } from '../logging/logger';

export const GlobalMetricsSchema = z.object({
  totalCases: z.number().min(0),
  totalDeaths: z.number().min(0),
  affectedCountries: z.number().min(0),
  sourceId: z.string().uuid(),
  reportedAt: z.date(),
});

export const CountrySchema = z.object({
  code: z.string().min(2).max(3),
  name: z.string().min(1),
  population: z.bigint().nullable().optional(),
  riskLevel: z.string().optional(),
});

export const OutbreakSchema = z.object({
  countryCode: z.string().min(2).max(3),
  region: z.string().nullable().optional(),
  confirmedCases: z.number().min(0),
  suspectedCases: z.number().min(0),
  deaths: z.number().min(0),
  recovered: z.number().min(0),
  sourceId: z.string().uuid(),
  reportedAt: z.date(),
});

export const NewsSchema = z.object({
  title: z.string().min(1),
  summary: z.string(),
  url: z.string().url(),
  severity: z.string().optional(),
  publishedAt: z.date(),
  sourceId: z.string().uuid(),
});

export const TimelineSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  eventDate: z.date(),
  sourceId: z.string().uuid(),
});

export class Validators {
  public static validate<T>(schema: z.ZodSchema<T>, data: any, entityName: string): T | null {
    const result = schema.safeParse(data);
    if (!result.success) {
      logger.warn({ error: result.error.format() }, `Validation failed for ${entityName}`);
      return null;
    }
    return result.data;
  }
}

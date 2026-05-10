import { redis } from '@hanta/redis';
import { logger } from '../utils/logger';

export class CacheService {
  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      logger.error({ err }, `Cache get error for key: ${key}`);
      return null;
    }
  }

  static async set(key: string, data: any, ttlInSeconds: number) {
    try {
      await redis.set(key, JSON.stringify(data), 'EX', ttlInSeconds);
    } catch (err) {
      logger.error({ err }, `Cache set error for key: ${key}`);
    }
  }

  static async invalidate(pattern: string) {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        logger.info(`Invalidated cache for pattern: ${pattern}`);
      }
    } catch (err) {
      logger.error({ err }, `Cache invalidation error for pattern: ${pattern}`);
    }
  }
}

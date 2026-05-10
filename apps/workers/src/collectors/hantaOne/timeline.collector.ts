import axios from 'axios';
import { logger } from '../../logging/logger';

export class TimelineCollector {
  private readonly endpoint = 'https://hantavirus.one/data/timeline.json';

  public async fetch(): Promise<any[]> {
    try {
      logger.info(`Fetching timeline from ${this.endpoint}`);
      const response = await axios.get(this.endpoint, { timeout: 10000 });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      logger.error({ err: error.message }, `Failed to fetch timeline`);
      return [];
    }
  }
}

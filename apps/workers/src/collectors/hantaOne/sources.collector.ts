import axios from 'axios';
import { logger } from '../../logging/logger';

export class SourcesCollector {
  private readonly endpoint = 'https://hantavirus.one/data/sources.json';

  public async fetch(): Promise<any[]> {
    try {
      logger.info(`Fetching sources from ${this.endpoint}`);
      const response = await axios.get(this.endpoint, { timeout: 10000 });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      logger.error({ err: error.message }, `Failed to fetch sources`);
      return [];
    }
  }
}

import axios from 'axios';
import { logger } from '../../logging/logger';

export class SummaryCollector {
  private readonly endpoint = 'https://hantavirus.one/data/summary.json';

  public async fetch(): Promise<any> {
    try {
      logger.info(`Fetching summary from ${this.endpoint}`);
      const response = await axios.get(this.endpoint, { timeout: 10000 });
      return response.data;
    } catch (error: any) {
      logger.error({ err: error.message }, `Failed to fetch summary`);
      return null;
    }
  }
}

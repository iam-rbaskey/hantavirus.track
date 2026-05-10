import axios from 'axios';
import { logger } from '../../logging/logger';

export class CountriesCollector {
  private readonly endpoint = 'https://hantavirus.one/data/countries.json';

  public async fetch(): Promise<any[]> {
    try {
      logger.info(`Fetching countries from ${this.endpoint}`);
      const response = await axios.get(this.endpoint, { timeout: 10000 });
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error: any) {
      logger.error({ err: error.message }, `Failed to fetch countries`);
      return [];
    }
  }
}

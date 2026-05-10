import axios from 'axios';

// The raw response type expected from the API
export interface HantaOneSummaryResponse {
  confirmed_cases: number;
  suspected_cases: number;
  deaths: number;
  countries_affected: number;
  last_updated: string;
  generated_at: string;
}

export class HantaOneCollector {
  private readonly endpoint = 'https://hantavirus.one/data/summary.json';

  /**
   * Fetches data from the Hantavirus.one summary endpoint.
   * Handles API failures gracefully.
   */
  public async fetchSummary(): Promise<HantaOneSummaryResponse | null> {
    try {
      console.log(`[Collector] Fetching data from ${this.endpoint}`);
      const response = await axios.get<HantaOneSummaryResponse>(this.endpoint, {
        timeout: 10000, // 10 second timeout for safety
      });
      
      console.log(`[Collector] Successfully fetched data from Hantavirus.one`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`[Collector Error] Failed to fetch from ${this.endpoint}: ${error.message}`);
      } else {
        console.error(`[Collector Error] Unexpected error:`, error);
      }
      return null;
    }
  }
}

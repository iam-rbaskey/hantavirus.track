import { HantaOneSummaryResponse } from '../collectors/hantaOneCollector';

export interface NormalizedOutbreakData {
  countryCode: string;
  confirmedCases: number;
  suspectedCases: number;
  deaths: number;
  recovered: number;
  reportedAt: Date;
}

export class HantaOneNormalizer {
  /**
   * Converts the external API format into our internal schema representation.
   * Note: Because this specific endpoint returns a global summary, we map it to 
   * a global aggregate representation (e.g., countryCode: 'GLB').
   */
  public static normalize(rawData: HantaOneSummaryResponse): NormalizedOutbreakData {
    return {
      countryCode: 'GLB', // Using 'GLB' to represent global aggregate data
      confirmedCases: rawData.confirmed_cases,
      suspectedCases: rawData.suspected_cases,
      deaths: rawData.deaths,
      recovered: 0, // Not provided by this specific endpoint
      reportedAt: new Date(rawData.last_updated),
    };
  }
}

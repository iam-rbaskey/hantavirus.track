// Normalization layer maps unpredictable external formats into strict internal structures.
// Separating this ensures our DB never fails due to API field name changes.

export class HantaOneNormalizers {
  public static normalizeGlobalMetrics(raw: any, sourceId: string) {
    return {
      totalCases: Number(raw.confirmed_cases || 0),
      totalDeaths: Number(raw.deaths || 0),
      affectedCountries: Number(raw.countries_affected || 0),
      sourceId,
      reportedAt: new Date(raw.last_updated || Date.now()),
    };
  }

  public static normalizeCountry(raw: any) {
    return {
      code: String(raw.country_code || raw.iso3 || 'UNK').substring(0, 3).toUpperCase(),
      name: String(raw.country_name || 'Unknown'),
      population: raw.population ? BigInt(raw.population) : null,
      riskLevel: raw.risk_level || 'UNKNOWN',
    };
  }

  public static normalizeOutbreak(raw: any, sourceId: string) {
    return {
      countryCode: String(raw.country_code || raw.iso3 || 'UNK').substring(0, 3).toUpperCase(),
      region: raw.region || null,
      confirmedCases: Number(raw.confirmed_cases || 0),
      suspectedCases: Number(raw.suspected_cases || 0),
      deaths: Number(raw.deaths || 0),
      recovered: Number(raw.recovered || 0),
      sourceId,
      reportedAt: new Date(raw.reported_at || raw.last_updated || Date.now()),
    };
  }

  public static normalizeNews(raw: any, sourceId: string) {
    return {
      title: String(raw.title || 'Untitled'),
      summary: String(raw.summary || ''),
      url: String(raw.url || ''),
      severity: raw.severity || 'INFO',
      publishedAt: new Date(raw.published_at || Date.now()),
      sourceId,
    };
  }

  public static normalizeTimeline(raw: any, sourceId: string) {
    return {
      title: String(raw.title || 'Event'),
      description: String(raw.description || ''),
      eventDate: new Date(raw.event_date || Date.now()),
      sourceId,
    };
  }
}

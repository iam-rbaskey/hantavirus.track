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
      code: String(raw.iso || 'UNK').substring(0, 3).toUpperCase(),
      name: String(raw.country || 'Unknown'),
      population: raw.population ? BigInt(raw.population) : null,
      riskLevel: raw.risk_level || 'UNKNOWN',
    };
  }

  public static normalizeOutbreak(raw: any, sourceId: string) {
    return {
      countryCode: String(raw.iso || 'UNK').substring(0, 3).toUpperCase(),
      region: raw.region || null,
      confirmedCases: Number(raw.confirmed || 0),
      suspectedCases: Number(raw.suspected || 0),
      deaths: Number(raw.deaths || 0),
      recovered: Number(raw.recovered || 0),
      sourceId,
      reportedAt: new Date(raw.last_updated || Date.now()),
    };
  }

  public static normalizeNews(raw: any, sourceId: string) {
    return {
      title: String(raw.headline || 'Untitled'),
      summary: String(raw.summary || ''),
      url: String(raw.url || ''),
      severity: raw.severity || 'INFO',
      publishedAt: new Date(raw.date || Date.now()),
      sourceId,
    };
  }

  public static normalizeTimeline(raw: any, sourceId: string) {
    return {
      title: String(raw.date_display || 'Event'),
      description: String(raw.event || ''),
      eventDate: new Date(raw.date || Date.now()),
      sourceId,
    };
  }
}

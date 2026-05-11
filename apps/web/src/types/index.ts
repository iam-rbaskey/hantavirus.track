// Shared types for Phase 6B Frontend

export interface GlobalMetrics {
  id: string;
  totalCases: number;
  totalDeaths: number;
  affectedCountries: number;
  reportedAt: string;
  createdAt?: string;
}

export interface CountryOutbreak {
  country: string;
  code: string;
  cases: number;
  deaths: number;
}

export interface NewsItem {
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  severity?: 'CRITICAL' | 'WARNING' | 'INFO';
}

export interface DashboardData {
  global: GlobalMetrics;
  topCountries: CountryOutbreak[];
  recentNews: NewsItem[];
}

export interface Country {
  id: string;
  name: string;
  code: string;
  region?: string;
  outbreaks?: Array<{
    id: string;
    confirmedCases: number;
    deaths: number;
    reportedAt: string;
    status: string;
  }>;
}

export interface CountriesResponse {
  data: Country[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'none';

export function getSeverity(cases: number): SeverityLevel {
  if (cases >= 100) return 'critical';
  if (cases >= 50) return 'high';
  if (cases >= 10) return 'medium';
  if (cases >= 1) return 'low';
  return 'none';
}

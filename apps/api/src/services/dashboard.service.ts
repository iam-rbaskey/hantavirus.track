import { DashboardRepository } from '../repositories/dashboard.repository';

// Extract element type from the array returned by a repository method
type TopCountry = Awaited<ReturnType<DashboardRepository['getTopAffectedCountries']>>[number];
type RecentNewsItem = Awaited<ReturnType<DashboardRepository['getRecentNews']>>[number];

export class DashboardService {
  private repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  public async getAggregatedDashboard() {
    const [globalMetrics, topCountries, recentNews] = await Promise.all([
      this.repository.getLatestGlobalMetrics(),
      this.repository.getTopAffectedCountries(5),
      this.repository.getRecentNews(5)
    ]);

    return {
      global: globalMetrics,
      topCountries: topCountries.map((o: TopCountry) => ({
        country: o.country.name,
        code: o.countryCode,
        cases: o.confirmedCases,
        deaths: o.deaths
      })),
      recentNews: recentNews.map((n: RecentNewsItem) => ({
        title: n.title,
        url: n.url,
        publishedAt: n.publishedAt,
        source: n.source.name
      }))
    };
  }
}

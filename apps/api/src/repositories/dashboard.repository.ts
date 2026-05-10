import { prisma } from '@hanta/db';

export class DashboardRepository {
  public async getLatestGlobalMetrics() {
    return prisma.globalMetrics.findFirst({
      orderBy: { reportedAt: 'desc' }
    });
  }

  public async getTopAffectedCountries(limit: number) {
    return prisma.outbreak.findMany({
      take: limit,
      orderBy: { confirmedCases: 'desc' },
      distinct: ['countryCode'],
      include: { country: true }
    });
  }

  public async getRecentNews(limit: number) {
    return prisma.news.findMany({
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: { source: true }
    });
  }
}

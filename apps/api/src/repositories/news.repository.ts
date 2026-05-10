import { prisma, Prisma } from '@hanta/db';

export class NewsRepository {
  public async getNews(skip: number, take: number, severity?: string, sourceId?: string) {
    const where: Prisma.NewsWhereInput = {};
    if (severity) where.severity = severity;
    if (sourceId) where.sourceId = sourceId;

    const [total, data] = await Promise.all([
      prisma.news.count({ where }),
      prisma.news.findMany({
        where,
        skip,
        take,
        orderBy: { publishedAt: 'desc' },
        include: { source: true }
      })
    ]);

    return { total, data };
  }
}

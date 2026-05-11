import { prisma } from '@hanta/db';

export class TimelineRepository {
  public async getTimeline(skip: number, take: number) {
    const where: any = {};

    const [total, data] = await Promise.all([
      prisma.timelineEvent.count({ where }),
      prisma.timelineEvent.findMany({
        where,
        skip,
        take,
        orderBy: { eventDate: 'desc' },
        include: { source: true }
      })
    ]);

    return { total, data };
  }
}

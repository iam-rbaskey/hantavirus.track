import { prisma } from '@hanta/db';
import { Prisma } from '@prisma/client';

export class TimelineRepository {
  public async getTimeline(skip: number, take: number) {
    const where: Prisma.TimelineEventWhereInput = {};

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

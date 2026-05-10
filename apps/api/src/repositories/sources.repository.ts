import { prisma } from '@hanta/db';

export class SourcesRepository {
  public async getSources() {
    return prisma.source.findMany({
      orderBy: { reliabilityScore: 'desc' }
    });
  }
}

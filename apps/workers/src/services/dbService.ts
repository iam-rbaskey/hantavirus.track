import { prisma } from '@hanta/db';
import { logger } from '../logging/logger';

export class DbService {
  /**
   * Safe lookup or creation of a Source object to attach FKs.
   */
  public async getOrCreateSource(name: string, type: string, url: string): Promise<string> {
    let source = await prisma.source.findFirst({ where: { name } });
    if (!source) {
      source = await prisma.source.create({
        data: { name, type, baseUrl: url, reliabilityScore: 0.9 },
      });
      logger.info(`Created new source metadata: ${name}`);
    }
    return source.id;
  }

  public async upsertGlobalMetrics(data: any) {
    await prisma.globalMetrics.create({
      data: {
        totalCases: data.totalCases,
        totalDeaths: data.totalDeaths,
        affectedCountries: data.affectedCountries,
        sourceId: data.sourceId,
        reportedAt: data.reportedAt,
      },
    });
    logger.info('Inserted GlobalMetrics record.');
  }

  public async upsertCountryAndOutbreak(countryData: any, outbreakData: any) {
    await prisma.$transaction(async (tx: any) => {
      // 1. Ensure Country exists
      await tx.country.upsert({
        where: { code: countryData.code },
        create: {
          code: countryData.code,
          name: countryData.name,
          population: countryData.population,
          riskLevel: countryData.riskLevel,
        },
        update: {
          riskLevel: countryData.riskLevel, // Update risk level dynamically
        },
      });

      // 2. Prevent identical outbreak inserts for same day+country+source
      const existing = await tx.outbreak.findFirst({
        where: {
          countryCode: outbreakData.countryCode,
          sourceId: outbreakData.sourceId,
          reportedAt: outbreakData.reportedAt,
        },
      });

      if (!existing) {
        await tx.outbreak.create({
          data: {
            countryCode: outbreakData.countryCode,
            confirmedCases: outbreakData.confirmedCases,
            suspectedCases: outbreakData.suspectedCases,
            deaths: outbreakData.deaths,
            recovered: outbreakData.recovered,
            sourceId: outbreakData.sourceId,
            reportedAt: outbreakData.reportedAt,
          },
        });
        logger.info(`Inserted Outbreak record for ${outbreakData.countryCode}`);
      }
    });
  }

  public async insertNews(newsData: any) {
    // Avoid exact duplicate URLs
    const existing = await prisma.news.findFirst({ where: { url: newsData.url } });
    if (!existing) {
      await prisma.news.create({ data: newsData });
      logger.info(`Inserted News: ${newsData.title}`);
    }
  }

  public async insertTimeline(timelineData: any) {
    // Basic deduplication check
    const existing = await prisma.timelineEvent.findFirst({ 
      where: { title: timelineData.title, eventDate: timelineData.eventDate } 
    });
    if (!existing) {
      await prisma.timelineEvent.create({ data: timelineData });
      logger.info(`Inserted Timeline Event: ${timelineData.title}`);
    }
  }
}

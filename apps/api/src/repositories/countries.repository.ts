import { prisma } from '@hanta/db';

export class CountriesRepository {
  public async getCountries(skip: number, take: number, search?: string) {
    const where = search ? { name: { contains: search, mode: 'insensitive' as any } } : {};
    
    const [total, data] = await Promise.all([
      prisma.country.count({ where }),
      prisma.country.findMany({
        where,
        skip,
        take,
        include: {
          outbreaks: {
            orderBy: { reportedAt: 'desc' },
            take: 1
          }
        }
      })
    ]);

    return { total, data };
  }

  public async getCountryByCode(code: string) {
    return prisma.country.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        outbreaks: {
          orderBy: { reportedAt: 'desc' },
          take: 30 // Get last 30 reports for history chart
        }
      }
    });
  }
}

import { CountriesRepository } from '../repositories/countries.repository';

export class CountriesService {
  private repository: CountriesRepository;

  constructor() {
    this.repository = new CountriesRepository();
  }

  public async getPaginatedCountries(skip: number, take: number, search?: string) {
    return this.repository.getCountries(skip, take, search);
  }

  public async getCountryDetails(code: string) {
    const country = await this.repository.getCountryByCode(code);
    if (!country) throw { statusCode: 404, message: `Country ${code} not found` };
    return country;
  }
}

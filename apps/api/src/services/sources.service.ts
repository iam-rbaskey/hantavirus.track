import { SourcesRepository } from '../repositories/sources.repository';

export class SourcesService {
  private repository: SourcesRepository;

  constructor() {
    this.repository = new SourcesRepository();
  }

  public async getAllSources() {
    return this.repository.getSources();
  }
}

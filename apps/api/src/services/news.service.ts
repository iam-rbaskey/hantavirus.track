import { NewsRepository } from '../repositories/news.repository';

export class NewsService {
  private repository: NewsRepository;

  constructor() {
    this.repository = new NewsRepository();
  }

  public async getPaginatedNews(skip: number, take: number, severity?: string, sourceId?: string) {
    return this.repository.getNews(skip, take, severity, sourceId);
  }
}

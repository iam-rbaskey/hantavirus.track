import { TimelineRepository } from '../repositories/timeline.repository';

export class TimelineService {
  private repository: TimelineRepository;

  constructor() {
    this.repository = new TimelineRepository();
  }

  public async getPaginatedTimeline(skip: number, take: number) {
    return this.repository.getTimeline(skip, take);
  }
}

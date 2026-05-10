import { Request, Response, NextFunction } from 'express';
import { TimelineService } from '../services/timeline.service';
import { ResponseUtil } from '../utils/apiResponse';
import { extractPagination, buildPaginationMeta } from '../utils/pagination';

export class TimelineController {
  private service: TimelineService;

  constructor() {
    this.service = new TimelineService();
  }

  public getTimeline = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take, page, limit } = extractPagination(req.query);
      const { total, data } = await this.service.getPaginatedTimeline(skip, take);
      res.json(ResponseUtil.success(data, buildPaginationMeta(total, page, limit)));
    } catch (error) {
      next(error);
    }
  };
}

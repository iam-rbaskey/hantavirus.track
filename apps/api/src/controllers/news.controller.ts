import { Request, Response, NextFunction } from 'express';
import { NewsService } from '../services/news.service';
import { ResponseUtil } from '../utils/apiResponse';
import { extractPagination, buildPaginationMeta } from '../utils/pagination';

export class NewsController {
  private service: NewsService;

  constructor() {
    this.service = new NewsService();
  }

  public getNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take, page, limit } = extractPagination(req.query);
      const severity = req.query.severity as string;
      const sourceId = req.query.sourceId as string;

      const { total, data } = await this.service.getPaginatedNews(skip, take, severity, sourceId);
      res.json(ResponseUtil.success(data, buildPaginationMeta(total, page, limit)));
    } catch (error) {
      next(error);
    }
  };
}

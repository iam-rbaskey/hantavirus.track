import { Request, Response, NextFunction } from 'express';
import { SourcesService } from '../services/sources.service';
import { ResponseUtil } from '../utils/apiResponse';

export class SourcesController {
  private service: SourcesService;

  constructor() {
    this.service = new SourcesService();
  }

  public getSources = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAllSources();
      res.json(ResponseUtil.success(data));
    } catch (error) {
      next(error);
    }
  };
}

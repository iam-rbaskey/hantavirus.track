import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { ResponseUtil } from '../utils/apiResponse';

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  public getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAggregatedDashboard();
      res.json(ResponseUtil.success(data));
    } catch (error) {
      next(error);
    }
  };
}

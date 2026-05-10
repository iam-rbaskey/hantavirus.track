import { Request, Response, NextFunction } from 'express';
import { CountriesService } from '../services/countries.service';
import { ResponseUtil } from '../utils/apiResponse';
import { extractPagination, buildPaginationMeta } from '../utils/pagination';

export class CountriesController {
  private service: CountriesService;

  constructor() {
    this.service = new CountriesService();
  }

  public getCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take, page, limit } = extractPagination(req.query);
      const search = req.query.search as string;

      const { total, data } = await this.service.getPaginatedCountries(skip, take, search);
      res.json(ResponseUtil.success(data, buildPaginationMeta(total, page, limit)));
    } catch (error) {
      next(error);
    }
  };

  public getCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.params.code;
      const data = await this.service.getCountryDetails(code);
      res.json(ResponseUtil.success(data));
    } catch (error) {
      next(error);
    }
  };
}

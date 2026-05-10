import { Router } from 'express';
import { CountriesController } from '../controllers/countries.controller';

const router = Router();
const controller = new CountriesController();

router.get('/', controller.getCountries);
router.get('/:code', controller.getCountry);

export default router;

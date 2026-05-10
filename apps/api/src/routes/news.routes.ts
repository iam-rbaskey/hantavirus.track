import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';

const router = Router();
const controller = new NewsController();

router.get('/', controller.getNews);

export default router;

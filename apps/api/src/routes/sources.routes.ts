import { Router } from 'express';
import { SourcesController } from '../controllers/sources.controller';

const router = Router();
const controller = new SourcesController();

router.get('/', controller.getSources);

export default router;

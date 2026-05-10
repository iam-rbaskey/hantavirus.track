import { Router } from 'express';
import dashboardRoutes from './dashboard.routes';
import countriesRoutes from './countries.routes';
import newsRoutes from './news.routes';
import timelineRoutes from './timeline.routes';
import sourcesRoutes from './sources.routes';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/countries', countriesRoutes);
router.use('/news', newsRoutes);
router.use('/timeline', timelineRoutes);
router.use('/sources', sourcesRoutes);

export default router;

import { Router } from 'express';
import dashboardRoutes from './dashboard.routes';
import countriesRoutes from './countries.routes';
import newsRoutes from './news.routes';
import timelineRoutes from './timeline.routes';
import sourcesRoutes from './sources.routes';

const router = Router();

router.use('/v1/dashboard', dashboardRoutes);
router.use('/v1/countries', countriesRoutes);
router.use('/v1/news', newsRoutes);
router.use('/v1/timeline', timelineRoutes);
router.use('/v1/sources', sourcesRoutes);

export default router;

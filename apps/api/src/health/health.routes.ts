import { Router } from 'express';
import { prisma } from '@hanta/db';
import { redis } from '@hanta/redis';

const router = Router();

router.get('/', (req, res) => res.json({ status: 'ok', service: 'api' }));

router.get('/db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

router.get('/redis', async (req, res) => {
  try {
    await redis.ping();
    res.json({ status: 'ok', redis: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', redis: 'disconnected' });
  }
});

router.get('/queues', (req, res) => {
  res.json({ status: 'ok', message: 'Queue monitoring available via BullMQ dashboard locally.' });
});

export default router;

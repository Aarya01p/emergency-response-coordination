import { Router, Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { query } from '../database/connection';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const logger = new Logger('Dashboard');

// GET dashboard stats
router.get('/stats', authenticateToken, async (req: Request, res: Response) => {
  try {
    const stats = await Promise.all([
      query('SELECT COUNT(*) as total FROM incidents'),
      query('SELECT COUNT(*) as open FROM incidents WHERE status = \'OPEN\''),
      query('SELECT COUNT(*) as critical FROM incidents WHERE severity = \'CRITICAL\''),
      query('SELECT COUNT(*) as available FROM resources WHERE status = \'AVAILABLE\''),
    ]);

    res.json({
      totalIncidents: parseInt(stats[0].rows[0].total),
      openIncidents: parseInt(stats[1].rows[0].open),
      criticalIncidents: parseInt(stats[2].rows[0].critical),
      availableResources: parseInt(stats[3].rows[0].available),
    });
  } catch (err) {
    logger.error('Failed to fetch dashboard stats', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;

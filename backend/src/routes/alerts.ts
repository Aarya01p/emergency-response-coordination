import { Router, Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { query } from '../database/connection';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const logger = new Logger('Alerts');

// GET all alerts
router.get('/',  async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM alerts ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ alerts: result.rows });
  } catch (err) {
    logger.error('Failed to fetch alerts', err);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// CREATE alert
router.post('/', async (req: Request, res: Response) => {
  try {
    const { incident_id, title, message, severity, recipients } = req.body;

    const result = await query(
      `INSERT INTO alerts (incident_id, title, message, severity, recipients, created_by)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [incident_id, title, message, severity, JSON.stringify(recipients), req.user?.id]
    );

    logger.info(`New alert created: ${result.rows[0].id}`);
    res.status(201).json({ alert: result.rows[0] });
  } catch (err) {
    logger.error('Failed to create alert', err);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

export default router;

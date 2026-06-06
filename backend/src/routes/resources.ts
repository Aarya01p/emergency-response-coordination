import { Router, Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { query } from '../database/connection';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const logger = new Logger('Resources');

// GET all resources
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM resources ORDER BY created_at DESC');
    res.json({ resources: result.rows });
  } catch (err) {
    logger.error('Failed to fetch resources', err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// CREATE resource
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { name, type, status, location, latitude, longitude } = req.body;

    const result = await query(
      `INSERT INTO resources (name, type, status, location, latitude, longitude, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, type, status || 'AVAILABLE', location, latitude, longitude, req.user?.id]
    );

    logger.info(`New resource created: ${result.rows[0].id}`);
    res.status(201).json({ resource: result.rows[0] });
  } catch (err) {
    logger.error('Failed to create resource', err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

export default router;

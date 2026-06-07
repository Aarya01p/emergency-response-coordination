import { Router, Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { query } from '../database/connection';

const router = Router();
const logger = new Logger('Incidents');

// GET all incidents
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM incidents ORDER BY created_at DESC LIMIT 100'
    );

    res.json({ incidents: result.rows });
  } catch (err) {
    logger.error('Failed to fetch incidents', err);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// GET incident by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM incidents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    res.json({ incident: result.rows[0] });
  } catch (err) {
    logger.error('Failed to fetch incident', err);
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
});

// CREATE new incident
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      location,
      severity,
      type,
      latitude,
      longitude
    } = req.body;

    const result = await query(
      `INSERT INTO incidents
      (
        title,
        description,
        location,
        severity,
        type,
        latitude,
        longitude,
        status,
        created_by
      )
      VALUES
      (
        $1, $2, $3, $4, $5, $6, $7, 'OPEN', NULL
      )
      RETURNING *`,
      [
        title,
        description,
        location,
        severity,
        type,
        latitude,
        longitude
      ]
    );

    logger.info(`New incident created: ${result.rows[0].id}`);

    res.status(201).json({
      incident: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to create incident', err);
    res.status(500).json({
      error: 'Failed to create incident'
    });
  }
});

// UPDATE incident
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, severity, notes } = req.body;

    const result = await query(
      `UPDATE incidents
       SET
         status = $1,
         severity = $2,
         notes = $3,
         updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status, severity, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Incident not found'
      });
    }

    logger.info(`Incident updated: ${id}`);

    res.json({
      incident: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to update incident', err);
    res.status(500).json({
      error: 'Failed to update incident'
    });
  }
});

export default router;

export default router;

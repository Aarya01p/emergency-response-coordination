import { Router, Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { query } from '../database/connection';
import { analyzeIncidentText } from '../services/aiService'; // Import your Gemini AI Service

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
    const result = await query('SELECT * FROM incidents WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.json({ incident: result.rows[0] });
  } catch (err) {
    logger.error('Failed to fetch incident', err);
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
});

// CREATE new incident with AI Categorization!
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, location, latitude, longitude } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    logger.info('Processing incident description with Gemini AI Engine...');
    
    // 1. Run the user's text description through the AI engine
    const aiAnalysis = await analyzeIncidentText(description);
    
    // Use AI parsed parameters, or fall back if unknown
    const computedSeverity = aiAnalysis.severity || 'MEDIUM';
    const computedType = aiAnalysis.category || 'UNKNOWN';

    // 2. Save the incident along with the AI tags directly to PostgreSQL
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
        title || aiAnalysis.summary || 'AI Dispatched Incident',
        description,
        location,
        computedSeverity,
        computedType,
        latitude ? parseFloat(latitude) : null,
        longitude ? parseFloat(longitude) : null
      ]
    );

    logger.info(`New AI-categorized incident saved: ${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      incident: result.rows[0],
      aiData: aiAnalysis
    });
  } catch (err) {
    logger.error('Failed to create incident with AI:', err);
    res.status(500).json({
      error: 'Failed to process and report incident'
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
       SET status = $1, severity = $2, notes = $3, updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [status, severity, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    logger.info(`Incident updated: ${id}`);
    res.json({ incident: result.rows[0] });
  } catch (err) {
    logger.error('Failed to update incident', err);
    res.status(500).json({ error: 'Failed to update incident' });
  }
});

export default router;

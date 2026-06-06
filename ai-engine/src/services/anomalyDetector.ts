import { Logger } from './utils/logger';
import { query } from '../database/connection';

const logger = new Logger('AnomalyDetector');

export interface AnomalyScore {
  isAnomaly: boolean;
  score: number;
  description: string;
}

export async function detectAnomalies(incidentId: string): Promise<AnomalyScore> {
  try {
    // Get current incident
    const incidentResult = await query(
      'SELECT * FROM incidents WHERE id = $1',
      [incidentId]
    );

    if (incidentResult.rows.length === 0) {
      throw new Error('Incident not found');
    }

    const incident = incidentResult.rows[0];

    // Get historical data for comparison
    const historicalResult = await query(
      `SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_resolution_time,
              COUNT(*) as total_incidents
       FROM incidents
       WHERE type = $1 AND created_at > NOW() - INTERVAL '30 days'`,
      [incident.type]
    );

    const historical = historicalResult.rows[0];
    const avgResolutionTime = historical.avg_resolution_time || 3600;
    const totalIncidents = historical.total_incidents || 1;

    // Calculate anomaly score based on multiple factors
    let anomalyScore = 0;
    let description = '';

    // Check for unusual frequency
    if (totalIncidents > 10) {
      anomalyScore += 0.2;
      description += 'High incident frequency detected. ';
    }

    // Check for unusual severity patterns
    const severityResult = await query(
      `SELECT COUNT(*) as critical_count FROM incidents 
       WHERE type = $1 AND severity = 'CRITICAL' AND created_at > NOW() - INTERVAL '24 hours'`,
      [incident.type]
    );

    if (severityResult.rows[0].critical_count > 3) {
      anomalyScore += 0.3;
      description += 'Multiple critical incidents detected. ';
    }

    logger.info('Anomaly detection completed', {
      incidentId,
      score: anomalyScore,
      description,
    });

    return {
      isAnomaly: anomalyScore > 0.5,
      score: Math.min(anomalyScore, 1),
      description: description || 'No anomalies detected',
    };
  } catch (err) {
    logger.error('Anomaly detection failed:', err);
    throw err;
  }
}

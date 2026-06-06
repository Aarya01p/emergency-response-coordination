import dotenv from 'dotenv';
import { Logger } from './utils/logger';
import { connectDatabase } from './database/connection';
import { categorizeIncident, assessResourceNeeds } from './services/categorizer';
import { detectAnomalies } from './services/anomalyDetector';
import { optimizeResourceAllocation } from './services/resourceOptimizer';

dotenv.config();

const logger = new Logger('AIEngine');

// Example usage - process incoming incident
async function processIncident(incidentData: any) {
  try {
    logger.info('Processing incident with AI engine', { id: incidentData.id });

    // Categorize incident
    const categorization = await categorizeIncident(
      incidentData.title,
      incidentData.description
    );

    logger.info('Incident categorized', categorization);

    // Assess resource needs
    const resourceNeeds = await assessResourceNeeds(
      categorization.category,
      categorization.severity,
      incidentData.description
    );

    logger.info('Resource needs assessed', { resourceNeeds });

    // Detect anomalies
    const anomalies = await detectAnomalies(incidentData.id);
    logger.info('Anomalies detected', anomalies);

    return {
      categorization,
      resourceNeeds,
      anomalies,
    };
  } catch (err) {
    logger.error('AI processing failed:', err);
    throw err;
  }
}

// Initialize AI Engine
async function initializeAIEngine() {
  try {
    await connectDatabase();
    logger.info('AI Engine initialized successfully');
  } catch (err) {
    logger.error('Failed to initialize AI Engine:', err);
    process.exit(1);
  }
}

export { processIncident, initializeAIEngine };

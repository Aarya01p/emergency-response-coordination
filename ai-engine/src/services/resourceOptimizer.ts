import { Logger } from './logger';

const logger = new Logger('ResourceOptimizer');

export interface OptimizationResult {
  recommendedResources: Array<{
    type: string;
    quantity: number;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
  estimatedResponseTime: number; // in minutes
  optimizationScore: number;
}

export async function optimizeResourceAllocation(
  incidentSeverity: string,
  incidentType: string,
  availableResources: any[]
): Promise<OptimizationResult> {
  try {
    const recommendations = [];

    // Resource allocation logic based on incident severity and type
    const allocationMatrix: any = {
      FIRE: {
        CRITICAL: [
          { type: 'fire_truck', quantity: 3, priority: 'HIGH' },
          { type: 'ambulance', quantity: 2, priority: 'HIGH' },
          { type: 'police_unit', quantity: 2, priority: 'MEDIUM' },
        ],
        HIGH: [
          { type: 'fire_truck', quantity: 2, priority: 'HIGH' },
          { type: 'ambulance', quantity: 1, priority: 'HIGH' },
        ],
        MEDIUM: [
          { type: 'fire_truck', quantity: 1, priority: 'HIGH' },
          { type: 'ambulance', quantity: 1, priority: 'MEDIUM' },
        ],
      },
      MEDICAL: {
        CRITICAL: [
          { type: 'ambulance', quantity: 3, priority: 'HIGH' },
          { type: 'police_unit', quantity: 1, priority: 'MEDIUM' },
        ],
        HIGH: [
          { type: 'ambulance', quantity: 2, priority: 'HIGH' },
        ],
        MEDIUM: [
          { type: 'ambulance', quantity: 1, priority: 'HIGH' },
        ],
      },
      ACCIDENT: {
        CRITICAL: [
          { type: 'ambulance', quantity: 3, priority: 'HIGH' },
          { type: 'fire_truck', quantity: 2, priority: 'HIGH' },
          { type: 'police_unit', quantity: 2, priority: 'HIGH' },
        ],
        HIGH: [
          { type: 'ambulance', quantity: 2, priority: 'HIGH' },
          { type: 'police_unit', quantity: 1, priority: 'HIGH' },
        ],
      },
    };

    const typeResources = allocationMatrix[incidentType]?.[incidentSeverity] || [];
    recommendations.push(...typeResources);

    // Filter by available resources
    const availableTypes = new Set(availableResources.map(r => r.type));
    const optimizedRecommendations = recommendations.filter(
      r => availableTypes.has(r.type)
    );

    // Estimate response time based on resource availability
    const estimatedResponseTime = optimizedRecommendations.length > 0 ? 5 : 15; // minutes

    logger.info('Resource optimization completed', {
      incidentType,
      incidentSeverity,
      recommendations: optimizedRecommendations,
    });

    return {
      recommendedResources: optimizedRecommendations,
      estimatedResponseTime,
      optimizationScore: optimizedRecommendations.length / recommendations.length,
    };
  } catch (err) {
    logger.error('Resource optimization failed:', err);
    throw err;
  }
}

/**
 * Statistics Functions
 * 
 * Returns dummy data for landing page (no database required)
 */

export interface RegionalData {
  region: string;
  sessions: number;
  avgScore: number;
}

export interface DeviceData {
  platform: string;
  sessions: number;
  percentage: number;
}

export interface Statistics {
  activeUsers: string;
  sessionsTracked: string;
  platformIntegrations: string;
  wellnessImprovement: string;
  totalApiCalls: string;
  apiCallsGrowth: string;
  dataProcessingUptime: string;
  uptimeImprovement: string;
  avgResponseTime: string;
  responseTimeImprovement: string;
  regionalActivity: RegionalData[];
  deviceDistribution: DeviceData[];
}

export async function getStatistics(): Promise<Statistics> {
  // Return dummy data for landing page
  return {
    activeUsers: "1.2K+",
    sessionsTracked: "45.8K+",
    platformIntegrations: "12",
    wellnessImprovement: "87",
    totalApiCalls: "12.5K+",
    apiCallsGrowth: "23.5%",
    dataProcessingUptime: "99.9%",
    uptimeImprovement: "5.2%",
    avgResponseTime: "<50ms",
    responseTimeImprovement: "15%",
    regionalActivity: [],
    deviceDistribution: []
  };
}
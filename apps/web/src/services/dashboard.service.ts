import { apiClient, ApiResponse } from '../utils/api';

export interface GlobalMetrics {
  id: string;
  totalCases: number;
  totalDeaths: number;
  affectedCountries: number;
  reportedAt: string;
}

export interface DashboardData {
  global: GlobalMetrics;
  topCountries: Array<{ country: string; code: string; cases: number; deaths: number }>;
  recentNews: Array<{ title: string; url: string; publishedAt: string; source: string }>;
}

export const fetchDashboard = async (): Promise<DashboardData> => {
  const { data } = await apiClient.get<ApiResponse<DashboardData>>('/dashboard');
  return data.data;
};

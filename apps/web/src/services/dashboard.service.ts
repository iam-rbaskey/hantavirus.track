import { apiClient } from '@/utils/api';
import type { ApiResponse } from '@/types/api';
import type { DashboardData } from '@/types';

export const fetchDashboard = async (): Promise<DashboardData> => {
  const { data } = await apiClient.get<ApiResponse<DashboardData>>('/dashboard');
  return data.data;
};

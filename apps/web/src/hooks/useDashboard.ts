import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '@/services/dashboard.service';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    refetchInterval: 60000, // Poll every minute as fallback to websockets
  });
};

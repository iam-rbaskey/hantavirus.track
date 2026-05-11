import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '@/services/dashboard.service';

export const useDashboard = () =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    refetchInterval: 60_000,
    staleTime: 30_000,
    retry: 3,
  });

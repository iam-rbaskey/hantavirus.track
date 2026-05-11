import { useQuery } from '@tanstack/react-query';
import { fetchTimeline } from '@/services/timeline.service';

export const useTimeline = (page = 1) => {
  return useQuery({
    queryKey: ['timeline', page],
    queryFn: () => fetchTimeline(page),
  });
};

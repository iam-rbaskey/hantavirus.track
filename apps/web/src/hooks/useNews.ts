import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/services/news.service';

export const useNews = () =>
  useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

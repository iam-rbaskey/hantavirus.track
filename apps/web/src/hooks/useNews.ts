import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/services/news.service';

export const useNews = (page = 1) => {
  return useQuery({
    queryKey: ['news', page],
    queryFn: () => fetchNews(page),
  });
};

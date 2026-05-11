import { apiClient } from '@/utils/api';
import type { ApiResponse } from '@/types/api';
import type { NewsItem } from '@/types';

export const fetchNews = async (): Promise<NewsItem[]> => {
  const { data } = await apiClient.get<ApiResponse<NewsItem[]>>('/news');
  return data.data;
};

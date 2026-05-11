import { apiClient, ApiResponse } from '../utils/api';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  severity: string | null;
  publishedAt: string;
  source: { name: string; reliabilityScore: number };
}

export const fetchNews = async (page = 1, limit = 20): Promise<ApiResponse<NewsArticle[]>> => {
  const { data } = await apiClient.get<ApiResponse<NewsArticle[]>>(`/news?page=${page}&limit=${limit}`);
  return data;
};

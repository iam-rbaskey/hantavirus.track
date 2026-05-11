import { apiClient, ApiResponse } from '../utils/api';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  source: { name: string };
}

export const fetchTimeline = async (page = 1, limit = 50): Promise<ApiResponse<TimelineEvent[]>> => {
  const { data } = await apiClient.get<ApiResponse<TimelineEvent[]>>(`/timeline?page=${page}&limit=${limit}`);
  return data;
};

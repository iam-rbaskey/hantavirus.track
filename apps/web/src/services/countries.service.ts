import { apiClient, ApiResponse } from '../utils/api';

export interface CountryData {
  code: string;
  name: string;
  outbreaks: Array<{ confirmedCases: number; deaths: number; reportedAt: string }>;
}

export const fetchCountries = async (page = 1, limit = 50): Promise<ApiResponse<CountryData[]>> => {
  const { data } = await apiClient.get<ApiResponse<CountryData[]>>(`/countries?page=${page}&limit=${limit}`);
  return data;
};

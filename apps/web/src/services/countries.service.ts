import { apiClient } from '@/utils/api';
import type { ApiResponse } from '@/types/api';
import type { Country, CountriesResponse } from '@/types';

export const fetchCountries = async (): Promise<CountriesResponse> => {
  const { data } = await apiClient.get<ApiResponse<Country[]>>('/countries');
  return { data: data.data, meta: data.meta };
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const { data } = await apiClient.get<ApiResponse<Country>>(`/countries/${code}`);
  return data.data;
};

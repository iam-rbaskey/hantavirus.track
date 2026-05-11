import { useQuery } from '@tanstack/react-query';
import { fetchCountries, fetchCountryByCode } from '@/services/countries.service';

export const useCountries = () =>
  useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    refetchInterval: 120_000,
    staleTime: 60_000,
    retry: 3,
  });

export const useCountry = (code: string) =>
  useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code),
    enabled: !!code,
    staleTime: 60_000,
    retry: 2,
  });

import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '@/services/countries.service';

export const useCountries = (page = 1) => {
  return useQuery({
    queryKey: ['countries', page],
    queryFn: () => fetchCountries(page),
  });
};

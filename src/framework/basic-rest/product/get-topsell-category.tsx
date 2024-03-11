import { QueryOptionsType, Category } from '../types';
import http from '../utils/http';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchElectronictablesCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CATEGORIES);
  return data as Category[];
};
export const useTopSellCategoryQuery = (options: QueryOptionsType) => {
  return useQuery<Category[], Error>(
    [API_ENDPOINTS.CATEGORIES, options],
      fetchElectronictablesCategory
  );
};

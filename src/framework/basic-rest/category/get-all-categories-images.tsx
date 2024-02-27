import {
  CategoriesQueryOptionsTypeImages,
} from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchCategoriesImages = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.CATEGORIES_ALL);
  return data.results;
};

export const useCategoriesQueryImages = (
  options: CategoriesQueryOptionsTypeImages,
) => {
  return useQuery<{ data: any }, Error>(
    [API_ENDPOINTS.CATEGORIES_ALL, options],
    fetchCategoriesImages,
  );
};

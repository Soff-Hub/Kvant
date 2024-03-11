import { QueryOptionsType, Product } from '../types';
import http from '../utils/http';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchPopularProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS_SECTION_3);
  return data as Product[];
};
export const usePopularProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS_SECTION_3, options],
    fetchPopularProducts
  );
};

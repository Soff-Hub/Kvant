import { QueryOptionsType, Product } from '../types';

import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import http from '../utils/http';

export const fetchFashionProducts = async ({ queryKey }: any) => {
  const [_key, options] = queryKey;
  const { sort_by, ...params } = options;
  const queryParams = new URLSearchParams(params);
  if (sort_by) {
    queryParams.append('sort_by', sort_by);
  }

  const url = `${API_ENDPOINTS.FASHION_PRODUCTS}?${queryParams.toString()}`;
  const { data } = await http.get(url);
  return data?.results as Product[];
};
export const usefashionProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FASHION_PRODUCTS, options],
    fetchFashionProducts,
  );
};

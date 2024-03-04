import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

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

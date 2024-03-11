import { Product } from '../types';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import { useQuery } from 'react-query';
import http from '../utils/http';

export const fetchProduct = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS_DETAILS}`);
  return data;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCTS_DETAILS, slug], () =>
    fetchProduct(slug)
  );
};

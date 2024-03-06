import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchAddress = async () => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS_SECTION_1);
  return data
  
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.PRODUCTS_SECTION_1], fetchAddress);
};

export { useAddressQuery, fetchAddress };

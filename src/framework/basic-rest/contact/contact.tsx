import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchContact = async () => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS_SECTION_1);
  return data
};

const useContactQuery = () => {
  return useQuery([API_ENDPOINTS.PRODUCTS_SECTION_1], fetchContact);
};

export { useContactQuery, fetchContact };

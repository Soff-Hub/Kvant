import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchOrderStatus = async () => {
  const { data } = await http.get(API_ENDPOINTS.ORDERS);
  return data?.results
};

const useOrderStatusQuery = () => {
  return useQuery([API_ENDPOINTS.ORDERS], fetchOrderStatus);
};

export { useOrderStatusQuery, fetchOrderStatus };

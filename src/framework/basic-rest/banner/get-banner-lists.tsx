import { BannerQueryOptionsTypeImages } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchBannerImagesLists = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BANNER);
  return data;
};

export const useBannerQueryImages = (
  options: BannerQueryOptionsTypeImages,
) => {
  return useQuery<{ data: any }, Error>(
    [API_ENDPOINTS.BANNER, options],
    fetchBannerImagesLists,
  );
};

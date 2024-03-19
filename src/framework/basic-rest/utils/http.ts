import axios from 'axios';
import { getToken } from './get-token';
import { getTokenLang } from './get-token';

export const baseURL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

const http = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    const lang = getTokenLang();
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    // Add Accept-Language header
    config.headers['Accept-Language'] = lang;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;

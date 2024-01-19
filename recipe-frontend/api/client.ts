import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseAPI = axios.create({
  baseURL: BASE_URL,
});

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  return config;
};

const errorInterceptor = (error: any) => {
  return Promise.reject(error?.response?.data);
};

baseAPI.interceptors.request.use(authInterceptor);
baseAPI.interceptors.response.use(
  (response: AxiosResponse) => response,
  errorInterceptor,
);

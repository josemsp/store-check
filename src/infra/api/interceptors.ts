import { axiosInstance } from './axios.client';

let requestInterceptorId: number | null = null;

export const setupInterceptors = (getToken: () => string | null) => {
  if (requestInterceptorId !== null) return;

  requestInterceptorId = axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
};

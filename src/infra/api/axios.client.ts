import axios, { type AxiosRequestConfig } from 'axios';

import { env } from '../env';

export const axiosInstance = axios.create({
  baseURL: env.DEV ? env.API_URL_DEV : env.API_URL,
  // withCredentials: true,
});

export const customAxios = async <T>(
  config: AxiosRequestConfig & { signal?: AbortSignal },
): Promise<T> => {
  const res = await axiosInstance.request<T>({
    ...config,
    signal: config.signal, // 🔑 clave
  });
  return res.data;
};

import axios, { type AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL,
  // withCredentials: true,
});

export const customAxios = <T>(
  config: AxiosRequestConfig & { signal?: AbortSignal },
): Promise<T> => {
  return axiosInstance
    .request<T>({
      ...config,
      signal: config.signal, // 🔑 clave
    })
    .then((res) => res.data);
};

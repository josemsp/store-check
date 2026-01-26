import type { AxiosError } from 'axios'
import { axiosInstance } from './httpClient'

export const setupInterceptors = (getToken: () => string | null) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken()

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        },
        (error: AxiosError) => {
            return Promise.reject(error)
        })

    axiosInstance.interceptors.response.use(
        (response) => {
            // If the response has the ApiResponse structure, extract data
            if (response.data?.success && response.data?.data !== undefined) {
                return { ...response, data: response.data.data };
            }
            return response;
        },
        (error) => {
            // Handle common errors
            if (error.response?.status === 401) {
                // Clear token and redirect to login
                console.log("Clearing token and redirecting to login");
                localStorage.removeItem('access_token');
                window.location.href = '/login';
            }

            if (error.response?.status === 403) {
                console.error('Access forbidden');
            }

            if (error.response?.status === 404) {
                console.error('Resource not found');
            }

            if (error.response?.status >= 500) {
                console.error('Server error');
            }
            // Handle:
            // 401 -> logout
            // 403 -> permissions
            // 500 -> toast
            return Promise.reject(error)
        }
    )
}

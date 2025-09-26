// src/services/axiosInstance.ts
import axios from 'axios';
import { toast } from 'react-toastify';
import { logoutHelper } from '../helpers/logout.helper';

declare module 'axios' {
  interface AxiosRequestConfig {
    authRequired?: boolean;
    responseType?: ResponseType | undefined;
  }
}
// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL, // Your API base URL from env variable
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Authorization Token when necessary
axiosInstance.interceptors.request.use(
  (config) => {

    // Only add Authorization header if the request requires authentication
    if (config.authRequired) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if ((error?.response?.status === 401 || error?.response?.status === 422)  && originalRequest?.authRequired === true) {
      // Handle Unauthorized error (e.g., redirect to login)
      console.log('Unauthorized Access ! Redirecting to login...');
      logoutHelper();
      toast.error('Unauthorized Access ! Redirecting you to login page...', { autoClose: 2000 })
      setTimeout(() => {
        window.location.href = '/';
      }, 2200);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor per aggiungere il token JWT (se presente) alle richieste
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kibi_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
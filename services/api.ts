import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.apiKey) {
          config.headers['x-api-key'] = user.apiKey;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
}; 
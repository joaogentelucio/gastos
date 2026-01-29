import axios from 'axios';
import { getAccessToken, setAccessToken } from "./auth-token";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: 'https://gastosservice-ovgk.onrender.com/api/', 
  timeout: 5000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("Auth/auto-login")) {
      return Promise.reject(error);
    }
    
    if (originalRequest.url?.includes("Auth/refresh") || originalRequest._retry) {
      setAccessToken("");
      localStorage.clear();
      if (window.location.pathname !== "/gastos/login") {
          window.location.href = "/gastos/login";
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing= true;

    try {
      const { data } = await api.post("Auth/refresh");
      const newAccessToken = data.accessToken;

      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      setAccessToken("");
      localStorage.clear();
      window.location.href = "/gastos/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
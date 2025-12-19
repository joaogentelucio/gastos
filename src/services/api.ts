import axios from 'axios';
import { getAccessToken } from "./auth-token";

const api = axios.create({
  baseURL: 'http://192.168.1.2:5151/api/', 
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


export default api;
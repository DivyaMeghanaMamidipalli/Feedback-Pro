import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

apiClient.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const user = jwtDecode(accessToken);
      const isExpired = Date.now() >= user.exp * 1000;

      if (isExpired) {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken,
          });
          
          accessToken = response.data.access;
          localStorage.setItem('accessToken', accessToken);
        } catch (refreshError) {
          console.error("Session expired. Please log in again.", refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/admin/login'; 
          return Promise.reject(refreshError);
        }
      }
      
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;
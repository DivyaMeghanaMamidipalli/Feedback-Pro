import axios from 'axios';

// Create a new Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Django API base URL
});

// Use an interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
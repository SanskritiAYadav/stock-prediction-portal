import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create({
  baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(function(config) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  return config;
},
function(error) {
    return Promise.reject(error);
});

// Response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(function(response) {
    return response;
},
//handle failed responses
async function(error){
    const originalRequest =error.config;
    if(error.response.status === 401 && !originalRequest.retry){
        originalRequest.retry = true; // Mark the request to prevent infinite loops
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axiosInstance.post(`/token/refresh/`, {refresh: refreshToken});
            localStorage.setItem('access_token', response.data.access);
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            return axiosInstance(originalRequest); // Retry the original request with new token
        } catch (error) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            
        }
    }
    return Promise.reject(error);
}
)

export default axiosInstance;
import axios from 'axios';

/**
 * Central axios instance. Every service module should import this instead of
 * calling axios directly, so auth headers, base URL, and error handling stay
 * in one place when the real backend is connected.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  withCredentials: true, // allows httpOnly refresh-token cookie once backend is live
  timeout: 15000,
});

// Attach the short-lived access token (kept in memory/localStorage, never the refresh token).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edutech_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Placeholder for silent refresh-token flow: on a 401, call POST /auth/refresh
// (which reads the httpOnly cookie), store the new access token, and retry once.
let isRefreshing = false;
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('edutech_access_token', data.accessToken);
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem('edutech_access_token');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

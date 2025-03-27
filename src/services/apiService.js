import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

const apiService = {
  get: (url, params = {}) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),

  async login() {
    //   async login(username, password) {
    try {
      //   const response = await api.post(`/auth/login`, { username, password });
      //   return response;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            message: "Login Successful!",
            data: {
              user: { name: "Admin User", role: "admin" },
              token: "mocked-jwt-token",
            },
          });
        }, 1500);
      });
    } catch (error) {
      console.error("Error logging user in:", error);
      throw error;
    }
  },

  async logout() {
    try {
      //   await api.post(`/auth/logout`);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            message: "Logout Successful!",
          });
        }, 1500);
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
};

export default apiService;

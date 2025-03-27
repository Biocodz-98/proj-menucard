import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Environment variable type declaration
declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL: string;
    };
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Interface for login response
interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: {
      name: string;
      role: string;
      [key: string]: any;
    };
    token: string;
  };
}

// Interface for logout response
interface LogoutResponse {
  status: number;
  message: string;
}

// Create axios instance with types
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor with proper typing
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Add response interceptor with proper typing
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: any) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

const apiService = {
  get: <T = any>(url: string, params = {}): Promise<AxiosResponse<T>> =>
    api.get<T>(url, { params }),

  post: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    api.post<T>(url, data),

  put: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    api.put<T>(url, data),

  delete: <T = any>(url: string): Promise<AxiosResponse<T>> =>
    api.delete<T>(url),

  async login(username?: string, password?: string): Promise<LoginResponse> {
    try {
      // Uncomment for real implementation
      // const response = await api.post<LoginResponse>('/auth/login', { username, password });
      // return response.data;

      // Mock implementation
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

  async logout(): Promise<LogoutResponse> {
    try {
      // Uncomment for real implementation
      // const response = await api.post<LogoutResponse>('/auth/logout');
      // return response.data;

      // Mock implementation
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
      throw error as Error; // Re-throw the error after logging
    }
  },
};

export default apiService;

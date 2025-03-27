import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import apiService from "../src/services/apiService";

// User type definition
interface User {
  name?: string;
  role?: string;
  // Add other user properties here
  [key: string]: any;
}

// Auth state type definition
interface AuthState {
  user: User | null;
  token: string | null;
}

// Error format type definition
interface ErrorDetail {
  hasError: boolean;
  message: string;
}

// Response data type definition
interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Shape of the entire store
interface StoreState {
  auth: AuthState;
  loading: boolean;
  errors: Record<string, ErrorDetail>;

  // Actions
  setErrors: (field: string, hasError: boolean, message?: string) => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
  login: (username: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

// Persistence configuration
type StorePersist = PersistOptions<StoreState, Pick<StoreState, "auth">>;

const persistConfig: StorePersist = {
  name: "menucard",
  partialize: (state) => ({ auth: state.auth }),
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      auth: {
        user: null,
        token: null,
      },
      loading: false,
      errors: {},

      setErrors: (
        field: string,
        hasError: boolean,
        message: string = "An error occurred"
      ) => {
        set((state) => ({
          errors: {
            ...state.errors,
            [field]: { hasError, message },
          },
        }));

        // Toast.show({
        //   type: "error",
        //   text1: "Error",
        //   text2: message,
        // });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      resetStore: () => {
        set({
          auth: {
            user: null,
            token: null,
          },
          errors: {},
        });
      },

      login: async (
        username: string,
        password: string
      ): Promise<LoginResponse> => {
        try {
          set({ loading: true, errors: {} });

          const response = await apiService.login(username, password) as LoginResponse;

          // Store token in localStorage
          if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
          }

          // Update state with user data and token
          set({
            auth: {
              user: response.data.user,
              token: response.data.token,
            },
            loading: false,
          });

          return response;
        } catch (error: any) {
          // Type assertion for error
          const errorMessage =
            error.response?.data?.message || error.message || "Login Failed";

          set({
            loading: false,
            errors: {
              ...get().errors,
              login: {
                hasError: true,
                message: errorMessage,
              },
            },
          });

          throw error;
        }
      },

      logout: async (): Promise<void> => {
        try {
          set({ loading: true });

          await apiService.logout();

          // Clear token from localStorage
          localStorage.removeItem("token");

          // Reset store to initial state
          set({
            auth: {
              user: null,
              token: null,
            },
            loading: false,
            errors: {},
          });
        } catch (error) {
          console.error("Logout error:", error);

          // Even if there's an error, reset the auth state
          set({
            auth: {
              user: null,
              token: null,
            },
            loading: false,
          });
        }
      },
    }),
    persistConfig
  )
);

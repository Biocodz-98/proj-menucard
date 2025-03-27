import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import apiService from "../src/services/apiService";
import axios from "axios";

interface User {
  name?: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface ErrorDetail {
  hasError: boolean;
  message: string;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface StoreState {
  auth: AuthState;
  loading: boolean;
  errors: Record<string, ErrorDetail>;

  setErrors: (field: string, hasError: boolean, message?: string) => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
  login: (username: string, password: string) => Promise<LoginResponse>;
  googleLogin: (credential: string) => Promise<any>;
  logout: () => Promise<void>;
}

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

          const response = (await apiService.login(
            username,
            password
          )) as LoginResponse;

          if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
          }

          set({
            auth: {
              user: response.data.user,
              token: response.data.token,
            },
            loading: false,
          });

          return response;
        } catch (error: any) {
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

      googleLogin: async (credential: string) => {
        try {
          set({ loading: true, errors: {} });
          console.log("Store: Starting Google login process");

          // Use the apiService instead of direct axios call
          const response = await apiService.googleAuth(credential);
          console.log("Store: Received response from googleAuth:", response);

          if (response.data?.token) {
            console.log(
              "Store: Saving token to localStorage:",
              response.data.token.substring(0, 10) + "..."
            );
            localStorage.setItem("token", response.data.token);
          }

          console.log("Store: Updating auth state");
          set({
            auth: {
              user: response.data.user,
              token: response.data.token,
            },
            loading: false,
          });

          return response;
        } catch (error: any) {
          console.error("Store: Google login error:", error);

          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Google Login Failed";

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

          localStorage.removeItem("token");

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

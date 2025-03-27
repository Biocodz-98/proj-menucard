import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiService from "../src/services/apiService";

export const useStore = create(
  persist(
    (set, get) => ({
      auth: {
        user: null,
        token: null,
      },
      loading: false,
      errors: {},

      setErrors: (field, hasError, message = "An error occurred") => {
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

      setLoading: (loading) => {
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

      login: async (username, password) => {
        try {
          set({ loading: true, errors: {} });

          const response = await apiService.login(username, password);

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
        } catch (error) {
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

      logout: async () => {
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
    {
      name: "menucard",
      // Only persist the auth object
      partialize: (state) => ({ auth: state.auth }),
    }
  )
);

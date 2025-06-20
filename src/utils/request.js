import { useToast } from "vue-toastification";
import axios from "axios";
import { logout } from "@/utils/logout.js";
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/authStore.js";

const toast = useToast();
let isRefreshing = false;
let refreshTokenPromise = null;
let hasLoggedOut = false;

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  async (config) => {
    const token = useAuthStore().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.showLoading !== false) {
      useLoadingStore().show();
    }
    return config;
  },
  (error) => {
    toast.error("Failed to send request");
    if (error.config?.showLoading !== false) {
      useLoadingStore().hide();
    }
    return Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.config.showLoading !== false) {
      useLoadingStore().hide();
    }
    return response.data;
  },
  async (error) => {
    const { config, response } = error;

    if (config?.showLoading !== false) {
      useLoadingStore().hide();
    }

    if (!response || !config) {
      toast.error("Network or configuration error");
      return Promise.reject(error);
    }

    const authStore = useAuthStore();
    const { status } = response;
    const isRefreshingTokenRequest = config.url.includes("/auth/refresh");

    if (status === 401 && !authStore.accessToken) {
      if (!hasLoggedOut) {
        hasLoggedOut = true;
        await logout();
      }
      toast.error("Unauthorized. Please login again.");
      return Promise.reject(error);
    }

    if (status === 401 && !isRefreshing && !isRefreshingTokenRequest) {
      isRefreshing = true;

      try {
        const resp = await authStore.getRefreshToken();

        if (resp.code === 200) {
          const newToken = resp.data.accessToken;
          refreshTokenPromise = Promise.resolve(newToken);
        } else {
          throw new Error(resp.message || "Failed to refresh token");
        }
      } catch (e) {
        if (!hasLoggedOut) {
          hasLoggedOut = true;
          await logout();
        }

        const message = e?.response?.data?.Message || "Token refresh failed";
        toast.error(message);
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }

      try {
        const newToken = await refreshTokenPromise;
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
          return service(config); // retry original request
        }
      } catch (e) {
        const message =
          e?.response?.data?.Message || "Retry after refresh failed";
        toast.error(message);
        return Promise.reject(e);
      }
    }

    toast.error(error.response.data.Message);

    return Promise.reject(error);
  }
);

export default service;

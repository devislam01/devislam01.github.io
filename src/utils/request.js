import { useToast } from "vue-toastification";
import axios from "axios";
import { logout } from "@/utils/logout.js";
import { useLoadingStore } from "@/stores/loadingStore";
import { HttpCode } from "./constants";

const toast = useToast();

const service = axios.create({
  baseURL: "https://localhost:7047/api",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
    if (error.response) {
      console.log(error.response);
      const { status, data } = error.response;
      const errorMessage =
        data?.Message || HttpCode[status] || `Request failed (${status})`;

      toast.error(errorMessage);

      if (status === 401) {
        localStorage.removeItem("token");
        if (!window.location.pathname.includes("/login")) {
          logout();
          window.location.href = "/login";
        }
      }
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Please try again");
    } else if (error.request) {
      toast.error("Session Expired. Please login again");

      localStorage.removeItem("token");
      if (!window.location.pathname.includes("/login")) {
        logout();
      }
    } else {
      toast.error("Request configuration error");
    }

    if (error.config?.showLoading !== false) {
      useLoadingStore().hide();
    }

    return Promise.reject(error);
  }
);

export default service;

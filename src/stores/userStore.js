import { throwError } from "element-plus/es/utils/error.mjs";
import { defineStore } from "pinia";
import axios from "@/utils/request.js";

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore("users", {
  state: () => {
    error: null;
    data: null;
  },
  actions: {
    async loginUser(payload) {
      const resp = await axios.post("/Auth/login", payload);

      localStorage.setItem("accessToken", resp.data.accessToken);
      localStorage.setItem("refreshToken", resp.data.refreshToken);
    },
    async registerUser(payload) {
      await axios.post("/User/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async getUserProfile() {
      const response = await axios.get(`/user/getUserProfile`);
      this.data = response.data;
      return response.data;
    },
    async updateUserProfile(payload) {
      return await axios.post(`/user/updateUserProfile`, payload);
    },
    async forgetPassword(payload) {
      return await axios.post("/user/forgetPassword", payload);
    },
  },
});

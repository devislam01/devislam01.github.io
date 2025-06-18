import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useUserStore = defineStore("users", {
  state: () => ({}),
  actions: {
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
      return await axios.post(`/user/updateUserProfile`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async forgetPassword(payload) {
      return await axios.post("/user/forgetPassword", payload);
    },
    async resetPassword(payload) {
      return await axios.post(`/user/resetPassword`, payload);
    },
  },
});

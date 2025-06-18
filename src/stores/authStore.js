import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
  }),
  persist: true,
  actions: {
    async loginUser(payload) {
      const resp = await axios.post("/Auth/login", payload);

      this.accessToken = resp.data.accessToken;
      this.refreshToken = resp.data.refreshToken;
    },
    async getRefreshToken() {
      const payload = {
        refreshToken: this.refreshToken,
      };
      const resp = await axios.post(`auth/refresh-token`, payload);

      if (resp.code === 200) {
        this.accessToken = resp.data.accessToken;
        this.refreshToken = resp.data.refreshToken;
      }
      return resp;
    },
    async logoutUser() {
      const payload = {
        refreshToken: this.refreshToken,
      };
      return await axios.post(`auth/logout`, payload);
    },
  },
});

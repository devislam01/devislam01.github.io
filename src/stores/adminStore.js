import { defineStore } from "pinia";
import axios from "@/utils/request.js";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    error: null,
    data: null,
  }),
  actions: {
    async getUsers(payload) {
      return await axios.post(`admin/user/userList`, payload);
    },
    async getUserDetails(payload) {
      return await axios.post(`admin/user/userDetails`, payload);
    },
    async registerUser(payload) {
      return await axios.post(`admin/user/createUser`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async updateUserDetails(payload) {
      return await axios.post(`admin/user/updateUser`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    async banUser(payload) {
      return await axios.post(`admin/user/revoke-user`, payload);
    },
    async reinstateUser(payload) {
      return await axios.post(`admin/user/reinstate-user`, payload);
    },
    async resetPassword(payload) {
      return await axios.post(`admin/user/reset-password`, payload);
    },
    async getOrderSummaries() {
      const response = await axios.get(`order/orderSummaries`);
      this.data = response.data;
      return response.data;
    },
  },
});
